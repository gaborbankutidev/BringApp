<?php

declare(strict_types=1);

namespace BringApp\Core;

use WP_Roles;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    BringApp
 */
class Activator {
	/**
	 * Runs on plugin activation
	 * @since    1.0.0
	 * @return void
	 */
	public static function activate() {
		self::setBringTheme();
		self::removeThemeCapabilities();
	}

	/**
	 * Set Bring App Theme on plugin activation
	 * @since    1.0.0
	 * @return void
	 */
	private static function setBringTheme(): void {
		update_option("template", BRING_APP_THEME);
		update_option("stylesheet", BRING_APP_THEME);
	}

	/**
	 * Function to remove theme-related capabilities on plugin activation
	 * @since    1.0.0
	 * @return void
	 */
	private static function removeThemeCapabilities(): void {
		global $wp_roles;
		if (!isset($wp_roles)) {
			$wp_roles = new WP_Roles();
		}

		foreach ($wp_roles->roles as $role_name => $role_info) {
			$role = get_role($role_name);
			if (!$role) {
				continue;
			}

			$role->remove_cap("switch_themes");
			$role->remove_cap("customize");
			$role->remove_cap("manage_block_templates");
		}
	}
}
