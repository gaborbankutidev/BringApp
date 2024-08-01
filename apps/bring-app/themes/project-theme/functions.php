<?php

require_once "custom-react-adminpage/index.php";

add_action("wp_enqueue_scripts", "project_theme_enqueue_styles");
function project_theme_enqueue_styles() {
	wp_enqueue_style("parent-style", get_template_directory_uri() . "/style.css");
}
