<?php

declare(strict_types=1);

namespace BringApp\Enqueue;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Enqueue scripts and styles
 *
 * Use `wp_enqueue_style()` & `wp_enqueue_script()` to enqueue scripts and styles,
 * Use `BRING_APP_VERSION` constant to get the theme version,
 * Use `BRING_APP_PLUGIN_URL` to get the plugin directory URI
 */
class Enqueue {
	/**
	 * Initializes enqueue module
	 *
	 * @return void
	 */
	public static function init() {
		add_action("admin_enqueue_scripts", self::admin(...));
		add_action("enqueue_block_editor_assets", self::editor(...));
	}

	/**
	 * Enqueue scripts and styles (admin)
	 * @return void
	 */
	private static function admin() {
		// ...
	}

	/**
	 * Enqueue scripts and styles (editor)
	 * @return void
	 */
	private static function editor() {
		// Enqueue EasyMDE for markdown editor
		wp_enqueue_style(
			"easy-mde-theme-styles",
			"https://unpkg.com/easymde/dist/easymde.min.css",
		);
	}
}
