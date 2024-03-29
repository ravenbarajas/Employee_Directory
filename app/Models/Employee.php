<?php

// app/Models/Employee.php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model
{
    use HasFactory;

    protected $primaryKey = 'empID'; // Update the primary key

    protected $fillable = [
        'empName',
        'empBday',
        'empDeptID',
        'empDept',
        'empSalary',
        // Add more columns as needed
    ];
    // Make sure 'empID' is auto-incrementing
    public $incrementing = true;

    // If empID is not an integer, set its type
    protected $keyType = 'integer';
}



