<?php

declare(strict_types=1);

namespace BringApp\General;

use Bring\BlocksWP\Utils;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Image {
	/**
	 * Post types to add image column
	 *
	 * @var array<string> $post_types
	 */
	private static $post_types = ["post", "page"];

	/**
	 * Initialize props
	 *
	 * @return void
	 */
	public static function init() {
		// Add column to post types
		foreach (self::$post_types as $post_type) {
			add_filter("manage_{$post_type}_posts_columns", self::AddImageColumn(...), 9999, 1);
		}

		// Render page
		add_action("manage_posts_custom_column", self::RenderImage(...), 10, 2);

		// Add styles
		add_action("admin_head", self::AddStyle(...));
	}

	/**
	 * Add a new column to the admin post list
	 *
	 * @param array<string, string>  $columns
	 * @return array<string, string>
	 */
	private static function AddImageColumn($columns) {
		$new_columns = [];
		foreach ($columns as $key => $title) {
			if ($key == "title") {
				// Place the featured image column after the title column
				$new_columns["featured_image"] = "Image";
			}
			$new_columns[$key] = $title;
		}
		return $new_columns;
	}

	/**
	 * Load the featured images into the new column
	 *
	 * @param string $column_name
	 * @param int $post_id
	 *
	 * @return void
	 */
	private static function RenderImage($column_name, $post_id) {
		if ("featured_image" != $column_name) {
			return;
		}

		$img = Utils\General::getEntityImage($post_id);

		if (!$img["src"]) {
			return;
		}

		echo "
            <div style='max-width: 80px;'>
                <img src='{$img["src"]}' alt='{$img["alt"]}' style='width: 100%; height: auto;'/>
            </div>
        ";
	}

	/**
	 * Add styles
	 *
	 * @return void
	 */
	private static function AddStyle() {
		echo "
            <style>
                th.column-featured_image,
                td.column-featured_image {
                    width: 80px;
                }
            </style>
        ";
	}
}
