<?php

namespace Modules\V1\Users\Infrastructure;

use Exception;
use Shared\Utils\ApiController;
use Modules\V1\Users\Application\Service;
use Modules\V1\Users\Infrastructure\Validations;

class Controller extends ApiController {

  /**
   * Display a listing of the resource.
   * @return Illuminate\Http\Response
   */
  public function index(){

    try{

      $queryParams = $this->collectionOptions();
      $users = Service::getAll($queryParams);
      return $this->successResponse($users);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function show($id){

    try{

      $user = Service::getByAnyOf($id);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @return Illuminate\Http\Response
   */
  public function store(){

    try{

      $userData = request()->validate(Validations::$store);
      $user = Service::create($userData);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function update($id){

    try{

      $userData = request()->validate(Validations::$update);
      $user = Service::update($id, $userData);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove the specified resource from storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function destroy($id){

    try{

      $user = Service::delete($id);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display a listing of the resource.
   * @param  Illuminate\Http\Request $request
   * @return Illuminate\Http\Response
   */
  public function indexUserNotes($id){

    try{

      $queryParams = $this->collectionOptions();
      $notes = Service::getAllUserNotes($id, $queryParams);
      return $this->successResponse($notes);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function showUserNote($id, $nid){

    try{

      $note = Service::getUserNote($id, $nid);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @return Illuminate\Http\Response
   */
  public function storeUserNote($id){

    try{

      $noteData = request()->validate(Validations::$storeUserNote);
      $note = Service::createUserNote($id, $noteData);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function updateUserNote($id, $nid){

    try{

      $noteData = request()->validate(Validations::$updateUserNote);
      $note = Service::updateUserNote($id, $nid, $noteData);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove the specified resource from storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function destroyUserNote($id, $nid){

    try{

      $note = Service::deleteUserNote($id, $nid);
      return $this->successResponse($note);
    } catch(Exception $e){ return $this->handleException($e); }
  }
}
