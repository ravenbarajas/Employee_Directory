<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Imports\EmployeeImport;
use App\Models\Employee;
use ExcelJS\Excel;
use Rap2hpoutre\FastExcel\FastExcel;
use App\Http\Resources\EmployeeResource;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;

class EmployeeController extends Controller
{
    public function index()
    {
        $employees = Employee::all();
        return response()->json(EmployeeResource::collection($employees));
    }

    public function store(Request $request)
    {
        // Retrieve the maximum empID from the database
        $maxId = Employee::max('empID');
        
        // Increment by 1 for the new employee
        $newEmpId = $maxId + 1;

        // Validate and store the request data
        $request->validate([
            'empName' => 'required|string',
            'empBday' => 'required|date',
            'empGender' => 'required|string',
            'empPhonenum' => 'required|string',
            'empEmail' => 'required|string',
            'empMaritalstatus' => 'required|string',
            'empNationality' => 'required|string',
            'empReligion' => 'required|string',
            'empDeptID' => 'required|integer',
            'empDept' => 'required|string',
            'empPosition' => 'required|string',
            'empDateofhire' => 'required|date',
            'empTinID' => 'required|string',
            'empHdmfID' => 'required|string',
            'empPhilhealthID' => 'required|string',
            'empSssID' => 'required|string',
            'empEMRGNCname' => 'required|string',
            'empEMRGNCrelationship' => 'required|string',
            'empEMRGNCphonenum' => 'required|string',
            // ... other validation rules for other fields
        ]);

        $employee = Employee::create([
            'empID' => $newEmpId,
            'empName' => $request->input('empName'),
            'empBday' => $request->input('empBday'),
            'empGender' => $request->input('empGender'),
            'empPhonenum' => $request->input('empPhonenum'),
            'empEmail' => $request->input('empEmail'),
            'empMaritalstatus' => $request->input('empMaritalstatus'),
            'empNationality' => $request->input('empNationality'),
            'empReligion' => $request->input('empReligion'),
            'empDeptID' => $request->input('empDeptID'),
            'empDept' => $request->input('empDept'),
            'empPosition' => $request->input('empPosition'),
            'empDateofhire' => $request->input('empDateofhire'),
            'empTinID' => $request->input('empTinID'),
            'empHdmfID' => $request->input('empHdmfID'),
            'empPhilhealthID' => $request->input('empPhilhealthID'),
            'empSssID' => $request->input('empSssID'),
            'empEMRGNCname' => $request->input('empEMRGNCname'),
            'empEMRGNCrelationship' => $request->input('empEMRGNCrelationship'),
            'empEMRGNCphonenum' => $request->input('empEMRGNCphonenum'),
            // ... other fields
        ]);

        return new EmployeeResource($employee);
    }

