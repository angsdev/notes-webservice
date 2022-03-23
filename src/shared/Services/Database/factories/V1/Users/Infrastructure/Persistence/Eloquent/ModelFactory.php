<?php

namespace Database\Factories\V1\Users\Infrastructure\Persistence\Eloquent;

use Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model as UserModel;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ModelFactory extends Factory {

  /**
   * The name of the factory's corresponding model.
   * @var string
   */
  protected $model = UserModel::class;

  /**
   * Define the model's default state.
   * @return array
   */
  public function definition(){

    return [
      'firstname' => $this->faker->firstName(),
      'lastname' => $this->faker->lastName(),
      'username' => $this->faker->userName(),
      'phone' => $this->faker->phoneNumber(),
      'email' => $this->faker->unique()->safeEmail(),
      'password' => Hash::make('$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi'), // password
      'remember_token' => Str::random(10),
      'created_at' => now(),
      'updated_at' => now(),
      'deleted_at' => null
    ];
  }
}
