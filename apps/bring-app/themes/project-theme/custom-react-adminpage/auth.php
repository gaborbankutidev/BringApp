<?php

namespace WpReactAdminTheme;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Auth {
	public static function permission_callback($request) {
		// Add BringBlocks auth here...
		return true;
	}
}
