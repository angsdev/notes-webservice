<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Modules\V1\Notes\Infrastructure\Persistence\Eloquent\Model as NoteModel;

class NoteSeeder extends Seeder {

  /**
   * Run the database seeds.
   * @return void
   */
  public function run(){

    NoteModel::factory(10)->create();
  }
}
