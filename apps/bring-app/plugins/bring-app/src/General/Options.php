<?php

declare(strict_types=1);

namespace BringApp\General;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Options {
	/**
	 * Initializes options module
	 *
	 * @return void
	 */
	public static function init() {
		self::registerOptionFields();
	}

	/**
	 * Register option fields
	 *
	 * @return void
	 */
	private static function registerOptionFields() {
		// register option page
		if (function_exists("acf_add_options_page")) {
			acf_add_options_page();
		}

		// add group for option page
		if (function_exists("acf_add_local_field_group")) {
			acf_add_local_field_group([
				"key" => "group_options",
				"title" => "Options",
				"fields" => [
					// Add option fields here
				],
				"location" => [
					[
						[
							"param" => "options_page",
							"operator" => "==",
							"value" => "acf-options",
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
				"show_in_rest" => 0,
			]);
		}
	}
}
