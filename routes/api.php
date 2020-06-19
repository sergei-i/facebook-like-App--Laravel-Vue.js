<?php

use App\Http\Controllers\AuthUserController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:api')->group(function () {

    Route::get('auth-user', [AuthUserController::class, 'show']);

    Route::apiResources([
        '/posts' => 'PostController',
        '/users' => 'UserController',
        '/users/{user}/posts' => 'UserPostController',
    ]);
});
