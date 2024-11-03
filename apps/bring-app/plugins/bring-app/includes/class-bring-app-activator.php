<?php

/**
 * Fired during plugin activation
 *
 * @link       https://bring.app
 * @since      1.0.0
 *
 * @package    Bring_App
 * @subpackage Bring_App/includes
 */

/**
 * Fired during plugin activation.
 *
 * This class defines all code necessary to run during the plugin's activation.
 *
 * @since      1.0.0
 * @package    Bring_App
 * @subpackage Bring_App/includes
 * @author     Bring Team Ltd. <gabor.bankuti@bring.team>
 */
class Bring_App_Activator {
	/**
	 * Short Description. (use period)
	 *
	 * Long Description.
	 *
	 * @since    1.0.0
	 * @return void
	 */
	public static function activate(): void {
		self::set_bring_theme();
		self::remove_theme_capabilities();
	}

	/**
	 * Set Bring App Theme on plugin activation
	 * @since    1.0.0
	 * @return void
	 */
	private static function set_bring_theme(): void {
		update_option("template", BRING_APP_THEME);
		update_option("stylesheet", BRING_APP_THEME);
	}

	/**
	 * Function to remove theme-related capabilities on plugin activation
	 * @since    1.0.0
	 * @return void
	 */
	private static function remove_theme_capabilities(): void {
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
			$role->remove_cap("edit_theme_options");
		}
	}
}
