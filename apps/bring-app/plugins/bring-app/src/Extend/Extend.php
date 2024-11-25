<?php

declare(strict_types=1);

namespace BringApp\Extend;

use BringApp\Extend\JWTAuth\JWTAuth;
use BringApp\Extend\SearchWP\SearchWP;

class Extend {
	/**
	 * Initialize plugin extensions
	 * @return void
	 */
	public static function init() {
		/**
		 * We recommend JWT Auth – WordPress JSON Web Token Authentication plugin to implement JWT authentication.
		 * The plugin is extended with a logout endpoint.
		 */
		JWTAuth::init();
		/**
		 * We recommend SearchWP - https://searchwp.com/ plugin to implement search functionality.
		 * The plugin is extended with an API endpoint.
		 * As a best practice we recommend to extend the global tag taxonomy to all of you post types.
		 *
		 * Create an engine called main in the plugin settings.
		 * Use bring/search?term=your_search_term endpoint.
		 */
		SearchWP::init();
	}
}
