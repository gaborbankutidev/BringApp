<?php

declare(strict_types=1);

namespace BringTheme\Post;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Model {
	/**
	 * Post entity slug
	 *
	 * @var string
	 */
	private static $entity_slug = "post";

	/**
	 * Initializes post model to add fields & taxonomies
	 *
	 * @return void
	 */
	public static function init() {
		self::registerFields();
	}

	/**
	 * Register post fields
	 *
	 * @return void
	 */
	private static function registerFields() {
		if (function_exists("acf_add_local_field_group")) {
			acf_add_local_field_group([
				"key" => "bring_post_fields",
				"title" => "Post",
				"fields" => [
					// ... post fields
				],
				"location" => [
					[
						[
							"param" => "post_type",
							"operator" => "==",
							"value" => self::$entity_slug,
						],
					],
				],
				"menu_order" => 0,
				"position" => "normal",
				"style" => "default",
				"label_placement" => "top",
				"instruction_placement" => "label",
				"hide_on_screen" => "",
				"active" => true,
				"description" => "",
				"show_in_rest" => 1,
			]);
		}
	}
}
