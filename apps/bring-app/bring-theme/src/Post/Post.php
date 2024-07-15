<?php

declare(strict_types=1);

namespace BringTheme\Post;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Post {
	/**
	 * Initializes module for Post PostType
	 *
	 * @return void
	 */
	public static function init() {
		Model::init();
	}
}
