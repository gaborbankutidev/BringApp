<?php

declare(strict_types=1);

namespace BringApp\General;

use WP_REST_Response;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class HealthCheck {
	/**
	 * Initialize HealthCheck
	 * @return void
	 */
	public static function init() {
		self::registerRoutes();
	}

	/**
	 * Register search routes
	 *
	 * @return void
	 */
	private static function registerRoutes() {
		add_action("rest_api_init", function () {
			register_rest_route("bring", "/healthcheck", [
				"methods" => "GET",
				"callback" => fn() => new WP_REST_Response(["ok" => true], 200),
				"permission_callback" => "__return_true",
			]);
		});
	}
}
