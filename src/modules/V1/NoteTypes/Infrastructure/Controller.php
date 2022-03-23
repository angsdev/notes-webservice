<?php

namespace Modules\V1\NoteTypes\Infrastructure;

use Exception;
use Shared\Utils\ApiController;
use Modules\V1\NoteTypes\Application\Service;
use Modules\V1\NoteTypes\Infrastructure\Validations;

class Controller extends ApiController {

  /**
   * Display a listing of the resource.
   * @return Illuminate\Http\Response
   */
  public function index(){

    try{

      $queryParams = $this->collectionOptions();
      $noteTypes = Service::getAll($queryParams);
      return $this->successResponse($noteTypes);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function show($id){

    try{

      $noteType = Service::getById($id);
      return $this->successResponse($noteType);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @return Illuminate\Http\Response
   */
  public function store(){

    try{

      $noteTypeData = request()->validate(Validations::$store);
      $noteType = Service::create($noteTypeData);
      return $this->successResponse($noteType);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function update($id){

    try{

      $noteTypeData = request()->validate(Validations::$update);
      $noteType = Service::update($id, $noteTypeData);
      return $this->successResponse($noteType);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove the specified resource from storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function destroy($id){

    try{

      $noteType = Service::delete($id);
      return $this->successResponse($noteType);
    } catch(Exception $e){ return $this->handleException($e); }
  }
}
