<?php

declare(strict_types=1);

namespace BringApp;

use Bring\BlocksWP\BringBlocks;
use Bring\BlocksWP\Config;

use BringApp\Env\Env;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class BlocksWP {
	/**
	 * List the allowed blocks
	 * @var string[] $blocks
	 */
	private static $blocks = [
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
		"login-form",
	];

	/**
	 * Initialize BlocksWP
	 * @return void
	 */
	public static function init() {
		if (!defined("BRING_APP_PLUGIN_PATH") || !defined("BRING_APP_PLUGIN_URL")) {
			wp_die(
				"The required url and path constants are not defined: BRING_APP_PLUGIN_PATH & BRING_APP_PLUGIN_URL. Please check your bring-app.php plugin file.",
				"Error",
			);
		}

		// Config BlocksWP
		Config::init([
			"JWT_SECRET_KEY" => Env::JWT_SECRET_KEY(),
			"NEXT_BASE_URL" => Env::NEXT_BASE_URL(),
			"BRING_APP_VERSION" => BRING_APP_VERSION,
			"BRING_APP_PLUGIN_PATH" => BRING_APP_PLUGIN_PATH,
			"BRING_APP_PLUGIN_URL" => BRING_APP_PLUGIN_URL,
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
			->nonEditorFront()
			->nonEditorPosts([
				"page" => ["docs", "readme"], // add the slug hardcoded pages
			])
			// Add entity props
			->entityProps([])
			// Further features
			->menuLocations([
				"headerMenu" => "Header menu",
				"footerMenu" => "Footer menu",
				"bottomMenu" => "Bottom menu",
			])
			->forms(["contact"])
			->sitemap([
				"posts" => ["page", "post"],
				"taxonomies" => false,
				"authors" => false,
			])
			->useRankMath()
			// Register blocks
			->blocks(self::$blocks)
			// Ignore paths
			->ignorePaths(["rest-api/docs", "rest-api/schema"]);

		// Init BlocksWP
		BringBlocks::init();
	}
}
