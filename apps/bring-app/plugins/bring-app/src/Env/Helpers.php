<?php

declare(strict_types=1);

namespace BringApp\Env;

use BringApp\Exceptions\EnvironmentVariableMissingException;
use BringApp\Exceptions\EnvironmentVariableWrongTypeException;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Environment helpers module
 */
class Helpers {
	/**
	 * @param string $name Env variable name
	 * @param mixed $default_value Default value
	 *  If null is supplied, throws error when the env variable is not defined.
	 * @return mixed
	 */
	public static function createEnvVariable($name, $default_value = null) {
		return defined($name)
			? constant($name)
			: (isset($_ENV[$name])
				? $_ENV[$name]
				: ($default_value !== null
					? $default_value
					: throw new EnvironmentVariableMissingException($name)));
	}

	/**
	 * @param string $name Env variable name
	 * @param string|null $default_value Default value
	 *  If null is supplied, throws error when the env variable is not defined.
	 * @return string
	 */
	public static function createStringEnvVariable($name, $default_value = null) {
		$mixed_env_var = self::createEnvVariable($name, $default_value);
		return is_string($mixed_env_var)
			? $mixed_env_var
			: throw new EnvironmentVariableWrongTypeException($name, "string");
	}

	/**
	 * @param string $name Env variable name
	 * @param int|null $default_value Default value
	 *  If null is supplied, throws error when the env variable is not defined.
	 * @return int
	 */
	public static function createIntEnvVariable($name, $default_value = null) {
		$mixed_env_var = self::createEnvVariable($name, $default_value);
		return is_integer($mixed_env_var)
			? $mixed_env_var
			: throw new EnvironmentVariableWrongTypeException($name, "int");
	}

	/**
	 * @param string $name Env variable name
	 * @param bool|null $default_value Default value
	 *  If null is supplied, throws error when the env variable is not defined.
	 * @return bool
	 */
	public static function createBoolEnvVariable($name, $default_value = null) {
		$mixed_env_var = self::createEnvVariable($name, $default_value);
		return is_bool($mixed_env_var)
			? $mixed_env_var
			: throw new EnvironmentVariableWrongTypeException($name, "bool");
	}
}
