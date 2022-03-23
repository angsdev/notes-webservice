<?php

namespace Modules\V1\Auth\Infrastructure;

use Exception;
use Shared\Utils\ApiController;
use Modules\V1\Users\Application\Service;
use Modules\V1\Auth\Infrastructure\Validations;

class Controller extends ApiController {

  /**
   * Setup the new controller instance.
   */
  public function __construct(){

    $this->service = new Service();
  }

  /**
   * Display a listing of the resource.
   * @param  Illuminate\Http\Request $request
   * @return Illuminate\Http\Response
   */
  public function signUp(){

    try{

      $userData = request()->validate(Validations::$signUp);
      $user = $this->service->create($userData);
      return $this->successResponse($user, 201);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function signIn(){

    try{

      $credentials = request()->validate(Validations::$signIn);
      $user = $this->service->signIn($credentials);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @return Illuminate\Http\Response
   */
  public function googleSign(){

    try{

      [ 'token' => $token ] = request()->validate(Validations::$googleSign);
      $user = $this->service->google($token);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display a listing of the resource.
   * @param  Illuminate\Http\Request $request
   * @return Illuminate\Http\Response
   */
  public function forgotPassword(){

    try{

      [ 'username' => $username ] = response()->validate(Validations::$forgotPassword);
      $response = $this->service->forgotPassword($username);
      return $this->successResponse($response);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Display the specified resource.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function resetPassword($token){

    try{

      [ 'password' => $password ] = request()->validate(Validations::$resetPassword);
      $user = $this->service->resetPassword($token, $password);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Store a newly created resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @return Illuminate\Http\Response
   */
  public function emailVerify($token){

    try{

      $user = $this->service->verifyEmail($token);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function emailVerifyNotification(){

    try{

      $id = auth('sanctum')->id();
      $response = $this->service->sendEmailVerifyNotification($id);
      return $this->successResponse($response);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Update the specified resource in storage.
   * @param  Illuminate\Http\Request  $request
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function profileInfo(){

    try{

      $id = auth('sanctum')->id();
      $user = $this->service->getById($id);
      return $this->successResponse($user);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove the specified resource from storage.
   * @param  string|number  $id
   * @return Illuminate\Http\Response
   */
  public function profileNotesInfo(){

    try{

      $id = auth('sanctum')->id();
      $notes = $this->service->getAllUserNotes($id);
      return $this->successResponse($notes);
    } catch(Exception $e){ return $this->handleException($e); }
  }

  /**
   * Remove authentication token, it mean that close session.
   * @return \Illuminate\Http\Response
   */
  public function logout(){

    try{

      request()->user()->currentAccessToken()->delete();
      return $this->successResponse('Session closed.');
    } catch(Exception $e){ return $this->handleException($e); }
  }
}
