<?php

declare(strict_types=1);

namespace BringTheme\Env;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Environment module
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
	public static function DATA_TOKEN() {
		return Helpers::createStringEnvVariable("DATA_TOKEN");
	}
}
