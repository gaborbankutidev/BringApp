<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Cache;

use Bring\BlocksWP\Config;

class Admin {
	/**
	 * @return void
	 */
	public static function init() {
		$data_token = Config::getEnv()["DATA_TOKEN"];
		$next_base_url = Config::getEnv()["NEXT_BASE_URL"];

		// Add Clear next cache button to admin bar
		add_action(
			"admin_bar_menu",
			function ($wp_admin_bar) use ($next_base_url, $data_token) {
				$args = [
					"id" => "bring_clear_cache",
					"title" => "Clear cache",
					"href" => "{$next_base_url}/api/clear-cache?token={$data_token}",
					"meta" => [
						"class" => "custom-button-class",
						"target" => "_blank",
					],
				];
				$wp_admin_bar->add_node($args);
			},
			999,
		);
	}
}
