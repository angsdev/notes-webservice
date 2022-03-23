<?php

namespace Modules\V1\Notes\Infrastructure\Persistence\Eloquent;

use Modules\V1\Notes\Domain\IModuleRepository;
use Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model;

class Repository implements IModuleRepository {

  /**
   * Get all records and it total.
   * @param array $options
   * @return array
   */
  public static function getAll($options = []){

    $defaults = [ 'page' => 1, 'per_page' => 15, 'where' => [], 'sort_by' => [], 'order' => '', 'with' => [], 'filter' => [] ];
    [ 'page' => $page, 'per_page' => $per_page, 'where' => $where, 'sort_by' => $sort_by, 'order' => $order, 'with' => $with, 'filter' => $filter ] = $options + $defaults;

    $query = Model::findMatches($where);
    $total = $query->count();
    $query = $query->skip(($page - 1) * $per_page)->limit($per_page)->with($with);
    if(is_string($sort_by)){

      $sort_by = explode(',', $sort_by);
      if(!$sort_by[0]) array_shift($sort_by);
    }
    foreach($sort_by as $field) $query->orderBy($field, (($order === 'asc') ? $order : 'desc'));
    $data = $query->get((count($filter) > 0) ? $filter : '*');
    return [ 'total' => $total, 'data' => $data ];
  }

  /**
   * Get one record.
   * @param array $where
   * @param array $options
   * @return Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model
   */
  public static function getBy($where, $options = []){

    [ 'with' => $with, 'filter' => $filter ] = $options + [ 'with' => [], 'filter' => [] ];
    $data = Model::findMatches($where)->with($with)->first((count($filter) > 0) ? $filter : '*');
    return $data;
  }

  /**
   * Create one or more record.
   * @param array $data
   * @return Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model|Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model[]
   */
  public static function create($data){

    $data = (isset($data[0]) && is_array($data[0])) ? Model::createMany($data)
                                                    : Model::create($data);
    return $data;
  }

  /**
   * Update one or more record.
   * @param array $where
   * @param array $toUpdate
   * @param array $options
   * @return Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model
   */
  public static function update($where, $toUpdate, $options = []){

    [ 'with' => $with, 'filter' => $filter, 'many' => $many ] = $options + [ 'with' => [], 'filter' => [], 'many' => false ];
    $query = Model::findMatches($where)->with($with);
    $data = $query->{($many) ? 'get' : 'first'}((count($filter) > 0) ? $filter : '*');
    ($many) ? $query->update($toUpdate) : $data->update($toUpdate);
    if($many) $data = $data->fresh();
    return $data;
  }

  /**
   * Delete one or more records.
   * @param array $where
   * @param array $options
   * @return Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model
   */
  public static function delete($where, $options = []){

    [ 'with' => $with, 'filter' => $filter, 'many' => $many ] = $options + [ 'with' => [], 'filter' => [], 'many' => false ];
    $query = Model::findMatches($where)->with($with);
    $data = $query->{($many) ? 'get' : 'first'}((count($filter) > 0) ? $filter : '*');
    ($many) ? ($query->delete()) : $data->delete();
    return $data;
  }
}
