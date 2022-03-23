<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateUsersTable extends Migration {

  /**
   * Run the migrations.
   * @return void
   */
  public function up(){

    Schema::create('Users', function(Blueprint $table){
      $table->id();
      $table->string('firstname');
      $table->string('lastname');
      $table->string('username')->unique();
      $table->string('phone')->nullable()->unique();
      $table->string('email')->unique();
      $table->timestamp('email_verified_at')->nullable();
      $table->string('password');
      $table->rememberToken();
      $table->timestamps();
      $table->softDeletes();
    });
  }

  /**
   * Reverse the migrations.
   * @return void
   */
  public function down(){
    Schema::dropIfExists('Users');
  }
}
