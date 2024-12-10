<?php

declare(strict_types=1);

namespace BringApp\Core;

use BringApp\Env\Env;

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

		add_action("admin_notices", Plugins::notices(...));
		add_action("admin_init", Plugins::preventRequiredPluginDeactivation(...));
		add_action("admin_init", self::preventBringAppDeactivation(...));

		add_filter(
			"plugin_action_links",
			Plugins::removeDeactivateButtonFromRequiredPlugins(...),
			10,
			2,
		);
		add_filter("plugin_action_links", self::removeDeactivateBringAppButton(...), 10, 2);
		add_action("init", Plugins::removePluginInstallationCapability(...));
	}

	/**
	 * Prevents deactivation of BringApp
	 *
	 * @return void
	 */
	private static function preventBringAppDeactivation() {
		if (
			isset($_GET["action"]) &&
			$_GET["action"] === "deactivate" &&
			isset($_GET["plugin"]) &&
			$_GET["plugin"] === "bring-app/bring-app.php" &&
			Env::WORDPRESS_DEBUG() !== "true"
		) {
			add_action("admin_notices", function () {
				echo '<div class="notice notice-error"><p><strong>Bring App plugin</strong> cannot be deactivated.</p></div>';
			});

			wp_redirect(admin_url("plugins.php"));
			exit();
		}
	}

	/**
	 * Remove deactivate button from required plugins
	 * @param array<string> $actions
	 * @param string $plugin_file
	 * @return array<string>
	 */
	private static function removeDeactivateBringAppButton($actions, $plugin_file) {
		if ($plugin_file === "bring-app/bring-app.php" && Env::WORDPRESS_DEBUG() !== "true") {
			unset($actions["deactivate"]);
		}

		return $actions;
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
			urlencode(remove_query_arg(wp_removable_query_args(), wp_unslash($_SERVER["REQUEST_URI"]))),
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
