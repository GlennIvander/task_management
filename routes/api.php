<?php

use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\AuthController;
use Illuminate\Support\Facades\Route;

// Route::get('/user', function (Request $request) {
//     return $request->user();
// })->middleware('auth:sanctum');


Route::post('register', [AuthController::class, 'register']);
Route::post('login',    [AuthController::class, 'login']);

// Protected API
Route::middleware('auth:sanctum')->group(function () {
    // Tasks resource
    Route::post('tasks', [TaskController::class, 'store']);
    Route::put('tasks/{task}', [TaskController::class, 'update']);
    Route::delete('tasks/{task}', [TaskController::class, 'destroy']);

    // Auth
    Route::post('logout', [AuthController::class, 'logout']);
});

Route::get('tasks', [TaskController::class, 'index']);
Route::get('tasks/{task}', [TaskController::class, 'show']);