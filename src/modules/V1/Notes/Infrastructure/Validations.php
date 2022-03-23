<?php

namespace Modules\V1\Notes\Infrastructure;

class Validations {

  /**
   * Note store method validations.
   * @var string[]
   */
  public static $store = [
    'user_id' => 'integer|required',
    'type_id' => 'integer|required',
    'title' => 'string|required',
    'description' => 'sometimes|string|nullable'
  ];

  /**
   * Note update method validations.
   * @var string[]
   */
  public static $update = [
    'user_id' => 'sometimes|integer',
    'type_id' => 'sometimes|integer',
    'title' => 'sometimes|string',
    'description' => 'sometimes|string|nullable'
  ];
}
