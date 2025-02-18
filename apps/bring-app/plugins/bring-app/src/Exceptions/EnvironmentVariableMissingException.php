<?php

declare(strict_types=1);

namespace BringApp\Exceptions;

use Exception;
use Throwable;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class EnvironmentVariableMissingException extends Exception {
	public function __construct(string $env_name, int $code = 0, Throwable $previous = null) {
		parent::__construct("$env_name is missing!", $code, $previous);
	}
}
