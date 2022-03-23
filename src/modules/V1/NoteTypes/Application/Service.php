<?php

namespace Modules\V1\NoteTypes\Application;

use Exception;
use Modules\V1\NoteTypes\Application\DTO;
use Modules\V1\NoteTypes\Domain\Entity as NoteType;
use Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent\Repository;

class Service {

  /**
   * Get all resources.
   * @param array $options
   * @return array
   */
  public static function getAll($options = []){

    $options = $options + [ 'page' => 1, 'per_page' => 15, 'where' => [], 'sort_by' => [], 'order' => 'desc' ];
    [ 'total' => $total, 'data' => $data ] = Repository::getAll($options);
    $pages = (int) ceil($total/$options['per_page']) ?? 0;
    $parsedResults = [ 'total' => $total, 'pages' => $pages, 'page' => $options['page'], 'data' => DTO::multiple($data) ];
    return $parsedResults;
  }

  /**
   * Get one resource by id.
   * @param string|number $id
   * @param string|string[] $with
   * @return array
   */
  public static function getById($id, $with = []){

    $where = [ 'id' => $id ];
    $data = Repository::getBy($where, $with);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Create a resource.
   * @param array $inputData
   * @return array|array[]
   */
  public static function create($inputData){

    $entity = new NoteType($inputData);
    $data = Repository::create($entity->toArray());
    return DTO::single($data);
  }

  /**
   * Update a resource.
   * @param string $id
   * @param array $toUpdate
   * @return array
   */
  public static function update($id, $toUpdate){

    $where = [ 'id' => $id ];
    $data = Repository::update($where, $toUpdate);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Delete a resource.
   * @param string $id
   * @return array
   */
  public static function delete($id){

    $where = [ 'id' => $id ];
    $data = Repository::delete($where);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }
}
