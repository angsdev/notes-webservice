<?php

namespace Modules\V1\NoteTypes\Domain;

class Entity {

  /**
   * Databaste identifier.
   * @var string|number
   */
  public $id;

  /**
   * Name.
   * @var string
   */
  public $name;

  /**
   * Description.
   * @var string
   */
  public $description;

  /**
   * Create a new note type instance.
   * @param array $data
   */
  public function __construct($data){

    $defaults = [ 'id' => null, 'description' => null ];
    [ 'id' => $id, 'name' => $name, 'description' => $description ] = $data + $defaults;
    $this->id = $id;
    $this->name = $name;
    $this->description = $description;
  }

  /**
   * Transform the object to an array.
   * @return array
   */
  public function toArray(){

    return (array) $this;
  }
}
