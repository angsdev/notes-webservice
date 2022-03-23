<?php

namespace Shared\Traits;

use Exception;
use ErrorException;
use Illuminate\Database\QueryException;
use Illuminate\Auth\AuthenticationException;
use Illuminate\Validation\ValidationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\Routing\Exception\RouteNotFoundException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\Routing\Exception\MethodNotAllowedException;

/**
 * Trait to handle api responses
 */
trait HasApiHelpers {

  /**
   * Response handler method.
   * @param  Mixed ...$props
   * - 'success' key should contain boolean specifiying if request is success or don't.
   * - 'content' key should contain String|Array|Collection with data returned to client.
   * - 'code' key should contain the code returned as a Integer.
   * @return \Illuminate\Http\Response
   */
  private function response($props, $status){

    return response()->json($props, $status ?? 200);
  }

  /**
   * Success response method.
   *
   * @param  \Illuminate\Support\Collection[]|Array|String[] $content
   * @param  Int $code
   * @return \Illuminate\Http\Response
   */
  protected function successResponse(Array|String $content = [], Int $code = 200){

    return $this->response([ 'success' => true, 'content' => $content ], $code);
  }

  /**
   * Failure response method.
   *
   * @param  String $message
   * @param  Int $code
   * @return \Illuminate\Http\Response
   */
  protected function failureResponse(Array|String $message, Int $code = 200){

    return $this->response([ 'success' => false, 'message' => $message], $code);
  }

  /**
   *
   */
  protected function handleException(Exception $e){

    $class = get_class($e);
    switch($class){
      case AuthenticationException::class:
        $code = 401;
        $message = $e->getMessage();
        break;
      case AuthorizationException::class:
        $code = 403;
        $message = $e->getMessage();
        break;
      case MethodNotAllowedException::class:
        $code = 405;
        $message = $e->getMessage();
        break;
      case ModelNotFoundException::class:
        $code = 404;
        $message = $e->getMessage();
        break;
      case NotFoundHttpException::class:
        $code = 404;
        $message = $e->getMessage();
        break;
      case QueryException::class:
        $code = 409;
        $message = $e->errorInfo[2];
        break;
      // case TokenMismatchException::class:
      //   $code = ;
      //   $message = ;
      //   break;
      case ValidationException::class:
        $code = $e->status;
        $message = $e->validator->errors()->getMessages();
        break;
      case RouteNotFoundException::class:
        $code = 404;
        $message = $e->getMessage();
        break;
      case HttpException::class:
        $code = $e->getStatusCode() ?? 400;
        $message = $e->getMessage();
        break;
      case ErrorException::class:
        $code = 401;
        $message = $e->getMessage();
        break;
      default:
        $code = $e->getCode();
        $message = $e->getMessage();
        break;
    }
    return $this->failureResponse($message, $code);
  }

  /**
   * Get the collection request query param options.
   * @return array
   */
  protected function collectionOptions(){

    $where = [];
    foreach(request()->query() as $attr => $val){

      if($attr === 'page' || $attr === 'per_page' || $attr === 'sort_by' || $attr === 'order') continue;
      $where[$attr] = $val;
    }
    $options = [
      'page' => (int) request()->query('page', 1),
      'per_page' => (int) request()->query('per_page', 15),
      'sort_by' => request()->query('sort_by', ''),
      'order' => request()->query('order', 'desc'),
      'where' => $where
    ];
    return $options;
  }
}
