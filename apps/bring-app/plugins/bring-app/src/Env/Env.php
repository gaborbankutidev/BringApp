<?php

declare(strict_types=1);

namespace BringApp\Env;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Environment module
 *
 * Setup environment variables with Dotenv or PHP constants
 * Constants override Dotenv variables
 */
class Env {
	/**
	 * @return string
	 */
	public static function JWT_SECRET_KEY() {
		return Helpers::createStringEnvVariable("JWT_SECRET_KEY");
	}

	/**
	 * @return string
	 */
	public static function NEXT_BASE_URL() {
		return Helpers::createStringEnvVariable("NEXT_BASE_URL");
	}

	/**
	 * @return string
	 */
	public static function WORDPRESS_DEBUG() {
		return Helpers::createStringEnvVariable("WORDPRESS_DEBUG");
	}
}
