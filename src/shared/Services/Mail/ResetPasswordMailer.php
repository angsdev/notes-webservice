<?php

namespace Shared\Services\Mail;

use Shared\Services\Mail\Mailer;

class ResetPasswordMailer {

  /**
   * Contains the template to be dimanic filled and sent.
   * @var string
   */
  private $template;

  /**
   * Create a new reset password mailer instance.
   * @param string $version
   * @param string $token
   */
  public function __construct($version, $token){

    $this->template = (require('Templates/ResetPasswordTemplate.php'))($version, $token);
    $this->mailer = new Mailer([
      'subject' => 'Password reset.',
      'body' => $this->template
    ]);
  }

  /**
   * Send the mail to addres given.
   * @param string $email
   * @param string $name
   * @return bool
   */
  public function sendTo($email, $name = ''){

    return $this->mailer->sendTo($email, $name);
  }
}
