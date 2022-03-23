<?php

namespace Modules\V1\Auth\Infrastructure;

class Validations {

  /**
   * SignUp method validations.
   * @var string[]
   */
  public static $signUp = [
    'firstname' => 'string|required',
    'lastname' => 'sometimes|string|required',
    'username' => 'string|required',
    'phone' => 'sometimes|string|nullable',
    'email' => 'email|required',
    'password' => 'confirmed|required|regex:/((?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\W+).{8,})/'
  ];

  /**
   * SignIn method validations.
   * @var string[]
   */
  public static $signIn = [
    'username' => 'string|required',
    'password' => 'string|required|regex:/((?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\W+).{8,})/'
  ];

  /**
   * Google Sign method validations.
   * @var string[]
   */
  public static $googleSign = [
    'token' => 'string|required'
  ];

  /**
   * Forgot password method validations.
   * @var string[]
   */
  public static $forgotPassword = [
    'username' => 'string|required'
  ];

  /**
   * Reset password method validations.
   * @var string[]
   */
  public static $resetPassword = [
    'password' => 'confirmed|required|regex:/((?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\W+).{8,})/'
  ];
}
