<?php

namespace Modules\V1\Notes\Infrastructure\Persistence\Eloquent;

use Shared\Traits\HasModelHelpers;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model as UserModel;
use Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent\Model as TypeModel;

/**
 * @OA\Schema(
 * required={"title"},
 * @OA\Xml(name="user"),
 * @OA\Property(property="id", type="integer", example="1"),
 * @OA\Property(property="title", type="string", maxLength=32, example="Read some book"),
 * @OA\Property(property="description", type="string", example="Task to remember read some book when exist the chance."),
 * @OA\Property(property="user_id", type="integer", description="User id relationated with this task"),
 * @OA\Property(property="created_at", type="string", format="date-time", description="Initial creation timestamp"),
 * @OA\Property(property="updated_at", type="string", format="date-time", description="Last update timestamp"),
 * )
 **/
 //* OA\Property(property="user_id", type="integer", description="User id relationated with this task", example="user@gmail.com", ref="#/components/schemas/User"),

class Model extends BaseModel {

  use HasModelHelpers, HasFactory;

  /**
   * The table associated with the model.
   * @var string
   */
  protected $table = 'Notes';

  /**
   * The attributes that are mass assignable.
   * @var array
   */
  protected $fillable = [
    'type_id',
    'user_id',
    'title',
    'content',
  ];

  /**
   * The attributes that should be hidden for arrays.
   * @var array
   */
  protected $hidden = [
    // 'user_id',
    // 'type_id',
    'pivot',
  ];

  /**
   * The relations to eager load on every query.
   * @var array
   */
  protected $with = [
    'type'
  ];

  /**
   * Get user associated with the note.
   * @return belongsTo
   */
  public function user(){

    return $this->belongsTo(UserModel::class);
  }

  /**
   * Get type associated with the note.
   * @return belongsTo
   */
  public function type(){

    return $this->belongsTo(TypeModel::class);
  }
}
