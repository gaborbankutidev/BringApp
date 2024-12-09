<?php

declare(strict_types=1);

namespace BringApp\Core;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Define the internationalization functionality.
 *
 * Loads and defines the internationalization files for this plugin
 * so that it is ready for translation.
 *
 * @since      1.0.0
 * @package    BringApp
 */
class I18n {
	/**
	 * Initialize I18n
	 *
	 * @return void
	 */
	public static function init() {
		add_action("plugins_loaded", self::loadPluginTextdomain(...));
	}

	/**
	 * Load the plugin text domain for translation.
	 *
	 * @since    1.0.0
	 * @return void
	 */
	private static function loadPluginTextdomain() {
		load_plugin_textdomain("bring-app", false, dirname(plugin_basename(__FILE__)) . "/languages/");
	}
}
