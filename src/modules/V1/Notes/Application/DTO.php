<?php

namespace Modules\V1\Notes\Application;

class DTO {

  /**
   * Wrap a resource filtering data to transfer.
   * @param array|Model $resource
   * @return array
   */
  public static function single($resource){

    if(is_object($resource)) $resource = $resource->toArray();
    return array_filter([
      'id' => $resource['id'],
      'user' => $resource['user_id'] ?? false,
      'type' => $resource['type_id'] ?? false,
      'title' => $resource['title'],
      'content' => $resource['content'] ?? false
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
