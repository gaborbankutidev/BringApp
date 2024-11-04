<?php

declare(strict_types=1);

namespace BringApp\Extend;

use BringApp\Extend\JWTAuth\JWTAuth;

class Extend {
	/**
	 * Initialize plugin extensions
	 */
	public static function init() {
		JWTAuth::init();
	}
}
