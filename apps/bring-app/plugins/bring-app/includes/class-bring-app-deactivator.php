<?php

/**
 * Fired during plugin deactivation
 *
 * @link       https://bring.app
 * @since      1.0.0
 *
 * @package    Bring_App
 * @subpackage Bring_App/includes
 */

/**
 * Fired during plugin deactivation.
 *
 * This class defines all code necessary to run during the plugin's deactivation.
 *
 * @since      1.0.0
 * @package    Bring_App
 * @subpackage Bring_App/includes
 * @author     Bring Team Ltd. <gabor.bankuti@bring.team>
 */
class Bring_App_Deactivator {
	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 * @return void
	 */
	public static function deactivate(): void {
		self::restore_theme_capabilities_on_deactivation();
	}

	/**
	 * Function to restore theme-related capabilities for admin on plugin deactivation
	 * @since    1.0.0
	 * @return void
	 */
	private static function restore_theme_capabilities_on_deactivation(): void {
		global $wp_roles;
		if (!isset($wp_roles)) {
			$wp_roles = new WP_Roles();
		}

		foreach ($wp_roles->roles as $role_name => $role_info) {
			$role = get_role($role_name);
			if ($role && $role_name === "administrator") {
				$role->add_cap("switch_themes");
				$role->add_cap("edit_theme_options");
			}
		}
	}
}
