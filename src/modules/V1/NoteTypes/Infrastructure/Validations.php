<?php

namespace Modules\V1\NoteTypes\Infrastructure;

class Validations {

  /**
   * Note type store method validations.
   * @var string[]
   */
  public static $store = [
    'name' => 'string|required',
    'description' => 'sometimes|string|nullable'
  ];

  /**
   * Note type update method validations.
   * @var string[]
   */
  public static $update = [
    'name' => 'sometimes|string',
    'description' => 'sometimes|string|nullable'
  ];
}
