<?php

declare(strict_types=1);

use Dotenv\Dotenv;
use BringApp\BringApp;
use BringApp\Core\Activator;
use BringApp\Core\Deactivator;

/**
 * The plugin bootstrap file
 *
 * This file is read by WordPress to generate the plugin information in the plugin
 * admin area. This file also includes all of the dependencies used by the plugin,
 * registers the activation and deactivation functions, and defines a function
 * that starts the plugin.
 *
 * @link              https://bring.team
 * @since             1.0.0
 * @package           BringApp
 *
 * @wordpress-plugin
 * Plugin Name:       Bring App
 * Plugin URI:        https://bring.team
 * Description:       Enables Bring App functionality, using WordPress as a headless CMS and allowing the usage of the block editor with custom pre-built components.
 * Version:           1.0.0
 * Author:            Bring Team Ltd.
 * Author URI:        https://bring.team/
 * License:           GPL-2.0+
 * License URI:       http://www.gnu.org/licenses/gpl-2.0.txt
 * Text Domain:       bring-app
 * Domain Path:       /languages
 */

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Currently plugin version.
 * Start at version 1.0.0 and use SemVer - https://semver.org
 * Rename this for your plugin and update it as you release new versions.
 */
define("BRING_APP_VERSION", "1.0.0");

/**
 * Define Plugin Path and URL constants
 */
!defined("BRING_APP_PLUGIN_PATH") && define("BRING_APP_PLUGIN_PATH", plugin_dir_path(__FILE__));

!defined("BRING_APP_PLUGIN_URL") && define("BRING_APP_PLUGIN_URL", plugin_dir_url(__FILE__));

/**
 * Define enforced theme
 */
define("BRING_APP_THEME", "bring-app-theme");

/**
 * Disable file editing
 */
define("DISALLOW_FILE_EDIT", true);

/**
 * Autoload Composer dependencies
 */
require_once "vendor/autoload.php";

/**
 * Load environment variables
 */
$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

/**
 * The code that runs during plugin activation.
 */
register_activation_hook(__FILE__, Activator::activate(...));

/**
 * The code that runs during plugin deactivation.
 */
register_deactivation_hook(__FILE__, Deactivator::deactivate(...));

/**
 * Initialize the plugin
 */
BringApp::init();
