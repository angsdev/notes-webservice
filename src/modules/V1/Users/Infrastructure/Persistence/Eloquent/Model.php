<?php

namespace Modules\V1\Users\Infrastructure\Persistence\Eloquent;

use Laravel\Sanctum\HasApiTokens;
use Shared\Traits\HasModelHelpers;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model as NoteModel;

/**
 * @OA\Schema(
 * required={"id", "username", "email", "password"},
 * @OA\Xml(name="user"),
 * @OA\Property(property="id", type="integer", example="1"),
 * @OA\Property(property="firstName", type="string", maxLength=32, example="John"),
 * @OA\Property(property="lastName", type="string", maxLength=32, example="Doe"),
 * @OA\Property(property="username", type="string", maxLength=30, example="username1234"),
 * @OA\Property(property="email", type="string", format="email", description="User unique email address", example="user@gmail.com"),
 * @OA\Property(property="password", type="string", maxLength=60, description="User password", example="user@gmail.com"),
 * @OA\Property(property="api_token", type="string", maxLength=100, description="User JWT", example="user@gmail.com"),
 * @OA\Property(property="email_verified_at", type="string", format="date-time", description="Datetime marker of verification status", example="2019-02-25 12:59:20"),
 * @OA\Property(property="created_at", type="string", format="date-time", description="Initial creation timestamp", example="2019-02-25 12:59:20"),
 * @OA\Property(property="updated_at", type="string", format="date-time", description="Last update timestamp", example="2019-02-25 12:59:20"),
 * )
 */

class Model extends Authenticatable {

  use HasModelHelpers, SoftDeletes, HasApiTokens, HasFactory, Notifiable;

  /**
   * The table associated with the model.
   * @var string
   */
  protected $table = 'Users';

  /**
   * The model's default values for attributes.
   * @var array
   */
  protected $attributes = [
    'remember_token' => null,
    'email_verified_at' => null,
  ];

  /**
   * The attributes that should be cast to native types.
   * @var array
   */
  protected $casts = [
    'email_verified_at' => 'datetime',
  ];

  /**
   * The attributes that are mass assignable.
   * @var array
   */
  protected $fillable = [
    'firstname',
    'lastname',
    'username',
    'phone',
    'email',
    'password',
    'email_verified_at',
  ];

  /**
   * The attributes that should be hidden for arrays.
   * @var array
   */
  protected $hidden = [
    'pivot'
  ];

  /**
   * The relations to eager load on every query.
   * @var array
   */
  protected $with = [
    // 'notes'
  ];

  /**
   * Enable an accessor property totalNotes.
   * @return number
   */
  public function getTotalNotesAttribute(){

    return $this->notes->count();
  }

  /**
   * Get notes associated with the user.
   * @return hasMany
   */
  public function notes(){

    return $this->hasMany(NoteModel::class, 'user_id');
  }
}
