<?php

declare(strict_types=1);

namespace BringApp\Settings;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class Settings {
	/**
	 * Configures WordPress settings
	 *
	 * @return void
	 */

	/**
	 * Initialize the settings.
	 * @return void
	 */
	public static function init(): void {
		// Hook into the 'pre_update_option_permalink_structure' filter to prevent permalink changes
		add_filter(
			"pre_update_option_permalink_structure",
			[__CLASS__, "prevent_permalink_change"],
			10,
			2,
		);

		// Hook into 'after_switch_theme' to enforce permalink structure when the theme is activated
		add_action("after_switch_theme", [
			__CLASS__,
			"enforce_permalink_structure",
		]);

		// Hook into 'admin_notices' to display notices
		add_action("admin_notices", [
			__CLASS__,
			"permalink_change_prevented_notice",
		]);
	}

	/**
	 * Prevent changes to the permalink structure.
	 *
	 * @param string $new_value The new permalink structure value.
	 * @param string $old_value The old permalink structure value.
	 * @return string The original permalink structure if the change is not allowed.
	 */
	public static function prevent_permalink_change(
		$new_value,
		$old_value,
	): string {
		// Check if the new value is different from the desired permalink structure
		if ($new_value !== BRING_APP_PERMALINK) {
			// Set a flag to display an error notice
			add_option("permalink_change_prevented", true);

			// Return the old value to prevent the change
			return $old_value;
		}

		// Allow the update if the new value is correct
		return $new_value;
	}

	/**
	 * Enforce the desired permalink structure when the theme is activated.
	 * @return void
	 */
	public static function enforce_permalink_structure(): void {
		// Get the current permalink structure
		$current_permalink_structure = get_option("permalink_structure");

		// Check if the current permalink structure matches the desired one
		if ($current_permalink_structure !== BRING_APP_PERMALINK) {
			// Update the permalink structure to the desired one
			update_option("permalink_structure", BRING_APP_PERMALINK);

			// Flush rewrite rules to apply the new permalink settings
			flush_rewrite_rules();

			// Add a notice to inform the admin
			add_action("admin_notices", [
				__CLASS__,
				"custom_permalink_change_notice",
			]);
		}
	}

	/**
	 * Display an error notice if the permalink change was prevented.
	 * @return void
	 */
	public static function permalink_change_prevented_notice(): void {
		if (get_option("permalink_change_prevented")) {
			echo '<div class="notice notice-error"><p>Changing the permalink structure is not allowed. The permalink structure must be set to "Post name" for the Bring App to function properly.</p></div>';

			// Delete the option to reset for future attempts
			delete_option("permalink_change_prevented");
		}
	}

	/**
	 * Display a notice if permalink structure enforcement changes the setting.
	 * @return void
	 */
	public static function custom_permalink_change_notice(): void {
		echo '<div class="notice notice-info"><p>The permalink structure has been automatically set to "Post name" to ensure Bring App compatibility.</p></div>';
	}
}
