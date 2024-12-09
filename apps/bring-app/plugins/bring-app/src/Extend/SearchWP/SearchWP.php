<?php

declare(strict_types=1);

namespace BringApp\Extend\SearchWP;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class SearchWP {
	/**
	 * Index empty categories
	 * @var bool $shouldIndexEmptyCategories
	 */
	static $shouldIndexEmptyCategories = false;

	/**
	 * Initialize search
	 *
	 * @return void
	 */
	public static function init() {
		// Delay the route registration until all plugins are loaded
		add_action("plugins_loaded", self::conditionalInit(...));
	}

	/**
	 * Conditionally initialize search
	 *
	 * @return void
	 */
	private static function conditionalInit() {
		// Ensure the plugin admin functions are available for checking active status
		if (!function_exists("is_plugin_active")) {
			require_once ABSPATH . "wp-admin/includes/plugin.php";
		}

		// Check if the SearchWP plugin and class are available and active
		if (!is_plugin_active("searchwp/index.php") || !class_exists("SearchWP")) {
			return;
		}

		// Add api routes
		Api::init();

		// Index empty categories
		self::$shouldIndexEmptyCategories &&
			add_filter('searchwp\source\taxonomy\db_where', self::indexEmptyCategories(...), 10, 2);
	}

	/**
	 * Index empty categories
	 *
	 * @param array<array<mixed>> $db_where
	 * @param mixed $source
	 * @return array<array<mixed>>
	 */
	private static function indexEmptyCategories($db_where, $source) {
		if (
			isset($db_where[1]) &&
			isset($db_where[1]["column"]) &&
			"count" === $db_where[1]["column"]
		) {
			unset($db_where[1]);
		}

		return $db_where;
	}
}
