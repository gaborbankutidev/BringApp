<?php

declare(strict_types=1);

namespace BringTheme\Plugins;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

require_once dirname(__FILE__, 3) .
	"/inc/plugin-activation/class-tgm-plugin-activation.php";

class Plugins {
	/**
	 * Initializes required plugin installation using
	 * the TGM-Plugin-Activation class
	 *
	 * url: https://github.com/TGMPA/TGM-Plugin-Activation
	 *
	 * For detailed configuration example go to
	 * /inc/plugin-activation/example.php
	 *
	 * @return void
	 */
	public static function init() {
		add_action("tgmpa_register", [
			__CLASS__,
			"bring_theme_register_required_plugins",
		]);
	}

	public static function bring_theme_register_required_plugins() {
		/*
		 * Array of plugin arrays. Required keys are name and slug.
		 * If the source is NOT from the .org repo, then source is also required.
		 */
		$plugins = [
			[
				"name" => "Advanced Custom Fields PRO",
				"slug" => "advanced-custom-fields-pro",
				"source" =>
					"https://github.com/pronamic/advanced-custom-fields-pro/archive/refs/heads/main.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
		];

		/*
		 * Add plugins defined in the project child theme
		 */
		if (
			function_exists("BringThemeProject\Plugins\bring_theme_project_plugins")
		) {
			$child_plugins = \BringThemeProject\Plugins\bring_theme_project_plugins();
			$plugins = array_merge($plugins, $child_plugins);
		}

		/*
		 * Array of configuration settings. Amend each line as needed.
		 */
		$config = [
			"id" => "tgmpa", // Unique ID for hashing notices for multiple instances of TGMPA.
			"default_path" => "", // Default absolute path to bundled plugins.
			"menu" => "tgmpa-install-plugins", // Menu slug.
			"parent_slug" => "themes.php", // Parent menu slug.
			"capability" => "edit_theme_options", // Capability needed to view plugin install page, should be a capability associated with the parent menu used.
			"has_notices" => true, // Show admin notices or not.
			"dismissable" => false, // If false, a user cannot dismiss the nag message.
			"dismiss_msg" =>
				"The theme will not work properly without the required plugins. Please make sure to install them.", // If 'dismissable' is false, this message will be output at top of nag.
			"is_automatic" => true, // Automatically activate plugins after installation or not.
			"message" => "", // Message to output right before the plugins table.

			// "strings" => [
			// 	"nag_type" => "", // Determines admin notice type - can only be one of the typical WP notice classes, such as 'updated', 'update-nag', 'notice-warning', 'notice-info' or 'error'. Some of which may not work as expected in older WP versions.
			// ],
		];

		tgmpa($plugins, $config);
	}
}
