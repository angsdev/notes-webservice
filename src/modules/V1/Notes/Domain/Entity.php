<?php

namespace Modules\V1\Notes\Domain;

class Entity {

  /**
   * Databaste identifier.
   * @var string|number
   */
  public $id;

  /**
   * User owner.
   * @var string|number
   */
  public $user_id;

  /**
   * Note type.
   * @var string|number
   */
  public $type_id;

  /**
   * Title.
   * @var string
   */
  public $title;

  /**
   * Note content.
   * @var string
   */
  public $content;

  /**
   * Create a new note instance.
   * @param array $data
   */
  public function __construct($data){

    $defaults = [ 'id' => null, 'content' => null ];
    [ 'id' => $id, 'user_id' => $user_id, 'type_id' => $type_id, 'title' => $title, 'content' => $content ] = $data + $defaults;
    $this->id = $id;
    $this->user_id = $user_id;
    $this->type_id = $type_id;
    $this->title = $title;
    $this->content = $content;
  }

  /**
   * Transform the object to an array.
   * @return array
   */
  public function toArray(){

    return (array) $this;
  }
}
