<?php

declare(strict_types=1);

namespace BringApp;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class RemovePluginControls {
	/**
	 * @return void
	 */
	public static function init() {
		add_filter("plugin_action_links", self::removePluginControls(...), 10, 1);
		add_filter("bulk_actions-plugins", self::disableBulkActions(...));
		return;
	}

	/**
	 * @param array<string, mixed> $actions
	 * @return array<string, mixed>
	 */
	private static function removePluginControls($actions) {
		if (array_key_exists("edit", $actions)) {
			unset($actions["edit"]);
		}

		if (array_key_exists("deactivate", $actions)) {
			unset($actions["deactivate"]);
		}

		if (array_key_exists("activate", $actions)) {
			unset($actions["activate"]);
		}

		if (array_key_exists("delete", $actions)) {
			unset($actions["delete"]);
		}

		return $actions;
	}

	/**
	 * @param array<string, mixed> $actions
	 * @return array<string, mixed>
	 */
	private static function disableBulkActions($actions) {
		if (array_key_exists("deactivate-selected", $actions)) {
			unset($actions["deactivate-selected"]);
		}

		if (array_key_exists("activate-selected", $actions)) {
			unset($actions["activate-selected"]);
		}

		if (array_key_exists("delete-selected", $actions)) {
			unset($actions["delete-selected"]);
		}

		if (array_key_exists("update-selected", $actions)) {
			unset($actions["update-selected"]);
		}
		return $actions;
	}
}
