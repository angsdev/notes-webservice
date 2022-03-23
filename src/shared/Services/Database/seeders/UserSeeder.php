<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Modules\V1\Users\Infrastructure\Persistence\Eloquent\Model as UserModel;

class UserSeeder extends Seeder {

  /**
   * Run the database seeds.
   * @return void
   */
  public function run(){

    UserModel::factory()->createMany([
      [
        'firstname' => 'admin',
        'lastname' => 'admin',
        'username' => 'admin',
        'phone' => '0412-0000000',
        'email' => 'admin@admin.com',
        'password' => Hash::make('admin')
      ],
      [
        'firstname' => 'customer',
        'lastname' => 'customer',
        'username' => 'customer',
        'phone' => '0412-1000000',
        'email' => 'customer@customer.com',
        'password' => Hash::make('customer')
      ]
    ]);
    UserModel::factory(9)->create();
  }
}
