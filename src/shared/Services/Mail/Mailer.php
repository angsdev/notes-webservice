<?php

namespace Shared\Services\Mail;

use PHPMailer\PHPMailer\PHPMailer;

class Mailer extends PHPMailer {

  /**
   * Create a new mailer instance.
   * @param array $options
   */
  public function __construct($options = []){

    // parent::__construct(true);
    //Server settings
    $this->isSMTP();                                          //Send using SMTP
    $this->isHTML(true);                                      //Set email format to HTML
    $this->Host     = config('mail.mailers.smtp.host');                       //Set the SMTP server to send through
    $this->Port     = config('mail.mailers.smtp.port');                       //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
    $this->Username = config('mail.mailers.smtp.username');                   //SMTP username
    $this->Password = config('mail.mailers.smtp.password');                   //SMTP password
    $this->SMTPAuth = config('mail.mailers.smtp.auth_mode');                                   //Enable SMTP authentication
    //Recipients
    $this->setFrom(config('mail.from.address'), config('mail.from.name'));

    if($options['subject'] && is_string($options['subject'])) $this->Subject = $options['subject'];
    if($options['body'] && is_string($options['body'])) $this->Body = $options['body'];
  }

  /**
   * Set the mail subject and body.
   * @param string $subject
   * @param string $body;
   * @return $this
   */
  public function setContent($subject, $body){

    $this->Subject = $subject;
    $this->Body    = $body;
    return $this;
  }

  /**
   * Send the mail to addres given.
   * @param string $email
   * @param string $name
   * @return bool
   */
  public function sendTo($email, $name = null){

    $this->addAddress($email, $name);
    $result = $this->send();
    return $result;
  }
}
