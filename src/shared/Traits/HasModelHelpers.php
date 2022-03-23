<?php

namespace Shared\Traits;

use Illuminate\Support\Str;
use Shared\Traits\HasGeneralHelpers;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

/**
 * Trait to add to models aditional features.
 */
trait HasModelHelpers {

  use HasGeneralHelpers { resetAutoIncrement as resetAI; }

  /**
   * Determines if current model instance is associated with given model and has it value.
   *
   * @param  Model $model
   * @param  String|Null $name
   * @return $this
   * @throws \Symfony\Component\HttpKernel\Exception\HttpException
   * @throws \Symfony\Component\HttpKernel\Exception\NotFoundHttpException
   */
  public function isAssociatedWith(Model $model, ?String $name = Null){

    $relations = collect(get_class_methods($this));
    [ $modelName, $thisName ] = $this->getCleanClassName([ $model, $this ]);
    $name = $name ?: $modelName;
    $relations->contains($name) ?: $name = Str::plural($name);
    $relations->contains($name) ?: abort(401, 'No '.$name.' related to the given '.$thisName.'.');
    return ($this->{$name}->contains('id', $model->id)) ? $this : abort(401, 'The specified '.$modelName.' isn\'t associated with the given '.$thisName.'.');
  }

  /**
   * Handle update depending of HTTP method.
   *
   * @param  Array $rules
   * @return \Illuminate\Database\Eloquent\Model $model
   */
  public function customUpdate(?Array $rules = []): Model {

    $method = request()->method();
    $input = ($method === 'PUT') ? request()->validate($rules) : request()->all();
    $update = [
      'PUT' => fn() => $this->update($input),
      'PATCH' => function() use($input){
        foreach ($input as $key => $val){
          $this->$key = (!empty($val)) ? $val : $this->$key;
        }
        $this->save();
      }
    ];
    $update[$method]();
    return $this;
  }

  /**
   * Searches for some model match and return the query.
   *
   * @param  Array $where
   * - 'id' key should be a model id.
   * - 'fields' key should be a string containing the fields that wants to match model separated for |.
   * @return \Illuminate\Database\Eloquent\Model|Null $model
   */
  public static function findMatches(Array $where): Builder {

    $modelMatch = self::where(function($query) use($where){

      if(!$where || empty($where)) return $query;
      [ $fields, $values ] = [ array_keys($where), array_values($where) ];
      foreach($fields as $key => $field) $query->{($key === 0) ? 'where' : 'orWhere'}($field, $values[$key]);
      return $query;
    });
    return $modelMatch;
  }

  /**
   * Reset table primary key auto_increment to maintain a numeric order and efficient database usage.
   *
   * @return void
   */
  public function resetAutoIncrement(){

    $this->resetAI($this);
  }
}
