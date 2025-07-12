<?php

declare(strict_types=1);

namespace BringApp\General;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Filter {
	/**
	 * Initializes general module
	 *
	 * @return void
	 */
	public static function init() {
		add_filter("bring_dynamic_post_list_query_args", self::addExcludeArgs(...), 10, 3);
	}

	/**
	 * Add exclude array to the query args
	 * Dynamic queries can be filtered by exclude field by using the exclude key in the custom data
	 *
	 * @param array<string,mixed> $args
	 * @param string $entity_slug
	 * @param array<string,mixed> $custom_data
	 * @return array<string,mixed>
	 */
	private static function addExcludeArgs($args, $entity_slug, $custom_data) {
		// If no service is set, return the original query args
		if (
			!isset($custom_data["exclude"]) ||
			empty($custom_data["exclude"]) ||
			!is_array($custom_data["exclude"])
		) {
			return $args;
		}

		/**
		 * @var array<int|string> $exclude
		 */
		$exclude = $custom_data["exclude"];
		$args["exclude"] = array_filter($exclude, "is_numeric");

		return $args;
	}
}
