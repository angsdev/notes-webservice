<?php

namespace Shared\Providers;

use Illuminate\Support\Facades\Gate;
use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;

class AuthServiceProvider extends ServiceProvider {

  /**
   * The policy mappings for the application.
   * @var array
   */
  protected $policies = [
    'App\Models\Note\Note' => 'App\Policies\Note\NotePolicy',
    'App\Models\Note\Type' => 'App\Policies\Note\TypePolicy'
  ];

  /**
   * Register any authentication / authorization services.
   * @return void
   */
  public function boot(){

    $this->registerPolicies();
    Gate::before(fn($user) => ($user->username === 'admin') ?: null);
  }
}
