<?php

declare(strict_types=1);

namespace BringApp\General;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class General {
	/**
	 * Initializes general module
	 *
	 * @return void
	 */
	public static function init() {
		HealthCheck::init();
		// Options::init();
	}
}
