<?php

namespace WpReactAdminTheme;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

use WP_REST_Request;
use WP_REST_Response;

class PostResource {
	public static function create_validator($body) {
		if (!is_array($body)) {
			return [
				"ok" => false,
				"error" => "Body is not an array",
			];
		}

		if (!is_string($body["title"])) {
			return [
				"ok" => false,
				"error" => "Title must be string",
			];
		}

		if (!is_string($body["description"])) {
			return [
				"ok" => false,
				"error" => "Description must be string",
			];
		}

		if ($body["title"] === $body["description"]) {
			return [
				"ok" => false,
				"error" => "Title and description must be different",
			];
		}

		return [
			"ok" => true,
			"error" => null,
		];
	}

	public static function create(WP_REST_Request $request) {
		$body = $request->get_json_params();

		$validation = self::create_validator($body);

		if (!$validation["ok"]) {
			return new WP_REST_Response(["error" => $validation["error"]], 400);
		}

		// create new post
		$post_id = wp_insert_post([
			"post_title" => $body["title"],
			"post_content" => $body["description"],
			"post_status" => "publish",
			"post_author" => 1,
			"post_type" => "post",
		]);

		return new WP_REST_Response(
			[
				"title" => $body["title"],
				"description" => $body["description"],
				"id" => $post_id,
			],
			200,
		);
	}

	public static function read_validator($body) {
		if (!is_array($body)) {
			return [
				"ok" => false,
				"error" => "Body is not an array",
			];
		}

		if (!is_string($body["id"])) {
			return [
				"ok" => false,
				"error" => "Id must be string",
			];
		}

		return [
			"ok" => true,
			"error" => null,
		];
	}

	public static function read(WP_REST_Request $request) {
		$body = $request->get_json_params();

		$validation = self::read_validator($body);

		if (!$validation["ok"]) {
			return new WP_REST_Response(["error" => $validation["error"]], 400);
		}

		$post = get_post($body["id"]);
		$title = $post->post_title;
		$description = $post->post_content;
		$id = $post->ID;

		return new WP_REST_Response(
			[
				"id" => $id,
				"title" => $title,
				"description" => $description,
			],
			200,
		);
	}

	public static function update_validator($body) {
		if (!is_array($body)) {
			return [
				"ok" => false,
				"error" => "Body is not an array",
			];
		}

		if (!is_string($body["id"])) {
			return [
				"ok" => false,
				"error" => "Id must be string",
			];
		}

		if (!is_string($body["title"])) {
			return [
				"ok" => false,
				"error" => "Title must be string",
			];
		}

		if (!is_string($body["description"])) {
			return [
				"ok" => false,
				"error" => "Description must be string",
			];
		}

		if ($body["title"] === $body["description"]) {
			return [
				"ok" => false,
				"error" => "Title and description must be different",
			];
		}

		return [
			"ok" => true,
			"error" => null,
		];
	}

	public static function update(WP_REST_Request $request) {
		$body = $request->get_json_params();

		$validation = self::update_validator($body);

		if (!$validation["ok"]) {
			return new WP_REST_Response(["error" => $validation["error"]], 400);
		}

		// update post
		wp_update_post([
			"ID" => $body["id"],
			"post_title" => $body["title"],
			"post_content" => $body["description"],
		]);

		return new WP_REST_Response(["body" => $body], 200);
	}

	public static function delete_validator($body) {
		if (!is_array($body)) {
			return [
				"ok" => false,
				"error" => "Body is not an array",
			];
		}

		if (!is_string($body["id"])) {
			return [
				"ok" => false,
				"error" => "Id must be string",
			];
		}

		return [
			"ok" => true,
			"error" => null,
		];
	}

	public static function delete(WP_REST_Request $request) {
		$body = $request->get_json_params();

		$validation = self::delete_validator($body);

		if (!$validation["ok"]) {
			return new WP_REST_Response(["error" => $validation["error"]], 400);
		}

		// delete post
		wp_delete_post($body["id"], true);

		return new WP_REST_Response(["id" => $body["id"]], 200);
	}

	public static function list() {
		$posts = get_posts([
			"post_type" => "post",
			"numberposts" => -1,
		]);

		$posts = array_map(function ($post) {
			return [
				"id" => $post->ID,
				"title" => $post->post_title,
				"description" => $post->post_content,
			];
		}, $posts);

		return new WP_REST_Response($posts, 200);
	}
}
