<?php

declare(strict_types=1);

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

add_action("wp_enqueue_scripts", "project_theme_enqueue_styles");
function project_theme_enqueue_styles() {
	wp_enqueue_style("parent-style", get_template_directory_uri() . "/style.css");
}

require_once get_stylesheet_directory() . "/plugins.php";

// This is only to test your WordPress installation, you can remove it after you make sure everything is working
add_action("rest_api_init", function () {
	register_rest_route("bring", "/healthcheck", [
		"methods" => "GET",
		"callback" => fn() => new WP_REST_Response(null, 200),
		"permission_callback" => "__return_true",
	]);
});

// Add excerpt to dynamic post list
add_filter(
	"bring_dynamic_post_list",
	function ($items, $entity_slug, $custom_data) {
		$items = array_map(function ($item) {
			$item["excerpt"] = get_the_excerpt($item["entityId"]);

			return $item;
		}, $items);

		return $items;
	},
	10,
	3,
);
