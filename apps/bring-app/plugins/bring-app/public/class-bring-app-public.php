<?php

/**
 * The public-facing functionality of the plugin.
 *
 * @link       https://bring.app
 * @since      1.0.0
 *
 * @package    Bring_App
 * @subpackage Bring_App/public
 */

/**
 * The public-facing functionality of the plugin.
 *
 * Defines the plugin name, version, and two examples hooks for how to
 * enqueue the public-facing stylesheet and JavaScript.
 *
 * @package    Bring_App
 * @subpackage Bring_App/public
 * @author     Bring Team Ltd. <gabor.bankuti@bring.team>
 */
class Bring_App_Public {
	/**
	 * The ID of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $plugin_name    The ID of this plugin.
	 */
	private string $plugin_name;

	/**
	 * The version of this plugin.
	 *
	 * @since    1.0.0
	 * @access   private
	 * @var      string    $version    The current version of this plugin.
	 */
	private string $version;

	/**
	 * Initialize the class and set its properties.
	 *
	 * @since    1.0.0
	 * @param      string    $plugin_name       The name of the plugin.
	 * @param      string    $version    The version of this plugin.
	 */
	public function __construct($plugin_name, $version) {
		$this->plugin_name = $plugin_name;
		$this->version = $version;
	}

	/**
	 * Register the stylesheets for the public-facing side of the site.
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
			plugin_dir_url(__FILE__) . "css/bring-app-public.css",
			[],
			$this->version,
			"all",
		);
	}

	/**
	 * Register the JavaScript for the public-facing side of the site.
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
			plugin_dir_url(__FILE__) . "js/bring-app-public.js",
			["jquery"],
			$this->version,
			false,
		);
	}

	/**
	 * Bring App custom public facing functionality added below.
	 *
	 * Actions & filters should be called from the includes/main plugin class.
	 */

	/**
	 * Health Check
	 * @since    1.0.0
	 * @return void
	 */
	public function Bring_App_Health_Check(): void {
		register_rest_route("bring", "/healthcheck", [
			"methods" => "GET",
			"callback" => fn() => new WP_REST_Response(["ok" => true], 200),
			"permission_callback" => "__return_true",
		]);
	}

	/**
	 * Add excerpt to dynamic post list
	 * @since    1.0.0
	 * @param array<array{'entityId':int,'excerpt':string}> $items
	 * @param string $entity_slug
	 * @param array<array<mixed>> $custom_data
	 * @return array<array{'entityId':int,'excerpt':string}>
	 */
	public function Bring_App_add_excerpt_to_dynamic_post_list(
		array $items,
		string $entity_slug,
		array $custom_data,
	): array {
		$items = array_map(function ($item) {
			$item["excerpt"] = get_the_excerpt($item["entityId"]);

			return $item;
		}, $items);

		return $items;
	}
}
