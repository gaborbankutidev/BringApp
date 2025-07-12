<?php

declare(strict_types=1);

namespace BringApp\General;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Taxonomies {
	/**
	 * Post types for which tags should be included in entity properties
	 *
	 * @var array<string> $post_types
	 */
	private static $post_types = ["post", "page"];

	/**
	 * Initialize default taxonomies update
	 * Make tags available for page post types
	 * Set tags and categories to non-public
	 *
	 * @return void
	 */
	public static function init() {
		// Make Category and Tag non-public
		add_filter("register_taxonomy_args", self::taxonomyArgs(...), 10, 2);

		// Remove rewrite rules for Category and Tag
		add_filter("category_rewrite_rules", self::rewriteRules(...));
		add_filter("tag_rewrite_rules", self::rewriteRules(...));

		// Add tags to pages
		add_action("init", self::addTagsToPages(...));

		// Add tags to entity requests
		foreach (self::$post_types as $post_type) {
			add_filter("bring_post_props_{$post_type}", self::addTagsToProps(...), 10, 2);
			add_filter("bring_dynamic_post_props_{$post_type}", self::addTagsToProps(...), 10, 2);
		}
	}

	/**
	 * Modify taxonomy arguments
	 *
	 * @param array<string, mixed> $args
	 * @param string $taxonomy
	 * @return array<string, mixed>
	 */
	private static function taxonomyArgs($args, $taxonomy) {
		if ("category" === $taxonomy || "post_tag" === $taxonomy) {
			$args["public"] = false;
		}

		return $args;
	}

	/**
	 * Remove rewrite rules for Category and Tag
	 *
	 * @param array<string,mixed> $rules
	 * @return array<string,mixed>
	 */
	private static function rewriteRules($rules) {
		return [];
	}

	/**
	 * Add tags to pages
	 *
	 * @return void
	 */
	private static function addTagsToPages() {
		register_taxonomy_for_object_type("post_tag", "page");
	}

	/**
	 * Add tags to  props
	 *
	 * @param array<string,mixed> $entityProps
	 * @param int $post_id
	 * @return array<string,mixed>
	 */
	private static function addTagsToProps($entityProps, $post_id) {
		$entityProps["tags"] = [];

		$tags = get_the_tags($post_id);
		if (!$tags || is_wp_error($tags)) {
			return $entityProps;
		}

		foreach ($tags as $tag) {
			$entityProps["tags"][] = [
				"id" => $tag->term_id,
				"name" => $tag->name,
				"slug" => $tag->slug,
			];
		}

		return $entityProps;
	}
}
