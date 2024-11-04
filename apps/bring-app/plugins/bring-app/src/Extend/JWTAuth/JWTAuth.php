<?php

declare(strict_types=1);

namespace BringApp\Extend\JWTAuth;

class JWTAuth {
	/**
	 * Initializes the class by conditionally setting up the REST route.
	 */
	public static function init() {
		// Delay the route registration until all plugins are loaded
		add_action("plugins_loaded", [self::class, "conditional_init"]);
	}

	/**
	 * Conditionally registers the logout REST route if requirements are met.
	 */
	public static function conditional_init() {
		// Ensure the plugin admin functions are available for checking active status
		if (!function_exists("is_plugin_active")) {
			require_once ABSPATH . "wp-admin/includes/plugin.php";
		}

		// Check if the JWTAuth plugin and class are available and active
		if (
			is_plugin_active("jwt-auth/jwt-auth.php") &&
			defined("JWT_AUTH_PLUGIN_VERSION") &&
			version_compare(JWT_AUTH_PLUGIN_VERSION, "3.0.3", "<=") &&
			class_exists("JWTAuth\Auth")
		) {
			// Run config hooks
			self::config();

			// Initialize logout endpoint
			add_action("rest_api_init", [self::class, "register_routes"]);
		}
	}

	/**
	 * Define plugin config
	 */
	public static function config() {
		/**
		 * Change the refresh token's expiration time.
		 *
		 * @param int $expire The default expiration timestamp.
		 * @param int $issued_at The current time.
		 *
		 * @return int The custom refresh token expiration timestamp.
		 */
		add_filter(
			"jwt_auth_refresh_expire",
			function ($expire, $issued_at) {
				// Set the refresh token expiration to 1 day
				return time() + DAY_IN_SECONDS;
			},
			10,
			2,
		);
	}

	/**
	 * Registers the /logout route under the jwt-auth/v1 namespace.
	 */
	public static function register_routes() {
		register_rest_route("jwt-auth/v1", "/logout", [
			"methods" => "POST",
			"callback" => [self::class, "handle_logout"],
			"permission_callback" => function ($request) {
				return self::verify_token_or_refresh($request);
			},
		]);
	}

	/**
	 * Verifies the JWT token or the refresh token for the logout request.
	 *
	 * @return bool|WP_Error True if either token is valid, otherwise WP_Error.
	 */
	public static function verify_token_or_refresh(\WP_REST_Request $request) {
		$auth_instance = new \JWTAuth\Auth();

		// Attempt to validate the JWT token
		$jwt_payload = $auth_instance->validate_token(false);
		if (!is_wp_error($jwt_payload) && isset($jwt_payload->data->user->id)) {
			// Check if the user ID in the token is valid and the user exists
			$user_id = $jwt_payload->data->user->id;
			if ($user_id && get_user_by("id", $user_id)) {
				return true; // Valid JWT token and user exists
			}
		}

		// If JWT is invalid, attempt to validate the refresh token with device payload
		if (isset($_COOKIE["refresh_token"])) {
			// Retrieve the device information from the request parameter if JWT is absent
			$device = $request->get_param("device") ?: "";

			// Validate the refresh token using the provided device information
			$user_id = $auth_instance->validate_refresh_token(
				$_COOKIE["refresh_token"],
				$device,
			);

			if (!is_wp_error($user_id) && get_user_by("id", $user_id)) {
				return true; // Valid refresh token and user exists
			}
		}

		// If neither token is valid or no user is associated, return an error
		return new \WP_Error(
			"jwt_auth_not_authenticated",
			__(
				"You are not logged in. Logout is only available for authenticated users.",
			),
			["status" => 403],
		);
	}

	/**
	 * Logs out the user by unsetting the refresh token cookie and removing the refresh token from the user (device)
	 *
	 * @return \WP_REST_Response Logout response.
	 */
	public static function handle_logout(\WP_REST_Request $request) {
		// Check if the refresh_token cookie is set
		if (isset($_COOKIE["refresh_token"])) {
			// Get the device information from the request parameter
			$device = $request->get_param("device") ?: "";

			// Extract the user ID from the refresh token (user_id.token format)
			$parts = explode(".", $_COOKIE["refresh_token"]);
			if (count($parts) === 2) {
				$user_id = intval($parts[0]);
				$user_refresh_tokens = get_user_meta(
					$user_id,
					"jwt_auth_refresh_tokens",
					true,
				);

				// Remove the refresh token associated with the specified device
				if (
					is_array($user_refresh_tokens) &&
					isset($user_refresh_tokens[$device])
				) {
					unset($user_refresh_tokens[$device]);
					update_user_meta(
						$user_id,
						"jwt_auth_refresh_tokens",
						$user_refresh_tokens,
					);
				}

				// Delete the specific `jwt_auth_device` entry for this device
				delete_user_meta($user_id, "jwt_auth_device", $device);

				// Remove the specific jwt_auth_device_##### entry for the device
				delete_user_meta($user_id, "jwt_auth_device_{$device}");
			}

			// Unset the refresh token cookie from the user's browser
			unset($_COOKIE["refresh_token"]);
			setcookie(
				"refresh_token",
				"",
				time() - 3600,
				COOKIEPATH,
				COOKIE_DOMAIN,
				is_ssl(),
				true,
			);
		}

		return new \WP_REST_Response(["message" => "Logged out successfully"], 200);
	}
}
