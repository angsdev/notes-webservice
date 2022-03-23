<?php

namespace Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent;

use Shared\Traits\HasModelHelpers;
use Illuminate\Database\Eloquent\Model as BaseModel;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model as NoteModel;

class Model extends BaseModel {

  use HasModelHelpers, HasFactory;

  /**
   * The table associated with the model.
   * @var string
   */
  protected $table = 'NoteTypes';

  /**
   * The attributes that are mass assignable.
   * @var array
   */
  protected $fillable = [
    'name',
    'description'
  ];

  /**
   * The attributes that should be hidden for arrays.
   * @var array
   */
  protected $hidden = [
    'pivot',
  ];

  /**
   * Get notes associated with the type.
   * @return hasMany
   */
  public function notes(){

    return $this->hasMany(NoteModel::class, 'type_id');
  }
}
