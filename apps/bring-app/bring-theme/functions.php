<?php

declare(strict_types=1);

use Dotenv\Dotenv;

use Bring\BlocksWP\BringBlocks;
use Bring\BlocksWP\Config;

use BringTheme\Enqueue\Enqueue;
use BringTheme\Env\Env;
use BringTheme\Forms\Forms;
use BringTheme\General\General;
use BringTheme\Post\Post;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

require "vendor/autoload.php";

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// config bring
Config::init([
	"DATA_TOKEN" => Env::DATA_TOKEN(),
	"JWT_SECRET_KEY" => Env::JWT_SECRET_KEY(),
	"NEXT_URL" => Env::NEXT_URL(),
])
	// Turn on layout features
	->useHeader()
	->useFooter()
	->useLayout()
	->useLibrary()
	// Configure editor & layout
	->editorPostTypes()
	->layoutPostTypes()
	->layoutTaxonomies()
	// Add entity props
	->entityProps([])
	// Further features
	->forms(["contact"])
	// Register blocks
	->blocks([
		// layout
		"column",
		"group",
		"row",
		"section",
		"split",
		// components
		"button",
		"contactform",
		"divider",
		"embed",
		"heading",
		"image",
		"markdown",
	]);

// init bring
BringBlocks::init();

// init theme
Enqueue::init();
Forms::init();
General::init();
Post::init();
