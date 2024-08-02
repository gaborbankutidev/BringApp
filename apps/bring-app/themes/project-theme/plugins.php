<?php

declare(strict_types=1);

namespace BringThemeProject\Plugins;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

// Define your desired plugins
function bring_theme_project_plugins() {
	return [
		[
			"name" => "ACF QuickEdit Fields",
			"slug" => "acf-quickedit-fields",
			"force_deactivation" => true,
		],
		[
			"name" => "Disable Comments",
			"slug" => "disable-comments",
			"force_deactivation" => true,
		],
		[
			"name" => "Disable Media Pages",
			"slug" => "disable-media-pages",
			"force_deactivation" => true,
		],
		[
			"name" => "FileBird Lite",
			"slug" => "filebird",
			"force_deactivation" => true,
		],
		[
			"name" => "Query Monitor",
			"slug" => "query-monitor",
			"force_deactivation" => true,
		],
		[
			"name" => "Rank Math SEO",
			"slug" => "seo-by-rank-math",
			"force_deactivation" => true,
		],
		[
			"name" => "WP API SwaggerUI",
			"slug" => "wp-api-swaggerui",
			"force_deactivation" => true,
		],
		[
			"name" => "WP Mail SMTP",
			"slug" => "wp-mail-smtp",
			"force_deactivation" => true,
		],
		// [
		// 	"name" => "All-in-One WP Migration",
		// 	"slug" => "all-in-one-wp-migration",
		//  "required" => true,
		//  "force_activation" => true,
		// 	"force_deactivation" => true,
		// ],
	];
}
