<?php

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

require_once "custom-pages.php";
require_once "endpoints.php";
require_once "enqueue.php";

use WpReactAdminTheme\Enqueue;
use WpReactAdminTheme\Endpoints;
use WpReactAdminTheme\CustomPages;

Enqueue::init();
Endpoints::init();
CustomPages::init();
