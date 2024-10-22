<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Redirects;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 */
class Redirects {
	/**
	 *
	 * @return void
	 */
	public static function init() {
		add_action("init", Model::register(...));

		apply_filters("manage_redirect_posts_columns", [
			"title" => __("Title"),
			"redirect_from" => __("Redirect From"),
			"redirect_to" => __("Redirect To"),
		]);
	}
}
