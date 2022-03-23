<?php

namespace Modules\V1\Users\Application;

class DTO {

  /**
   * Wrap a resource filtering data to transfer.
   * @param array|Model $resource
   * @return array
   */
  public static function single($resource){

    if(is_object($resource)) $resource = $resource->toArray();
    return array_filter([
      'uid' => $resource['id'],
      'firstname' => $resource['firstname'],
      'lastname' => $resource['lastname'],
      'username' => $resource['username'],
      'phone' => $resource['phone'] ?? false,
      'email' => $resource['email'],
      'notes' => $resource['notes'] ?? false,
      'access_token' => $resource['access_token'] ?? false
    ], fn($val) => $val);
  }

  /**
   * Wrap a multiples resources filtering data to transfer.
   * @param array[]|Model[] $resources
   * @return array[]
   */
  public static function multiple($resources){

    if(is_object($resources)) $resources = $resources->toArray();
    return array_map(fn($resource) => self::single($resource), $resources);
  }
}
