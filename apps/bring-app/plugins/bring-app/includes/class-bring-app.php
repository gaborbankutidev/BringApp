<?php

use Dotenv\Dotenv;

use Bring\BlocksWP\BringBlocks;
use Bring\BlocksWP\Config;

use BringApp\Enqueue\Enqueue;
use BringApp\Env\Env;
use BringApp\Forms\Forms;
use BringApp\General\General;
use BringApp\Post\Post;
use BringApp\Extend\Extend;

/**
 * The file that defines the core plugin class
 *
 * A class definition that includes attributes and functions used across both the
 * public-facing side of the site and the admin area.
 *
 * @link       https://bring.app
 * @since      1.0.0
 *
 * @package    Bring_App
 * @subpackage Bring_App/includes
 */

/**
 * The core plugin class.
 *
 * This is used to define internationalization, admin-specific hooks, and
 * public-facing site hooks.
 *
 * Also maintains the unique identifier of this plugin as well as the current
 * version of the plugin.
 *
 * @since      1.0.0
 * @package    Bring_App
 * @subpackage Bring_App/includes
 * @author     Bring Team Ltd. <gabor.bankuti@bring.team>
 */
class Bring_App {
	/**
	 * The loader that's responsible for maintaining and registering all hooks that power
	 * the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      Bring_App_Loader    $loader    Maintains and registers all hooks for the plugin.
	 */
	protected $loader;

	/**
	 * The unique identifier of this plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $plugin_name    The string used to uniquely identify this plugin.
	 */
	protected $plugin_name;

	/**
	 * The current version of the plugin.
	 *
	 * @since    1.0.0
	 * @access   protected
	 * @var      string    $version    The current version of the plugin.
	 */
	protected $version;

	/**
	 * Define the core functionality of the plugin.
	 *
	 * Set the plugin name and the plugin version that can be used throughout the plugin.
	 * Load the dependencies, define the locale, and set the hooks for the admin area and
	 * the public-facing side of the site.
	 *
	 * @since    1.0.0
	 */
	public function __construct() {
		if (defined("BRING_APP_VERSION")) {
			$this->version = BRING_APP_VERSION;
		} else {
			$this->version = "1.0.0";
		}
		$this->plugin_name = "bring-app";

		$this->load_dependencies();
		$this->set_locale();
		$this->define_admin_hooks();
		$this->define_public_hooks();
		$this->init_app();
	}

	/**
	 * Load the required dependencies for this plugin.
	 *
	 * Include the following files that make up the plugin:
	 *
	 * - Bring_App_Loader. Orchestrates the hooks of the plugin.
	 * - Bring_App_i18n. Defines internationalization functionality.
	 * - Bring_App_Admin. Defines all hooks for the admin area.
	 * - Bring_App_Public. Defines all hooks for the public side of the site.
	 *
	 * Create an instance of the loader which will be used to register the hooks
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @return void
	 */
	private function load_dependencies(): void {
		/**
		 * The class responsible for loading vendor dependencies.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) . "vendor/autoload.php";

		/**
		 * The class responsible for orchestrating the actions and filters of the
		 * core plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) .
			"includes/class-bring-app-loader.php";

		/**
		 * The class responsible for defining internationalization functionality
		 * of the plugin.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) .
			"includes/class-bring-app-i18n.php";

		/**
		 * The class responsible for defining all actions that occur in the admin area.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) .
			"admin/class-bring-app-admin.php";

		/**
		 * The class responsible for defining all actions that occur in the public-facing
		 * side of the site.
		 */
		require_once plugin_dir_path(dirname(__FILE__)) .
			"public/class-bring-app-public.php";

		$this->loader = new Bring_App_Loader();
	}

	/**
	 * Define the locale for this plugin for internationalization.
	 *
	 * Uses the Bring_App_i18n class in order to set the domain and to register the hook
	 * with WordPress.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @return void
	 */
	private function set_locale(): void {
		$plugin_i18n = new Bring_App_i18n();

		$this->loader->add_action(
			"plugins_loaded",
			$plugin_i18n,
			"load_plugin_textdomain",
		);
	}

