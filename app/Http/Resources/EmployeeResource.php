<?php

namespace App\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EmployeeResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'empID' => $this->empID,
            'empName' => $this->empName,
            'empBday' => $this->empBday,
            'empDeptID' => $this->empDeptID,
            'empDept' => $this->empDept,
            'empSalary' => $this->empSalary,
            // Add more fields as needed
        ];
    }
}
