<?php

declare(strict_types=1);

namespace BringApp\Forms;

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
	 * This is a basic contact form with name, email, message & consent fields. You can extend, remove or add other forms as needed.
	 * Do not forget to add form names to the BringWP config.
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
