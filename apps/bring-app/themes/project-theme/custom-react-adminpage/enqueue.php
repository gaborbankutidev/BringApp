<?php

namespace WpReactAdminTheme;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Enqueue {
	public static function init() {
		add_action("admin_enqueue_scripts", self::enqueue_react_admin_scripts(...));
	}

	public static function enqueue_react_admin_scripts() {
		$child_theme_version = wp_get_theme()->get("Version");

		// enqueue react script in admin
		wp_enqueue_script(
			"bring-react-scripts",
			get_stylesheet_directory_uri() . "/build/custom-pages/index.js",
			[],

			$child_theme_version,
			true,
		);
	}
}
