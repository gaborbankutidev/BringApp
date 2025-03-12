<?php

declare(strict_types=1);

namespace SearchWP;

class Query {
	/**
	 * @param string $term
	 * @param array<string,string> $args
	 *
	 * @phpstan-ignore-next-line
	 */
	public function __construct($term, $args = []) {}

	/**
	 * @return array<object{"id": string, "source": string, "relevance": string}>
	 *
	 * @phpstan-ignore-next-line
	 */
	public function get_results() {}
}
