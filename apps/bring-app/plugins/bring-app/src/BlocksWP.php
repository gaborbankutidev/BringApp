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
		// samples
		"basic",
		// layout
		"section",
		"flex",
		"grid",
		// components
		"button",
		"divider",
		"embed",
		"heading",
		"image",
		"markdown",
		"post-content",
		"contact-form",
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
			/**
			 * This setting allows you to disable the block editor for the main page.
			 */
			->nonEditorFront()
			/**
			 * This setting allows you to disable the block editor for specific post types or specific slugs.
			 *
			 * To disable the editor for an entire post type, set the post type name to true.
			 *   (For custom post types, it's usually better to not enable the editor when registering the post type,
			 *   but for default post types like "page" or "post", you can turn off the editor here.)
			 *
			 * To disable the editor for specific slugs (e.g., hardcoded pages), provide an array of slugs for the post type.
			 *   This is useful if you want to keep the SEO settings and other meta boxes editable in the editor for those pages,
			 *   but prevent editing the main content with blocks.
			 */
			->nonEditorPosts([
				"page" => ["docs", "readme"],
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
