<?php

// EmployeeImport.php

namespace App\Imports;

use Maatwebsite\Excel\Concerns\Importable;
use Maatwebsite\Excel\Concerns\ToModel;
use App\Models\Employee;

class EmployeeImport implements ToModel
{
    use Importable;

    public function model(array $row)
    {
        // Extract values from the associative array
        $empID = $row['empID'] ?? null; // Assuming 'empID' is the primary key
        $empName = $row['empName'] ?? null;
        $empBday = $row['empBday']['date'] ?? null;
        $empDeptID = $row['empDeptID'] ?? null;
        $empDept = $row['empDept'] ?? null;
        $empSalary = $row['empSalary'] ?? null;

        // Check if an employee with the same empID already exists
        $existingEmployee = Employee::find($empID);

        if (!$existingEmployee && $empName !== null) {
            // Process each line as needed and save to the database
            return new Employee([
                'empID' => $empID, // Assuming 'empID' is the primary key
                'empName' => $empName,
                'empBday' => $empBday,
                'empDeptID' => $empDeptID,
                'empDept' => $empDept,
                'empSalary' => $empSalary,
                // Add more columns as needed
            ]);
        } else {
            \Log::warning('Employee with empID ' . $empID . ' already exists or empName is null.');
            return null; // Return null to skip adding this record
        }
    }
}


