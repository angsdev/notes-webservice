<?php

namespace Modules\V1\Search\Infrastructure;

use Exception;
use Shared\Utils\ApiController;
use Modules\V1\Users\Application\Service as UserService;
use Modules\V1\Notes\Application\Service as NoteService;
use Modules\V1\NoteTypes\Application\Service as NoteTypeService;

class Controller extends ApiController {

  /**
   * Collections which can be searched.
   * @var Service[]
   */
  protected $collections = [
    'users' => UserService::class,
    'notes' => NoteService::class,
    'notetypes' => NoteTypeService::class
  ];

  /**
   * Parse params to get correct collection and single indicator if exists.
   * @param string $params
   * @param string $terms
   * @param string $firstNested
   * @return array
   */
  private function parseParams($collection, $term, $firstNested){

    if($term === 'types'){
      $collection = "{$collection}{$term}";
      $term = $firstNested;
    }
    return [ $collection, $term ];
  }

  /**
   * Handle searching through different resource collections.
   * @param string $collection
   * @param string $term
   * @param string $firstNested
   * @return array
   */
  public function exec($collection, $term = null, $firstNested = null){

    try{

      [ $collection, $term ] = $this->parseParams($collection, $term, $firstNested);
      if(!isset($term) || is_null($term)) $options = $this->collectionOptions();

      $method = 'get'.(isset($term) && !is_null($term) ? 'ById' : 'All');
      $data = $this->collections[$collection]::{$method}($term ?? $options);
      return $this->successResponse($data);
    } catch(Exception $e){ return $this->handleException(new Exception('Resource not found.', 404)); }
  }
}
