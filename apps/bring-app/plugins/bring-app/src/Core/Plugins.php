<?php

declare(strict_types=1);

namespace BringApp\Core;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * @since      1.0.0
 * @package    BringApp
 */
class Plugins {
	/**
	 * These plugins are required for BringApp to function properly
	 * Remove them at your own risk
	 * To extend this list, add the plugin's main file path
	 * @var array<string> $required_plugins
	 */
	private static array $required_plugins = [
		"bring-app/bring-app.php",
		"advanced-custom-fields/acf.php",
		"advanced-custom-fields-pro/acf.php",
		"acf-quickedit-fields/index.php",
		"jwt-auth/jwt-auth.php",
	];

	/**
	 * Activate required plugins
	 * @since    1.0.0
	 * @return void
	 */
	public static function activateRequiredPlugins(): void {
		$activated_plugins = [];
		foreach (self::$required_plugins as $plugin) {
			if (is_plugin_active($plugin)) {
				continue;
			}

			activate_plugin(WP_PLUGIN_DIR . "/" . $plugin);
			$activated_plugins[] = $plugin;
		}
		set_transient("bringapp_activated_plugins", $activated_plugins, 30);
	}

	/**
	 * Display admin notices, added to `admin_notices` action in Admin class
	 * @since    1.0.0
	 * @return void
	 */
	public static function notices(): void {
		$activated_plugins = get_transient("bringapp_activated_plugins");

		if (!$activated_plugins || !is_array($activated_plugins)) {
			return;
		}

		echo '<div class="notice notice-success is-dismissible">';
		echo "<p><strong>The following plugins have been activated by BringApp</strong></p>";
		echo "<ul>";
		foreach ($activated_plugins as $plugin) {
			echo "<li>" . esc_html($plugin) . "</li>";
		}
		echo "</ul>";
		echo "</div>";

		delete_transient("bringapp_activated_plugins");
	}

	/**
	 * Prevent required plugin deactivation
	 * @since    1.0.0
	 * @return void
	 */
	public static function preventRequiredPluginDeactivation() {
		foreach (self::$required_plugins as $plugin) {
			if (
				isset($_GET["action"]) &&
				$_GET["action"] === "deactivate" &&
				isset($_GET["plugin"]) &&
				$_GET["plugin"] === $plugin
			) {
				add_action("admin_notices", function () {
					echo '<div class="notice notice-error"><p><strong>BringApp plugin</strong> cannot be deactivated.</p></div>';
				});

				wp_redirect(admin_url("plugins.php"));
				exit();
			}
		}
	}

	/**
	 * Remove deactivate button from required plugins
	 * @param array<string> $actions
	 * @param string $plugin_file
	 * @return array<string>
	 */
	public static function removeDeactivateButtonFromRequiredPlugins($actions, $plugin_file) {
		if (in_array($plugin_file, self::$required_plugins)) {
			unset($actions["deactivate"]);
		}
		return $actions;
	}

	/**
	 * Remove plugin installation capability from administrators
	 * @since    1.0.0
	 * @return void
	 */
	public static function removePluginInstallationCapability() {
		$role = get_role("administrator");
		if ($role) {
			$role->remove_cap("install_plugins");
			$role->remove_cap("update_plugins");
		}
	}
}
