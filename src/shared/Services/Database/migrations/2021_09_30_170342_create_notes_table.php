<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateNotesTable extends Migration {

  /**
   * Run the migrations.
   * @return void
   */
  public function up(){

    Schema::create('Notes', function(Blueprint $table) {
      $table->id();
      $table->foreignId('user_id')->references('id')->on('Users')->onUpdate('no action')->onDelete('cascade');
      $table->foreignId('type_id')->references('id')->on('NoteTypes')->onUpdate('no action')->onDelete('cascade');
      $table->string('title');
      $table->string('content')->nullable();
      $table->timestamps();
    });
  }

  /**
   * Reverse the migrations.
   * @return void
   */
  public function down(){

    Schema::dropIfExists('Notes');
  }
}

