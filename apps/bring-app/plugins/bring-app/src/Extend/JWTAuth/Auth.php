<?php

declare(strict_types=1);

namespace BringApp\Extend\JWTAuth;

use WP_Error;

/**
 * JWTAuth class
 */
class Auth {
	public static function validate_token(bool $a): object|WP_Error {
		throw new \Exception("Not implemented");
	}

	public static function validate_refresh_token(string $token, string $device): string|WP_Error {
		throw new \Exception("Not implemented");
	}
}
