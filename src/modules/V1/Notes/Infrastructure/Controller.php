<?php

namespace Modules\V1\Notes\Infrastructure;

use Exception;
use Shared\Utils\ApiController;
use Modules\V1\Notes\Application\Service;
use Modules\V1\Notes\Infrastructure\Validations;

class Controller extends ApiController {

  /**
   * Display a listing of the resource.
   * @return Illuminate\Http\Response
   */
  public function index(){

    try{

      $queryParams = $this->collectionOptions();
      $notes = Service::getAll($queryParams);
      return $this->successResponse($notes);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function show($id){

    try{

      $note = Service::getById($id);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @return Illuminate\Http\Response
   */
  public function store(){

    try{

      $noteData = request()->validate(Validations::$store);
      $note = Service::create($noteData);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function update($id){

    try{

      $noteData = request()->validate(Validations::$update);
      $note = Service::update($id, $noteData);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove the specified resource from storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function destroy($id){

    try{

      $note = Service::delete($id);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }
}
