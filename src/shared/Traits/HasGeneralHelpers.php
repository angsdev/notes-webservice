<?php

namespace Shared\Traits;

use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;

/**
 * Trait to add to models aditional features.
 */
trait HasGeneralHelpers {

  // /**
  //  * Get clean className.
  //  *
  //  * @param  Model $model
  //  * @param  Boolean $lowercase
  //  * @return String
  //  */
  // protected function getCleanClassName(Model|Array $model, Bool $lowercase = true){

  //   if(gettype($model) === 'array'){

  //     return array_map(fn($val) => ($lowercase) ? strtolower(class_basename($val)) : class_basename($val), $model);
  //   }
  //   $className = class_basename($model);
  //   return ($lowercase) ? strtolower($className) : $className;
  // }

  /**
   * Add inputs to a request.
   *
   * @param  Array $inputs
   * @return void
   */
  protected function addInputsToRequest($inputs){

    collect($inputs)->each(fn($val, $key) => request()->merge([$key => $val]));
  }

  /**
   * Reset table primary key auto_increment to maintain a numeric order and efficient database usage.
   *
   * @param  Model|String $model
   * @return void
   */
  protected function resetAutoIncrement(Model|String $target){

    $table = (gettype($target) === 'string') ? DB::table($target) : DB::table($target->getTable());
    $lastIndex = $table->max('id');
    DB::statement('ALTER TABLE '.$table->from.' AUTO_INCREMENT = '.++$lastIndex);
  }
}
