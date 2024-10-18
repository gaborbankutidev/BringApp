<?php

/**
 * The admin-specific functionality of the plugin.
 *
 * @link       https://bring.app
 * @since      1.0.0
 *
 * @package    Bring_App
 * @subpackage Bring_App/admin
 */

/**
 * The admin-specific functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the admin-specific stylesheet and JavaScript.
 *
 * @package    Bring_App
 * @subpackage Bring_App/admin
 * @author     Bring Team Ltd. <gabor.bankuti@bring.team>
 */
class Bring_App_Admin {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of this plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_styles() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Bring_App_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Bring_App_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_style(
			$this->plugin_name,
			plugin_dir_url(__FILE__) . "css/bring-app-admin.css",
			[],
			$this->version,
			"all",
		);
	}

	/**
	 * Register the JavaScript for the admin area.
	 *
	 * @since    1.0.0
	 */
	public function enqueue_scripts() {
		/**
		 * This function is provided for demonstration purposes only.
		 *
		 * An instance of this class should be passed to the run() function
		 * defined in Bring_App_Loader as all of the hooks are defined
		 * in that particular class.
		 *
		 * The Bring_App_Loader will then create the relationship
		 * between the defined hooks and the functions defined in this
		 * class.
		 */

		wp_enqueue_script(
			$this->plugin_name,
			plugin_dir_url(__FILE__) . "js/bring-app-admin.js",
			["jquery"],
			$this->version,
			false,
		);
	}

	public function disable_themes_setup() {
		// 1. Hide the Themes Menu
		remove_submenu_page("themes.php", "themes.php");

		// 2. Disable Theme Switching
		function lock_theme($theme) {
			return "twentytwentyfour"; // Set enforced theme name here
		}
		add_filter("template", "lock_theme");
		add_filter("stylesheet", "lock_theme");
		add_filter("option_stylesheet", "lock_theme");

		// 3. Restrict Access to Theme Editor, Customizer, and Themes Page via direct URL
		function disable_theme_editor_access() {
			global $pagenow;
			if (
				$pagenow == "theme-editor.php" ||
				$pagenow == "customize.php" ||
				$pagenow == "themes.php" ||
				$pagenow == "theme-install.php"
			) {
				wp_redirect(admin_url());
				exit();
			}
		}
		add_action("admin_init", "disable_theme_editor_access");

		// 4. Hide Theme Update Notifications
		function hide_theme_updates() {
			remove_action("admin_notices", "update_nag", 3);
			add_filter("pre_site_transient_update_themes", "__return_null");
		}
		add_action("admin_menu", "hide_theme_updates");

		// 5. Disable Theme Installation
		remove_submenu_page("themes.php", "theme-install.php");
	}
}
