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
            'empGender' => $this->empGender,
            'empPhonenum' => $this->empPhonenum,
            'empEmail' => $this->empEmail,
            'empMaritalstatus' => $this->empMaritalstatus,
            'empNationality' => $this->empNationality,
            'empReligion' => $this->empReligion,
            'empDeptID' => $this->empDeptID,
            'empDept' => $this->empDept,
            'empPosition' => $this->empPosition,
            'empDateofhire' => $this->empDateofhire,
            'empTinID' => $this->empTinID,
            'empHdmfID' => $this->empHdmfID,
            'empPhilhealthID' => $this->empPhilhealthID,
            'empSssID' => $this->empSssID,
            'empEMRGNCname' => $this->empEMRGNCname,
            'empEMRGNCrelationship' => $this->empEMRGNCrelationship,
            'empEMRGNCphonenum' => $this->empEMRGNCphonenum,
            // Add more fields as needed
        ];
    }
}
