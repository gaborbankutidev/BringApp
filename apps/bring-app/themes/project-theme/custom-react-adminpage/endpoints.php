<?php

namespace WpReactAdminTheme;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

include_once "post-resource.php";
include_once "auth.php";

use WpReactAdminTheme\PostResource;
use WpReactAdminTheme\Auth;

class Endpoints {
	public static function init() {
		add_action("rest_api_init", self::post_endpoints(...));
	}

	public static function post_endpoints() {
		register_rest_route("bring", "/posts/create", [
			"methods" => "POST",
			"callback" => PostResource::create(...),
			"permission_callback" => Auth::permission_callback(...),
		]);
		register_rest_route("bring", "/posts/read", [
			"methods" => "POST",
			"callback" => PostResource::read(...),
			"permission_callback" => Auth::permission_callback(...),
		]);
		register_rest_route("bring", "/posts/update", [
			"methods" => "POST",
			"callback" => PostResource::update(...),
			"permission_callback" => Auth::permission_callback(...),
		]);
		register_rest_route("bring", "/posts/delete", [
			"methods" => "POST",
			"callback" => PostResource::delete(...),
			"permission_callback" => Auth::permission_callback(...),
		]);
		register_rest_route("bring", "/posts/list", [
			"methods" => "POST",
			"callback" => PostResource::list(...),
			"permission_callback" => Auth::permission_callback(...),
		]);
	}
}
