<?php

declare(strict_types=1);

namespace BringApp\Core;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * The admin-specific functionality of the plugin.
 *
 * @package    Bring_App
 */
class Admin {
	/**
	 * Initialize admin
	 *
	 * @return void
	 */
	public static function init() {
		// Update WP admin menu and restrict pages
		add_action("admin_init", self::restrictPages(...), 1);
		add_action("admin_menu", self::removePages(...), 999);
		add_action("admin_menu", self::addMenuPage(...), 999);

		// Lock wp theme
		add_filter("template", self::lockTheme(...));
		add_filter("stylesheet", self::lockTheme(...));
		add_filter("option_stylesheet", self::lockTheme(...));
		add_filter("option_template", self::lockTheme(...));
		add_filter("pre_option_stylesheet", self::lockTheme(...));
		add_filter("pre_option_template", self::lockTheme(...));
	}

	/**
	 * Redirects to admin dashboard if user tries to access restricted pages
	 *
	 * @return void
	 */
	private static function restrictPages() {
		global $pagenow;

		$restricted_pages = [
			"themes.php",
			"theme-editor.php",
			"theme-install.php",
			"site-editor.php",
			"customize.php",
		];

		if (in_array($pagenow, $restricted_pages)) {
			wp_safe_redirect(admin_url());
			exit();
		}
	}

	/**
	 * Remove theme-related pages from admin menu
	 *
	 * @return void
	 */
	private static function removePages() {
		// Remove submenus
		remove_submenu_page("themes.php", "themes.php");
		remove_submenu_page("themes.php", "theme-editor.php");
		remove_submenu_page("themes.php", "theme-install.php");
		remove_submenu_page("themes.php", "site-editor.php?path=/patterns");

		$customize_url = add_query_arg(
			"return",
			urlencode(
				remove_query_arg(
					wp_removable_query_args(),
					wp_unslash($_SERVER["REQUEST_URI"]),
				),
			),
			"customize.php",
		);
		remove_submenu_page("themes.php", $customize_url);

		// Remove top-level menu
		remove_menu_page("themes.php");
	}

	/**
	 * Add nav menu page to the top menu in admin
	 *
	 * @return void
	 */
	private static function addMenuPage() {
		add_menu_page(
			__("Menus", "text-domain"), // Page title
			__("Menus", "text-domain"), // Menu title
			"edit_theme_options", // Capability
			"nav-menus.php", // Menu slug
			/** @phpstan-ignore-next-line */
			"", // Callback function - defined as a callable but empty string is allowed if not used
			"dashicons-menu", // Icon
			58, // Position
		);
	}

	/**
	 * Locks the theme to the one defined in BRING_APP_THEME
	 *
	 * @return string
	 */
	private static function lockTheme() {
		return BRING_APP_THEME;
	}
}
