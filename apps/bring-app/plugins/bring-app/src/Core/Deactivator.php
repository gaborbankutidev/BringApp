<?php

declare(strict_types=1);

namespace BringApp\Core;

use WP_Roles;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    BringApp
 */
class Deactivator {
	/**
	 * Runs on plugin deactivation
	 *
	 * @since    1.0.0
	 * @return void
	 */
	public static function deactivate() {
		self::restoreThemeCapabilitiesOnDeactivation();
	}

	/**
	 * Function to restore theme-related capabilities for admin on plugin deactivation
	 * @since    1.0.0
	 * @return void
	 */
	private static function restoreThemeCapabilitiesOnDeactivation() {
		global $wp_roles;
		if (!isset($wp_roles)) {
			$wp_roles = new WP_Roles();
		}

		foreach ($wp_roles->roles as $role_name => $role_info) {
			$role = get_role($role_name);
			if ($role && $role_name === "administrator") {
				$role->add_cap("switch_themes");
				$role->add_cap("customize");
				$role->add_cap("manage_block_templates");
			}
		}
	}
}
