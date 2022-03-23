<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\V1\NoteTypes\Infrastructure\Persistence\Eloquent\Model as TypeModel;

class NoteTypeSeeder extends Seeder {

  /**
   * Run the database seeds.
   * @return void
   */
  public function run(){

    TypeModel::factory()->createMany([
      [ 'name' => 'public' ],
      [ 'name' => 'private' ]
    ]);
  }
}
