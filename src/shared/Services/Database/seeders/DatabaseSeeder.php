<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\NoteSeeder;
use Database\Seeders\UserSeeder;
use Database\Seeders\NoteTypeSeeder;

class DatabaseSeeder extends Seeder {

  /**
   * Seed the application's database.
   * @return void
   */
  public function run(){

    $this->call([
      UserSeeder::class,
      NoteTypeSeeder::class,
      NoteSeeder::class
    ]);
  }
}
