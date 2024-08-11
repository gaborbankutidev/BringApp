<?php

declare(strict_types=1);

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

add_action("wp_enqueue_scripts", "project_theme_enqueue_styles");
function project_theme_enqueue_styles() {
	wp_enqueue_style("parent-style", get_template_directory_uri() . "/style.css");
}

require_once get_stylesheet_directory() . "/plugins.php";

add_action("rest_api_init", function () {
	register_rest_route("bring", "/healthcheck", [
		"methods" => "GET",
		"callback" => function () {
			$parent_theme = wp_get_theme("bring-theme");
			if ($parent_theme->exists()) {
				return new WP_REST_Response(null, 200);
			}

			return new WP_REST_Response(null, 500);
		},
	]);
});

?>
