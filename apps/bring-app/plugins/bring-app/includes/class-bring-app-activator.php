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
	 */
	public static function activate() {
		self::set_permalink_structure();
		self::set_bring_theme();
		self::remove_theme_capabilities();
	}

	/* Set permalink structure */
	private static function set_permalink_structure() {
		update_option("permalink_structure", "/%postname%/");
	}

	/* Set Bring Theme on plugin activation */
	private static function set_bring_theme() {
		update_option("template", BRING_APP_THEME);
		update_option("stylesheet", BRING_APP_THEME);
	}

	/* Function to remove theme-related capabilities on plugin activation */
	private static function remove_theme_capabilities() {
		global $wp_roles;
		if (!isset($wp_roles)) {
			$wp_roles = new WP_Roles();
		}

		foreach ($wp_roles->roles as $role_name => $role_info) {
			$role = get_role($role_name);
			$role->remove_cap("switch_themes");
			$role->remove_cap("edit_theme_options");
		}
	}
}
