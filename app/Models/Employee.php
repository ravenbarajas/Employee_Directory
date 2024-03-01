<?php

// app/Models/Employee.php

namespace App\Models;

use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Employee extends Model implements \Illuminate\Contracts\Auth\Authenticatable
{
    use HasFactory;
    use Authenticatable;

    protected $primaryKey = 'empID'; // Update the primary key

    protected $fillable = [
        'empUsername',
        'empPass',
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



