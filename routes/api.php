<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['api'])->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    // Include the file upload route within the resource group
    Route::resource('employees', EmployeeController::class);
    
    // Route for uploading files
    Route::post('/employees/upload', [EmployeeController::class, 'upload']);

    // Route to save table data
    Route::post('/employees/save', [EmployeeController::class, 'save']);

    // Use the store method for saving table data
    Route::post('/employees/store', [EmployeeController::class, 'store']); // Updated this line
});
