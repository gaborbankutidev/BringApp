<?php

declare(strict_types=1);

namespace BringApp\Forms;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Forms {
	/**
	 * Initializes forms module
	 *
	 * @return void
	 */
	public static function init() {
		Contact::init();
		GeneralAdminMail::init();
	}
}