	/**
	 * Register all of the hooks related to the admin area functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @return void
	 */
	private function define_admin_hooks(): void {
		$plugin_admin = new Bring_App_Admin(
			$this->get_plugin_name(),
			$this->get_version(),
		);

		$this->loader->add_action(
			"admin_enqueue_scripts",
			$plugin_admin,
			"enqueue_styles",
		);
		$this->loader->add_action(
			"admin_enqueue_scripts",
			$plugin_admin,
			"enqueue_scripts",
		);

		/* Custom functionality actions and filters added below */

		/* Disable the themes setup */
		$this->loader->add_action(
			"admin_init",
			$plugin_admin,
			"disable_themes_setup",
		);
	}

	/**
	 * Register all of the hooks related to the public-facing functionality
	 * of the plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @return void
	 */
	private function define_public_hooks(): void {
		$plugin_public = new Bring_App_Public(
			$this->get_plugin_name(),
			$this->get_version(),
		);

		$this->loader->add_action(
			"wp_enqueue_scripts",
			$plugin_public,
			"enqueue_styles",
		);
		$this->loader->add_action(
			"wp_enqueue_scripts",
			$plugin_public,
			"enqueue_scripts",
		);

		/* Custom functionality actions and filters added below */

		/* This is only to test your WordPress installation, you can remove it after you make sure everything is working */
		$this->loader->add_action(
			"rest_api_init",
			$plugin_public,
			"Bring_App_Health_Check",
		);

		$this->loader->add_filter(
			"bring_dynamic_post_list",
			$plugin_public,
			"Bring_App_add_excerpt_to_dynamic_post_list",
			10,
			3,
		);
	}

	/**
	 * Run the loader to execute all of the hooks with WordPress.
	 *
	 * @since    1.0.0
	 * @return void
	 */
	public function run(): void {
		$this->loader->run();
	}

	/**
	 * The name of the plugin used to uniquely identify it within the context of
	 * WordPress and to define internationalization functionality.
	 *
	 * @since     1.0.0
	 * @return    string    The name of the plugin.
	 */
	public function get_plugin_name(): string {
		return $this->plugin_name;
	}

	/**
	 * The reference to the class that orchestrates the hooks with the plugin.
	 *
	 * @since     1.0.0
	 * @return    Bring_App_Loader    Orchestrates the hooks of the plugin.
	 */
	public function get_loader(): Bring_App_Loader {
		return $this->loader;
	}

	/**
	 * Retrieve the version number of the plugin.
	 *
	 * @since     1.0.0
	 * @return    string    The version number of the plugin.
	 */
	public function get_version() {
		return $this->version;
	}

	/**
	 * Initialize Bring App functionality.
	 *
	 * @since     1.0.0
	 * @access   public
	 * @return void
	 */
	public function init_app(): void {
		// Load env variables
		$dotenv = Dotenv::createImmutable(dirname(__DIR__));
		$dotenv->safeLoad();

		// config bring
		Config::init([
			"DATA_TOKEN" => Env::DATA_TOKEN(),
			"JWT_SECRET_KEY" => Env::JWT_SECRET_KEY(),
			"NEXT_BASE_URL" => Env::NEXT_BASE_URL(),
		])
			// Turn on layout features
			->useHeader()
			->useFooter()
			->useLayout()
			->useLibrary()
			// Configure editor & layout
			->editorPostTypes()
			->layoutPostTypes()
			->layoutTaxonomies()
			// Add entity props
			->entityProps([])
			// Further features
			->forms(["contact"])
			->sitemap([
				"posts" => ["page", "post"],
				"taxonomies" => false,
				"authors" => false,
			])
			// Register blocks
			->blocks([
				// layout
				"column",
				"group",
				"row",
				"section",
				"split",
				// components
				"button",
				"divider",
				"embed",
				"heading",
				"image",
				"markdown",
				"post-content",
				"contact-form",
			])
			// Ignore paths
			->ignorePaths(["rest-api/docs", "rest-api/schema"]);

		// init bring
		BringBlocks::init();

		// init theme
		Enqueue::init();
		Forms::init();
		General::init();
		Post::init();

		// init plugin extensions
		Extend::init();
	}
}
