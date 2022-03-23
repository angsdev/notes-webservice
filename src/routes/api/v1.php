<?php

// use GuzzleHttp\Middleware;
// use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Modules\V1\Auth\Infrastructure\Controller as AuthController;
use Modules\V1\Users\Infrastructure\Controller as UserController;
use Modules\V1\Notes\Infrastructure\Controller as NoteController;
use Modules\V1\Search\Infrastructure\Controller as SearchController;
use Modules\V1\NoteTypes\Infrastructure\Controller as NoteTypeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::apiResource('users', UserController::class);

Route::middleware('guest')->prefix('auth')->group(function(){

  Route::post('signup', [ AuthController::class, 'signUp' ]);
  Route::post('signin', [ AuthController::class, 'signIn' ]);
  Route::post('google', [ AuthController::class, 'google' ]);
  Route::group([ 'prefix' => 'password' ], function(){

    Route::post('forgot', [ AuthController::class, 'forgotPassword' ]);
    Route::post('reset/{token}', [ AuthController::class, 'resetPassword' ]);
  });
});
Route::middleware('auth:sanctum')->group(function(){

  Route::group([ 'prefix' => 'auth/email' ], function(){

    Route::get('verify/{token}', [ AuthController::class, 'emailVerify' ]);
    Route::post('verify-notification', [ AuthController::class, 'emailVerifyNotification' ]);
  });
  Route::middleware('verified')->group(function(){

    /** User Profile */
    Route::group([ 'prefix' => 'auth/profile' ], function(){

      Route::get('/', [ AuthController::class, 'profileInfo' ]);
      Route::get('notes', [ AuthController::class, 'profileNotesInfo' ]);
    });

    /** Resources endpoints */
    Route::apiResources([
      // 'users' => UserController::class,
      'notes/types' => NoteTypeController::class,
      'notes' => NoteController::class
    ]);
    Route::group([ 'prefix' => 'users/{id}' ], function(){

      Route::get('notes', [ UserController::class, 'indexUserNotes' ]);
      Route::get('notes/{nid}', [ UserController::class, 'showUserNote' ]);
      Route::post('notes', [ UserController::class, 'storeUserNote' ]);
      Route::match([ 'put', 'patch' ], 'notes/{nid}', [ UserController::class, 'updateUserNote' ]);
      Route::get('notes/{nid}', [ UserController::class, 'destroyUserNote' ]);
    });
    Route::get('search/{collection}/{term?}/{firstNested?}', [ SearchController::class, 'exec' ]);
  });
  Route::match([ 'post', 'get' ], 'auth/logout', [ AuthController::class, 'logout' ]);
});
