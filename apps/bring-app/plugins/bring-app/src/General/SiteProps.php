<?php

declare(strict_types=1);

namespace BringApp\General;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class SiteProps {
	/**
	 * Initialize site props
	 *
	 * @return void
	 */
	public static function init() {
		add_filter("bring_site_props", self::socialLinks(...));
	}

	/**
	 * Add social links to site props
	 *
	 * @param array<string,mixed> $siteProps
	 * @return array<string,mixed> $siteProps
	 */
	private static function socialLinks($siteProps) {
		$socialLinks = [];

		// Get social links from options page
		$fields = ["facebook", "instagram", "linkedin", "github"];
		foreach ($fields as $field) {
			$value = get_field($field, "option");
			if (is_string($value) && $value !== "") {
				$socialLinks[$field] = $value;
			}
		}

		// Add social links to site props
		$siteProps["socialLinks"] = $socialLinks;

		return $siteProps;
	}
}
