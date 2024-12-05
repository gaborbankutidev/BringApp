<?php

declare(strict_types=1);

namespace BringApp\Extend\SearchWP;

use WP_REST_Response;
use WP_REST_Request;
use WP_Error;

use SearchWP\Query;

use Bring\BlocksWP\Dynamic;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Api {
	/**
	 * Initialize search api
	 *
	 * @return void
	 */
	public static function init() {
		self::registerRoutes();
	}

	/**
	 * Register search routes
	 *
	 * @return void
	 */
	private static function registerRoutes() {
		add_action("rest_api_init", function () {
			register_rest_route("bring", "/search", [
				"methods" => "GET",
				"callback" => self::search(...),
				"permission_callback" => "__return_true",
			]);
		});
	}

	/**
	 * Handle search request
	 *
	 * @param WP_REST_Request<array<mixed,mixed>> $request
	 * @return WP_REST_Response|WP_Error
	 */
	private static function search(WP_REST_Request $request) {
		/**
		 * @var string|null $term
		 */
		$term = $request->get_param("term");

		// return if term is empty
		if (empty($term)) {
			return new WP_Error("missing_parameters", "Term is missing", [
				"status" => 400,
			]);
		}

		// get term from request
		$term = sanitize_text_field($term);

		// search for term
		$search = new Query($term, [
			"engine" => "main",
		]);
		$search_results = $search->get_results();

		// sort results by relevance
		usort($search_results, function ($a, $b) {
			$a = intval($a->relevance);
			$b = intval($b->relevance);

			if ($a == $b) {
				return 0;
			}
			return $a > $b ? -1 : 1;
		});

		// prepare results
		$results = [];
		foreach ($search->get_results() as $result) {
			[$entity_type, $entity_slug] = explode(".", $result->source);
			$entity_id = intval($result->id);

			$entity = Dynamic\Props::getDynamicProps($entity_type, $entity_id, [
				"custom_data" => [],
			]);
			if (empty($entity) || empty($entity["entityProps"])) {
				continue;
			}

			$entity = $entity["entityProps"];
			$entity["relevance"] = intval($result->relevance);

			$results[] = $entity;
		}

		return new WP_REST_Response(
			[
				"term" => $term,
				"results" => $results,
			],
			200,
		);
	}
}
