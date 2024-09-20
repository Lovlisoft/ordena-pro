<?php

namespace Crater\Http\Controllers\V1\Admin\General;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\CurrencyResource;
use Crater\Http\Resources\SatRegimeResource;
use Crater\Models\Currency;
use Crater\Models\SatRegime;
use Illuminate\Http\Request;

class SatRegimesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        $regimes = SatRegime::all();

        return SatRegimeResource::collection($regimes);
    }
}