    public function show($id)
    {
        $employee = Employee::findOrFail($id);
        return response()->json(new EmployeeResource($employee));
    }
    public function update(Request $request, $id)
    {
        $request->validate([
            'empID' => 'required|integer',
            'empName' => 'string',
            'empBday' => 'date',
            'empGender' => 'string',
            'empPhonenum' => 'string',
            'empEmail' => 'string',
            'empMaritalstatus' => 'string',
            'empNationality' => 'string',
            'empReligion' => 'string',
            'empDeptID' => 'integer',
            'empDept' => 'string',
            'empPosition' => 'string',
            'empDateofhire' => 'date',
            'empTinID' => 'string',
            'empHdmfID' => 'string',
            'empPhilhealthID' => 'string',
            'empSssID' => 'string',
            'empEMRGNCname' => 'string',
            'empEMRGNCrelationship' => 'string',
            'empEMRGNCphonenum' => 'string',
            // Add more validation rules for other columns as needed
        ]);

        $employee = Employee::where('empID', $request->input('empID'))->first();

        if ($employee) {
            $employee->update($request->all());
            return response()->json(new EmployeeResource($employee), 200);
        } else {
            return response()->json(['error' => 'Employee not found'], 404);
        }
    }
    public function destroy($id)
    {
        $employee = Employee::findOrFail($id);
        $employee->delete();
        return response()->json(null, 204);
    }
    public function upload(Request $request)
    {
        try {
            $request->validate([
                'file' => 'required|mimes:xlsx,xls|max:2048',
            ]);

            $file = $request->file('file');

            (new FastExcel)->import($file, function ($line) {
                $empID = $line['empID'] ?? null;

                // Check if an employee with the same empID already exists
                $existingEmployee = Employee::where('empID', $empID)->first();

                if (!$existingEmployee) {
                    // Use the store method for creating a new employee
                    $this->store(new Request($line));
                } else {
                    \Log::warning('Employee with empID ' . $empID . ' already exists.');
                }
            });

            return response()->json(['message' => 'File uploaded successfully']);
        } catch (\Exception $e) {
            \Log::error('File upload failed: ' . $e->getMessage());
            return response()->json(['error' => 'File upload failed'], 500);
        }
    }
    public function save(Request $request)
    {
        try {
            $tableData = $request->input('tableData');

            // Debugging statement to check if $tableData is received correctly
            \Log::info('Received table data: ' . json_encode($tableData));

            // Validate each row of data
            foreach ($tableData as $rowData) {
                $validator = \Validator::make($rowData, [
                    'empID' => 'required|integer|unique:employees',
                    'empName' => 'required|string',
                    'empBday' => 'required|date_format:Y-m-d',
                    'empGender' => 'required|string',
                    'empPhonenum' => 'required|string',
                    'empEmail' => 'required|string',
                    'empMaritalstatus' => 'required|string',
                    'empNationality' => 'required|string',
                    'empReligion' => 'required|string',
                    'empDeptID' => 'required|integer',
                    'empDept' => 'required|string',
                    'empPosition' => 'required|string',
                    'empDateofhire' => 'required|date_format:Y-m-d',
                    'empTinID' => 'required|string',
                    'empHdmfID' => 'required|string',
                    'empPhilhealthID' => 'required|string',
                    'empSssID' => 'required|string',
                    'empEMRGNCname' => 'required|string',
                    'empEMRGNCrelationship' => 'required|string',
                    'empEMRGNCphonenum' => 'required|string',
                    // Add more validation rules for other columns as needed
                ]);

                if ($validator->fails()) {
                    // Log validation errors for this row
                    \Log::error('Validation failed for row: ' . json_encode($rowData));
                    \Log::error('Validation errors: ' . json_encode($validator->errors()->toArray()));
                    continue; // Skip saving this row if validation fails
                }

                // Assuming the 'empID' is present in the $rowData array
                $empID = $rowData['empID'];

                $employee = Employee::updateOrCreate(['empID' => $empID], [
                    'empName' => $rowData['empName'],
                    'empBday' => $rowData['empBday'],
                    'empGender' => $rowData['empGender'],
                    'empPhonenum' => $rowData['empPhonenum'],
                    'empEmail' => $rowData['empEmail'],
                    'empMaritalstatus' => $rowData['empMaritalstatus'],
                    'empNationality' => $rowData['empNationality'],
                    'empReligion' => $rowData['empReligion'],
                    'empDeptID' => $rowData['empDeptID'],
                    'empDept' => $rowData['empDept'],
                    'empPosition' => $rowData['empPosition'],
                    'empDateofhire' => $rowData['empDateofhire'],
                    'empTinID' => $rowData['empTinID'],
                    'empHdmfID' => $rowData['empHdmfID'],
                    'empPhilhealthID' => $rowData['empPhilhealthID'],
                    'empSssID' => $rowData['empSssID'],
                    'empEMRGNCname' => $rowData['empEMRGNCname'],
                    'empEMRGNCrelationship' => $rowData['empEMRGNCrelationship'],
                    'empEMRGNCphonenum' => $rowData['empEMRGNCphonenum'],
                    // Add more fields as needed
                ]);
            }

            // Debugging statement to check if the save operation completed
            \Log::info('Table data saved successfully');

            return response()->json(['message' => 'Table data saved successfully']);
        } catch (\Exception $e) {
            // Debugging statement to log any exceptions
            \Log::error('Error saving table data: ' . $e->getMessage());

            // Return a 500 Internal Server Error response
            return response()->json(['error' => 'Internal Server Error'], 500);
        }
    }


}