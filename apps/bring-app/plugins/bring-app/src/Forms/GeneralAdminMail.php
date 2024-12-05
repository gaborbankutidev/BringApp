<?php

declare(strict_types=1);

namespace BringApp\Forms;

// No direct access
defined("ABSPATH") or die("Hey, do not do this 😱");

class GeneralAdminMail {
	/**
	 * Initializes forms module
	 *
	 * @return void
	 */
	public static function init() {
		self::formAdminMails();
	}

	/**
	 * Add form submission mails
	 *
	 * This is a basic form submission mail that is sent to the admin email address.
	 * You can extend, remove or add other forms or emails as needed.
	 *
	 * @return void
	 */
	private static function formAdminMails() {
		add_filter(
			"bring_form_submission_mails",
			function ($a, $submission_id, $form_data, $form_name) {
				$a[] = [
					"from" => [
						"name" => "Bring Template website",
						"email" => "website@bring.team",
					],
					"emails" => ["team@bring.team"],
					"subject" => "New $form_name form submission",
					"reply" => [
						"name" => $form_data["name"],
						"email" => $form_data["email"],
					],
					"body" => self::formBody(...),
				];

				return $a;
			},
			10,
			4,
		);
	}

	/**
	 * Render form mail body
	 *
	 * @param int $submission_id Submission ID
	 * @param null|array<string, string> $form_data Form data
	 * @param string $form_name Form name
	 *
	 * @return string
	 */
	private static function formBody($submission_id, $form_data, $form_name) {
		$body = "<div style='margin-bottom: 16px;'>Form name: $form_name</div>";

		if (empty($form_data)) {
			return "<div>$body</div>";
		}

		foreach ($form_data as $name => $value) {
			$body .= "
				<div style='display: flex;'>
					<div style='width: 200px; font-weight:600;'>$name</div>
					<div>$value</div>
				</div>
			";
		}

		return "
            <div>
                $body
            </div>
        ";
	}
}
