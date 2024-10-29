<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Cache;

use Bring\BlocksWP\Config;

class Admin {
	/**
	 * @return void
	 */
	public static function init() {
		// Cached URLs filter
		add_filter("query_vars", self::addQueryVar(...));

		// Add Cached URLs page to admin
		add_action("admin_menu", self::addPage(...));
	}
}
