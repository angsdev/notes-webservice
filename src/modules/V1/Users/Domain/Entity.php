<?php

namespace Modules\V1\Users\Domain;

class Entity {

  /**
   * Databaste identifier.
   * @var string|number
   */
  public $id;

  /**
   * Firstname.
   * @var string
   */
  public $firstname;

  /**
   * Lastname.
   * @var string
   */
  public $lastname;

  /**
   * Username.
   * @var string
   */
  public $username;

  /**
   * Phone.
   * @var string
   */
  public $phone;

  /**
   * Email.
   * @var string
   */
  public $email;

  /**
   * Password.
   * @var string
   */
  public $password;

  /**
   * User notes.
   * @var array
   */
  public $notes;

  /**
   * User access token.
   * @var string
   */
  public $access_token;

  /**
   * Create a new user instance.
   * @param array $data
   */
  public function __construct($data){

    $defaults = [ 'id' => null, 'phone' => null, 'access_token' => null ];
    [ 'id' => $id, 'firstname' => $firstname, 'lastname' => $lastname, 'username' => $username,
      'phone' => $phone, 'email' => $email, 'password' => $password, 'access_token' => $access_token ] = $data + $defaults;
    $this->id = $id;
    $this->firstname = $firstname;
    $this->lastname = $lastname;
    $this->username = $username;
    $this->phone = $phone;
    $this->email = $email;
    $this->password = $password;
    $this->access_token = $access_token;
  }

  /**
   * Transform the object to an array.
   * @return array
   */
  public function toArray(){

    return (array) $this;
  }
}
