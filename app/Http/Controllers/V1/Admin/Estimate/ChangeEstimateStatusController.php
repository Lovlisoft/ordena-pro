<?php

namespace Crater\Http\Controllers\V1\Admin\Estimate;

use Crater\Http\Controllers\Controller;
use Crater\Models\Estimate;
use Illuminate\Http\Request;

class ChangeEstimateStatusController extends Controller
{
    /**
    * Handle the incoming request.
    *
    * @param  \Illuminate\Http\Request  $request
    * @param  Estimate $estimate
    * @return \Illuminate\Http\Response
    */
    public function __invoke(Request $request, Estimate $estimate)
    {
        $estimate->updateStatus($request->status);

        return response()->json([
            'success' => true,
        ]);
    }
}
