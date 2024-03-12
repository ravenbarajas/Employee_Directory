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
        $empGender = $row['empGender'] ?? null;
        $empPhonenum = $row['empPhonenum'] ?? null;
        $empEmail = $row['empEmail'] ?? null;
        $empHomeaddress = $row['empHomeaddress'] ?? null;
        $empMaritalstatus = $row['empMaritalstatus'] ?? null;
        $empNationality = $row['empNationality'] ?? null;
        $empReligion = $row['empReligion'] ?? null;
        $empStatus = $row['empStatus'] ?? null;
        $empCompany = $row['empCompany'] ?? null;
        $empCompanyaddress = $row['empCompanyaddress'] ?? null;
        $empDeptID = $row['empDeptID'] ?? null;
        $empDept = $row['empDept'] ?? null;
        $empPosition = $row['empPosition'] ?? null;
        $empDateofhire = $row['empDateofhire']['date'] ?? null;
        $empTinID = $row['empTinID'] ?? null;
        $empHdmfID = $row['empHdmfID'] ?? null;
        $empPhilhealthID = $row['empPhilhealthID'] ?? null;
        $empSssID = $row['empSssID'] ?? null;
        $empEMRGNCname = $row['empEMRGNCname'] ?? null;
        $empEMRGNCrelationship = $row['empEMRGNCrelationship'] ?? null;
        $empEMRGNCphonenum = $row['empEMRGNCphonenum'] ?? null;

        // Check if an employee with the same empID already exists
        $existingEmployee = Employee::find($empID);

        if (!$existingEmployee && $empName !== null) {
            // Process each line as needed and save to the database
            return new Employee([
                'empID' => $empID, // Assuming 'empID' is the primary key
                'empName' => $empName,
                'empBday' => $empBday,
                'empGender' => $empGender,
                'empPhonenum' => $empPhonenum,
                'empEmail' => $empEmail,
                'empHomeaddress' => $empHomeaddress,
                'empMaritalstatus' => $empMaritalstatus,
                'empNationality' => $empNationality,
                'empReligion' => $empReligion,
                'empStatus' => $empStatus,
                'empCompany' => $empCompany,
                'empCompanyaddress' => $empCompanyaddress,
                'empDeptID' => $empDeptID,
                'empDept' => $empDept,
                'empPosition' => $empPosition,
                'empDateofhire' => $empDateofhire,
                'empTinID' => $empTinID,
                'empHdmfID' => $empHdmfID,
                'empPhilhealthID' => $empPhilhealthID,
                'empSssID' => $empSssID,
                'empEMRGNCname' => $empEMRGNCname,
                'empEMRGNCrelationship' => $empEMRGNCrelationship,
                'empEMRGNCphonenum' => $empEMRGNCphonenum,
                
                // Add more columns as needed
            ]);
        } else {
            \Log::warning('Employee with empID ' . $empID . ' already exists or empName is null.');
            return null; // Return null to skip adding this record
        }
    }
}


