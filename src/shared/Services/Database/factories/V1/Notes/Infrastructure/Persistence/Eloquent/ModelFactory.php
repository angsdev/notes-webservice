<?php

namespace Database\Factories\V1\Notes\Infrastructure\Persistence\Eloquent;

use Illuminate\Database\Eloquent\Factories\Factory;
use Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model as UserModel;
use Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model as NoteModel;
use Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent\Model as TypeModel;

class ModelFactory extends Factory {

  /**
   * The name of the factory's corresponding model.
   *
   * @var string
   */
  protected $model = NoteModel::class;

  /**
   * Define the model's default state.
   *
   * @return array
   */
  public function definition(){

    return [
      'user_id' => UserModel::all()->random()->id,
      'type_id' => TypeModel::all()->random()->id,
      'title' => $this->faker->text(20),
      'content' => $this->faker->text(),
      'created_at' => now(),
      'updated_at' => now()
    ];
  }
}
