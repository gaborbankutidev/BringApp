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
				"name" => "ACF QuickEdit Fields",
				"slug" => "acf-quickedit-fields",
				"source" =>
					"https://downloads.wordpress.org/plugin/acf-quickedit-fields.3.3.7.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "Advanced Custom Fields PRO",
				"slug" => "advanced-custom-fields-pro",
				"source" =>
					"https://github.com/pronamic/advanced-custom-fields-pro/releases/download/v6.3.3/advanced-custom-fields-pro-6.3.3.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "Disable Comments",
				"slug" => "disable-comments",
				"source" =>
					"https://downloads.wordpress.org/plugin/disable-comments.2.4.6.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "Disable Media Pages",
				"slug" => "disable-media-pages",
				"source" =>
					"https://downloads.wordpress.org/plugin/disable-media-pages.3.1.2.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "FileBird Lite",
				"slug" => "filebird",
				"source" => "https://downloads.wordpress.org/plugin/filebird.zip",
				"required" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "Query Monitor",
				"slug" => "query-monitor",
				"source" =>
					"https://downloads.wordpress.org/plugin/query-monitor.3.16.3.zip",
				"required" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "Rank Math SEO",
				"slug" => "seo-by-rank-math",
				"source" =>
					"https://downloads.wordpress.org/plugin/seo-by-rank-math.1.0.223.zip",
				"required" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "WP API SwaggerUI",
				"slug" => "wp-api-swaggerui",
				"source" =>
					"https://downloads.wordpress.org/plugin/wp-api-swaggerui.1.2.0.zip",
				"required" => true,
				"force_deactivation" => true,
			],
			[
				"name" => "WP Mail SMTP",
				"slug" => "wp-mail-smtp",
				"source" =>
					"https://downloads.wordpress.org/plugin/wp-mail-smtp.4.0.1.zip",
				"required" => true,
				"force_activation" => true,
				"force_deactivation" => true,
			],
			// [
			// 	"name" => "All-in-One WP Migration",
			// 	"slug" => "all-in-one-wp-migration",
			// 	"source" =>
			// 		"https://downloads.wordpress.org/plugin/all-in-one-wp-migration.7.84.zip",
			// 	"force_deactivation" => true,
			// ],
		];

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
