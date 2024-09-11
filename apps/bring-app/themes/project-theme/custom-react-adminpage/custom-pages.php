<?php

namespace WpReactAdminTheme;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class CustomPages {
	public static function init() {
		add_action("admin_menu", self::post_pages(...));
	}

	static function post_pages() {
		add_menu_page(
			"List of posts",
			"List of posts",
			"manage_options",
			"post-list-page",
			self::post_list_content(...),
			"dashicons-schedule",
			3,
		);
		add_submenu_page(
			"post-list-page",
			"Create post",
			"Create post",
			"manage_options",
			"post-create-page",
			self::post_create_content(...),
		);
		add_submenu_page(
			"post-list-page",
			"Read post",
			"Read post",
			"manage_options",
			"post-read-page",
			self::post_read_content(...),
		);
		add_submenu_page(
			"post-list-page",
			"Update post",
			"Update post",
			"manage_options",
			"post-update-page",
			self::post_update_content(...),
		);
	}

	static function post_list_content() {
		echo '
            <h1>
                List of posts
            </h1>
            <div id="root-list-page"></div>
        ';
	}

	static function post_create_content() {
		echo '
            <h1>
                Create post
            </h1>
            <div id="root-create-page"></div>
        ';
	}

	static function post_read_content() {
		echo '
            <h1>
                Read post
            </h1>
            <div id="root-read-page"></div>
        ';
	}

	static function post_update_content() {
		echo '
            <h1>
                Update post
            </h1>
            <div id="root-update-page"></div>
        ';
	}
}
