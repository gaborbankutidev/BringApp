<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Redirects;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

/**
 * Redirects instance and static helper methods
 * @package Bring\BlocksWP\Redirects
 * @since 2.0.1
 */
class Redirect {
	/**
	 * The redirect id
	 * @var int
	 */
	private readonly int $id;

	/**
	 * The redirect source url
	 * @var string
	 */
	private string $from;

	/**
	 * The redirect destination url
	 * @var string
	 */
	private string $to;

	/**
	 * The redirect status code
	 * @var int
	 */
	private int $status_code;

	/**
	 * The redirect hit count
	 * @var int
	 */
	private int $hits;

	/**
	 * Get a redirect by permalink
	 * @param string $permalink
	 * @return Redirect|null
	 */
	public static function getRedirectByFromPermalink(string $from_permalink): Redirect|null {
		$redirects = self::getRedirectsByFromPermalink($from_permalink);
		if (empty($redirects)) {
			return null;
		}

		return $redirects[0];
	}

	/**
	 * Get all redirects with a given from permalink
	 * @param string $permalink
	 * @return array<Redirect>
	 */
	public static function getRedirectsByFromPermalink(string $from_permalink): array {
		$redirects_query = get_posts([
			"post_type" => "redirect",
			"numberposts" => -1,
			"post_status" => "publish",
			"meta_query" => [
				"relation" => "AND",
				[
					"key" => "from",
					"value" => $from_permalink,
					"compare" => "=",
				],
				[
					"key" => "from",
					"value" => "",
					"compare" => "!=",
				],
				[
					"key" => "from",
					"compare" => "EXISTS",
				],
			],
		]);

		return array_map(fn($redirect) => new Redirect($redirect->ID), $redirects_query);
	}

	/**
	 * Create a new redirect instance
	 * @param int $id
	 * @return Redirect |  null
	 */
	public function __construct(int $id) {
		if (!get_post_type($id) == "redirect") {
			return null;
		}

		$this->id = $id;

		$this->from = get_post_meta($id, "from", true);
		$this->to = get_post_meta($id, "to", true);

		$this->status_code = (int) get_post_meta($id, "status_code", true);
		$this->hits = (int) get_post_meta($id, "hits", true);

		return $this;
	}

	/**
	 * Get id of the redirect
	 * @return int
	 */
	public function getId(): int {
		return $this->id;
	}

	/**
	 * Get the source url of the redirect
	 * @return string
	 */
	public function getFrom(): string {
		return $this->from;
	}

	/**
	 * Get the destination url of the redirect
	 * @return string
	 */
	public function getTo(): string {
		return $this->to;
	}

	/**
	 * Get the status code of the redirect
	 * @return int
	 */
	public function getStatusCode(): int {
		return $this->status_code;
	}

	/**
	 * Get the hit count of the redirect
	 * @return int
	 */
	public function getHits(): int {
		return $this->hits;
	}

	/**
	 * Set source url of the redirect
	 * @param string $from
	 * @return void
	 */
	public function setFrom(string $from): void {
		$this->from = $from;
		update_post_meta($this->id, "from", $from);
	}

	/**
	 * Set destination url of the redirect
	 * @param string $from
	 * @return void
	 */
	public function setTo(string $to): void {
		$this->to = $to;
		update_post_meta($this->id, "to", $to);
	}

	/**
	 * Set status code of the redirect
	 * @param string $from
	 * @return void
	 */
	public function setStatusCode(int $status_code): void {
		$this->status_code = $status_code;
		update_post_meta($this->id, "status_code", $status_code);
	}

	/**
	 * Increment the hit count of the redirect
	 * @param string $from
	 * @return void
	 */
	public function incrementHits(): void {
		$this->hits = $this->hits + 1;
		update_post_meta($this->id, "hits", $this->hits);
	}
}
