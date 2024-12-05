<?php

declare(strict_types=1);

namespace JWTAuth;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Auth {
	/**
	 * @param bool $b
	 * @return object<{"data":object<{"user":object<{"id":string}>}>}>|WP_Error
	 *
	 * @phpstan-ignore-next-line
	 */
	public function validate_token($b) {
	}

	/**
	 * @param string $cookie
	 * @param string $device
	 * @phpstan-ignore-next-line
	 */
	public function validate_refresh_token($cookie, $device) {
	}
}
