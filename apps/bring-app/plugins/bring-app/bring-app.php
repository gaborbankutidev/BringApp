<?php

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://bring.app
 * @since             1.0.0
 * @package           Bring_App
 *
 * @wordpress-plugin
 * Plugin Name:       Bring App
 * Plugin URI:        https://bring.app
 * Description:       Enables Bring App functionality, using WordPress as a headless CMS and allowing the usage of the block editor with custom pre-built components.
 * Version:           1.0.0
 * Author:            Bring Team Ltd.
 * Author URI:        https://bring.app/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bring-app
 * Domain Path:       /languages
 */

// If this file is called directly, abort.
if (!defined("WPINC")) {
	die();
}

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define("BRING_APP_VERSION", "1.0.0");

/**
 * Define Plugin Path and URL constants
 */
!defined("BRING_APP_PLUGIN_PATH") &&
	define("BRING_APP_PLUGIN_PATH", plugin_dir_path(__FILE__));

!defined("BRING_APP_PLUGIN_URL") &&
	define("BRING_APP_PLUGIN_URL", plugin_dir_url(__FILE__));

/**
 * Define enforced theme
 */
define("BRING_APP_THEME", "bring-app-theme");

/**
 * The code that runs during plugin activation.
 * This action is documented in includes/class-bring-app-activator.php
 */
function activate_bring_app() {
	require_once plugin_dir_path(__FILE__) .
		"includes/class-bring-app-activator.php";
	Bring_App_Activator::activate();
}

/**
 * The code that runs during plugin deactivation.
 * This action is documented in includes/class-bring-app-deactivator.php
 */
function deactivate_bring_app() {
	require_once plugin_dir_path(__FILE__) .
		"includes/class-bring-app-deactivator.php";
	Bring_App_Deactivator::deactivate();
}

register_activation_hook(__FILE__, "activate_bring_app");
register_deactivation_hook(__FILE__, "deactivate_bring_app");

/**
 * The core plugin class that is used to define internationalization,
 * admin-specific hooks, and public-facing site hooks.
 */
require plugin_dir_path(__FILE__) . "includes/class-bring-app.php";

/**
 * Begins execution of the plugin.
 *
 * Since everything within the plugin is registered via hooks,
 * then kicking off the plugin from this point in the file does
 * not affect the page life cycle.
 *
 * @since    1.0.0
 */
function run_bring_app() {
	$plugin = new Bring_App();
	$plugin->run();
}
run_bring_app();
