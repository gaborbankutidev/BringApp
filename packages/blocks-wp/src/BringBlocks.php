<?php

declare(strict_types=1);

namespace Bring\BlocksWP;

use Bring\BlocksWP\Auth\Auth;
use Bring\BlocksWP\Layout\Layout;
use Bring\BlocksWP\Editor\Editor;
use Bring\BlocksWP\Cache\Cache;
use Bring\BlocksWP\Client\Client;
use Bring\BlocksWP\Dynamic\Dynamic;
use Bring\BlocksWP\Exceptions\ConfigNotInitializedException;
use Bring\BlocksWP\Form\Form;
use Bring\BlocksWP\Modules\Modules;

if (!defined("BRING_APP_VERSION")) {
	define("BRING_APP_VERSION", "1.0.0");
}

// Throw error if constants are not defined when using the package outside of the Bring App plugin scope.
if (!defined("BRING_APP_PLUGIN_URL")) {
	define("BRING_APP_PLUGIN_URL", "");
	wp_die("Required constant for BlocksWP package is not defined: BRING_APP_PLUGIN_URL", "Error");
}

if (!defined("BRING_APP_PLUGIN_PATH")) {
	define("BRING_APP_PLUGIN_PATH", "");
	wp_die("Required constant for BlocksWP package is not defined: BRING_APP_PLUGIN_PATH", "Error");
}

class BringBlocks {
	/**
	 * @return void
	 */
	public static function init() {
		self::checkConfig();

		Auth::init();
		Layout::init();
		Editor::init();
		Client::init();
		Dynamic::init();
		Cache::init();

		Config::getForms() && Form::init();
		Modules::init();
	}

	/**
	 * @return void
	 */
	private static function checkConfig() {
		if (!Config::getIsInitialized()) {
			throw new ConfigNotInitializedException();
		}
	}
}
