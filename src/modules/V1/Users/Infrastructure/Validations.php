<?php

namespace Modules\V1\Users\Infrastructure;

class Validations {

  /**
   * User store method validations.
   * @var string[]
   */
  public static $store = [
    'firstname' => 'string|required',
    'lastname' => 'sometimes|string|required',
    'username' => 'string|required',
    'phone' => 'sometimes|string|nullable',
    'email' => 'email|required',
    'password' => 'confirmed|required|regex:/((?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\W+).{8,})/'
  ];

  /**
   * User update method validations.
   * @var string[]
   */
  public static $update = [
    'firstname' => 'sometimes|string',
    'lastname' => 'sometimes|string',
    'username' => 'sometimes|string',
    'phone' => 'sometimes|string|nullable',
    'email' => 'sometimes|email',
    'password' => 'sometimes|confirmed|regex:/((?=.*\d+)(?=.*[a-z]+)(?=.*[A-Z]+)(?=.*\W+).{8,})/'
  ];

  /**
   * User note store method validations.
   * @var string[]
   */
  public static $storeUserNote = [
    'type_id' => 'integer|required',
    'title' => 'string|required',
    'description' => 'sometimes|string|nullable'
  ];

  /**
   * User note update method validations.
   * @var string[]
   */
  public static $updateUserNote = [
    'type_id' => 'sometimes|integer',
    'title' => 'sometimes|string',
    'description' => 'sometimes|string|nullable'
  ];
}
