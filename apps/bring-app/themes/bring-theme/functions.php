<?php

declare(strict_types=1);

use Dotenv\Dotenv;

use Bring\BlocksWP\BringBlocks;
use Bring\BlocksWP\Config;

use BringTheme\Settings\Settings;
use BringTheme\Enqueue\Enqueue;
use BringTheme\Env\Env;
use BringTheme\Forms\Forms;
use BringTheme\General\General;
use BringTheme\Post\Post;
use BringTheme\Plugins\Plugins;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

require "vendor/autoload.php";

$dotenv = Dotenv::createImmutable(__DIR__);
$dotenv->safeLoad();

// initialize wordpress settings
Settings::init();

// config bring
Config::init([
	"DATA_TOKEN" => Env::DATA_TOKEN(),
	"JWT_SECRET_KEY" => Env::JWT_SECRET_KEY(),
	"NEXT_BASE_URL" => Env::NEXT_BASE_URL(),
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
		"divider",
		"embed",
		"heading",
		"image",
		"markdown",
		"post-content",
		"contact-form",
	])
	// Ignore paths
	->ignorePaths(["rest-api/docs"]);

// init bring
BringBlocks::init();

// init theme
Enqueue::init();
Forms::init();
General::init();
Post::init();

// init plugins
Plugins::init();
