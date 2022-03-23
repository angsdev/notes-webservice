<?php

namespace Modules\V1\Users\Application;

use Exception;
use Firebase\JWT\JWT;
use Google\Client as GoogleClient;
use Modules\V1\Users\Application\DTO;
use Modules\V1\Users\Domain\Entity as User;
use Shared\Services\Mail\VerifyEmailMailer;
use Shared\Services\Mail\ResetPasswordMailer;
use Modules\V1\Users\Infrastructure\Persistence\Eloquent\Repository;

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
   * Get one resource by any of given fields.
   * @param string|number $id
   * @param string|string[] $with
   * @return array
   */
  public static function getByAnyOf($id, $with = []){

    $where = orField('id|email|phone|username', $id);
    $data = Repository::getBy($where, $with);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
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
   * Get one resource by username.
   * @param string|number $username
   * @param string|string[] $with
   * @return array
   */
  public static function getByUsername($username, $with = []){

    $where = [ 'username' => $username ];
    $data = Repository::getBy($where, $with);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Get one resource by email.
   * @param string $email
   * @param string|string[] $with
   * @return array
   */
  public static function getByEmail($email, $with = []){

    $where = [ 'email' => $email ];
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

    $entity = new User($inputData);
    $entity->password = password_hash($entity->password, PASSWORD_BCRYPT);
    $data = Repository::create($entity->toArray());
    $data->access_token = $data->createToken('auth_token')->plainTextToken;
    $token = JWT::encode([ 'id' => $data->id ], config('app.key'));
    $mailer = new VerifyEmailMailer('v1', $token);
    $mailer->sendTo($data->email, 'Email verification.');
    return DTO::single($data);
  }

  /**
   * Update a resource.
   * @param string $id
   * @param array $toUpdate
   * @return array
   */
  public static function update($id, $toUpdate){

    $where = orField('id|email|phone|username', $id);
    if(isset($toUpdate['password'])) $toUpdate['password'] = password_hash($toUpdate['password'], PASSWORD_BCRYPT);
    $data = Repository::update($where, $toUpdate);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Soft delete a resource.
   * @param string $id
   * @return array
   */
  public static function softDelete($id){

    $where = orField('id|email|phone|username', $id);
    $softDelete = [ 'deleted_at' => date('Y-m-d H:i:s') ];
    $data = Repository::update($where, $softDelete);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Delete a resource.
   * @param string $id
   * @return array
   */
  public static function delete($id){

    $where = orField('id|email|phone|username', $id);
    $data = Repository::delete($where);
    if(!$data) throw new Exception('Resource not found.', 404);
    return DTO::single($data);
  }

  /**
   * Get all sub-resources.
   * @param string|number $id
   * @param array $options
   * @return array
   */
  public static function getAllUserNotes($id, $options){

    $options = $options + [ 'page' => 1, 'per_page' => 15, 'where' => [], 'sort_by' => [], 'order' => 'desc' ];
    $where = orField('id|email|phone|username', $id);
    [ 'total' => $total, 'data' => $data ] = Repository::getSubAll($where, 'notes', $options);
    $pages = (int) ceil($total/$options['per_page']) ?? 0;
    $parsedResults = [ 'total' => $total, 'pages' => $pages, 'page' => $options['page'], 'data' => $data ];
    return $parsedResults;
  }

  /**
   * Get one sub-resource by id.
   * @param string|number $id
   * @param string|number $nid
   * @return array
   */
  public static function getUserNote($id, $nid){

    $subWhere = [ 'notes' => $nid ];
    $where = orField('id|email|phone|username', $id);
    $data = Repository::getSubBy($where, $subWhere);
    if(!$data) throw new Exception('Resource not found.', 404);
    return $data;
  }

  /**
   * Create a sub-resource.
   * @param string|number $id
   * @param array $data
   * @return array|array[]
   */
  public static function createUserNote($id, $data){

    $where = orField('id|email|phone|username', $id);
    $data = Repository::createSub($where, 'notes', $data);
    return $data;
  }

  /**
   * Update a sub-resource.
   * @param string|number $id
   * @param string|number $nid
   * @param array $toUpdate
   * @return array
   */
  public static function updateUserNote($id, $nid, $toUpdate){

    $subWhere = [ 'notes' => $nid ];
    $where = orField('id|email|phone|username', $id);
    $data = Repository::updateSub($where, $subWhere, $toUpdate);
    if(!$data) throw new Exception('Resource not found.', 404);
    return $data;
  }

  /**
   * Delete a sub-resource.
   * @param string|number $id
   * @param string|number $nid
   * @return array
   */
  public static function deleteUserNote($id, $nid){

    $subWhere = [ 'notes' => $nid ];
    $where = orField('id|email|phone|username', $id);
    $data = Repository::deleteSub($where, $subWhere);
    if(!$data) throw new Exception('Resource not found.', 404);
    return $data;
  }

  /**
   * Signin an user by username and password.
   * @param array $credentials
   * @return array
   */
  public static function signIn($credentials){

    [ 'username' => $username, 'password' => $password ] = $credentials;
    $where = orField('email|phone|username', $username);
    $user = Repository::getBy($where);
    if(!$user) throw new Exception('Resource not found.', 404);
    $validPassword = password_verify($password, $user->password);
    if(!$validPassword) throw new Exception('Resource not found.', 404);
    $user->access_token = $user->createToken('auth_token')->plainTextToken;
    return DTO::single($user);
  }

  /**
   * Sign in or up with google depending on user existence.
   * @param string $id_token
   * @return array
   */
  public static function google($token){

    $client = new GoogleClient([ 'client_id' => config('services.google.client_id') ]);
    $payload = $client->verifyIdToken($token);
    $user = Repository::getBy([ 'email' => $payload['email'] ]) ??
            Repository::create([
              'firstname' => $payload['given_name'],
              'lastname' => $payload['family_name'],
              'username' => explode('@', $payload['email'])[0],
              'email' => $payload['email'],
              'password' => $payload['sub']
            ]);
    $user->access_token = $user->createToken('auth_token')->plainTextToken;
    return DTO::single($user);
  }

  /**
   * Send a email solution to forgot password.
   * @param string $email
   * @return array
   */
  public static function forgotPassword($username){

    $where = orField('email|phone|username', $username);
    $user = Repository::getBy($where);
    if(!$user) throw new Exception('Resource not found.', 404);
    $token = JWT::encode([ 'id' => $user->id ], config('app.key'));
    $mailer = new ResetPasswordMailer('v1', $token);
    $mailer->sendTo($user->email, 'Password Reset');
    return 'Password reset email was sent to your email.';
  }

  /**
   * Reset password.
   * @param string $token
   * @param string $password
   * @return array
   */
  public static function resetPassword($token, $password){

    $payload = JWT::decode($token, config('app.key'));
    $where = [ 'id' => $payload['id'] ];
    $user = Repository::getBy($where);
    if(!$user) throw new Exception('Resource not found.', 404);
    $user->forceFill([ 'password' => password_hash($password, PASSWORD_BCRYPT) ])->save();
    $user->access_token = $user->createToken('auth_token')->plainTextToken;
    return DTO::single($user);
  }

  /**
   * Send a notification to an authenticated user email to get verified.
   * @param string $id
   * @return string
   */
  public static function sendEmailVerifyNotification($id){

    $where = [ 'id' => $id ];
    $user = Repository::getBy($where);
    if(!$user) throw new Exception('Resource not found.', 404);
    $token = JWT::encode([ 'id' => $user->id ], config('app.key'));
    $mailer = new VerifyEmailMailer('v1', $token);
    $mailer->sendTo($user->email, 'Email verification.');
    return 'Email verification was sent to your email.';
  }

  /**
   * Verify an email.
   * @param string $token
   * @return array
   */
  public static function verifyEmail($token){

    $payload = JWT::decode($token, config('app.key'));
    $where = [ 'id' => $payload['id'] ];
    $user = Repository::getBy($where);
    if(!$user) throw new Exception('Resource not found.', 404);
    $user->forceFill([ 'email_verified_at' => date('c') ])->save();
    return $user;
  }
}
