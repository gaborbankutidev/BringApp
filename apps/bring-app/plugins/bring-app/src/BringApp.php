<?php

declare(strict_types=1);

namespace BringApp;

use BringApp\Core\Admin;
use BringApp\Core\I18n;
use BringApp\Enqueue\Enqueue;
use BringApp\Forms\Forms;
use BringApp\General\General;
use BringApp\Post\Post;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class BringApp {
	/**
	 * Initialize BringApp
	 * @return void
	 */
	public static function init() {
		// Config BlocksWP
		BlocksWP::init();

		// Plugin core
		Admin::init();
		I18n::init();

		// Plugin modules
		Enqueue::init();
		Forms::init();
		General::init();
		Post::init();
	}
}
