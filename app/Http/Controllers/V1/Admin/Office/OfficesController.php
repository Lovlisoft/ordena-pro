<?php

namespace Crater\Http\Controllers\V1\Admin\Office;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\OfficeResource;
use Illuminate\Http\Request;

class OfficesController extends Controller
{
    public function getUserOffices(Request $request)
    {
        $offices = $request->user()->companies->first()->offices;

        return OfficeResource::collection($offices);
    }
}
