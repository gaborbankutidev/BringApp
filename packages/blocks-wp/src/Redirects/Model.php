<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Redirects;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 */
class Model {
	/**
	 *
	 * @return void
	 */
	public static function register() {
		register_post_type("redirect", [
			"labels" => [
				"name" => __("Redirects", "blocks-wp"),
				"singular_name" => __("Redirect", "blocks-wp"),
			],
			"public" => false,
			"show_ui" => true,
			"show_in_menu" => "tools.php",
			"supports" => ["title"],
		]);
	}
}
