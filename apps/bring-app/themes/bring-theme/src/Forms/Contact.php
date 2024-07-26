<?php

declare(strict_types=1);

namespace BringTheme\Forms;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Contact {
	/**
	 * Initializes contact form
	 *
	 * @return void
	 */
	public static function init() {
		self::formFields();
	}

	/**
	 * Add form fields
	 *
	 * @return void
	 */
	private static function formFields() {
		add_filter("bring_contact_form_fields", function ($a) {
			$fields = [
				["name" => "name", "required" => true],
				["name" => "email", "required" => true],
				["name" => "message"],
				["name" => "consent", "required" => true],
			];

			return array_merge($a, $fields);
		});
	}
}
