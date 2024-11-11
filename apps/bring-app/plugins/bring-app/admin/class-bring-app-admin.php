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
	 * @return void
	 */
	public function enqueue_styles(): void {
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
	 * @return void
	 */
	public function enqueue_scripts(): void {
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

	/**
	 * Disable Themes Setup
	 *
	 * @since    1.0.0
	 * @return void
	 */
	public function disable_themes_setup(): void {
		// 1. Hide the Themes Menu
		remove_submenu_page("themes.php", "themes.php");

		// 2. Disable Theme Switching
		$lock_theme_hooks = [
			"template",
			"stylesheet",
			"option_stylesheet",
			"option_template",
			"pre_option_stylesheet",
			"pre_option_template",
		];

		foreach ($lock_theme_hooks as $hook) {
			add_filter($hook, fn() => BRING_APP_THEME);
		}

		// 3. Restrict Access to Theme Editor, Customizer, and Themes Page via direct URL
		add_action(
			"admin_init",
			function (): void {
				global $pagenow;
				$restricted_pages = [
					"theme-editor.php",
					"customize.php",
					"themes.php",
					"theme-install.php",
				];

				if (in_array($pagenow, $restricted_pages)) {
					wp_safe_redirect(admin_url());
					exit();
				}
			},
			1,
		);

		// 4. Hide Theme Update Notifications
		add_action("admin_menu", function (): void {
			remove_action("admin_notices", "update_nag", 3);
			add_filter("pre_site_transient_update_themes", "__return_null");
		});

		// 5. Disable Theme Installation
		remove_submenu_page("themes.php", "theme-install.php");
	}
}
