<?php

namespace Database\Factories\V1\NoteTypes\Infrastructure\Persistence\Eloquent;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent\Model as TypeModel;


class ModelFactory extends Factory {

  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = TypeModel::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition(){

    $types = ['public', 'private'];
    return [
      'name' => $types[array_rand($types)],
      'created_at' => now(),
      'updated_at' => now()
    ];
  }
}
