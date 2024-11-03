<?php

declare(strict_types=1);

namespace Bring\BlocksWP\Client;

class Permalinks {
	/**
	 * @return void
	 */
	public static function init() {
		add_action("init", self::forcePermalinkStructure(...));
		add_action("admin_notices", self::addAdminNotice(...));
	}

	/**
	 * Force the permalink structure to /%postname%/
	 *
	 * @return void
	 */
	private static function forcePermalinkStructure() {
		global $wp_rewrite;

		// Set permalink structure to /%postname%/ (postname)
		if ($wp_rewrite->permalink_structure !== "/%postname%/") {
			$wp_rewrite->set_permalink_structure("/%postname%/");
			$wp_rewrite->flush_rules();
		}
	}

	/**
	 * Add an admin notice to the Permalink Settings page
	 *
	 * @return void
	 */
	private static function addAdminNotice() {
		// Check if we are on the Permalink Settings page
		$screen = get_current_screen();
		if (!$screen || $screen->id !== "options-permalink") {
			return;
		}

		// Display a notice
		echo "
            <div class='notice notice-info'>
                <p><strong>BringApp:</strong> The permalink structure is set to 'postname' and cannot be changed.</p>
            </div>
        ";
	}
}
