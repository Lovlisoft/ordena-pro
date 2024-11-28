<?php

namespace Crater\Http\Controllers\V1\Admin\Role;

use Crater\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AbilitiesController extends Controller
{
    /**
     * Handle the incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function __invoke(Request $request)
    {
        // TODO: Devolver la lista de abilities que está en la base de datos en su lugar 
        return response()->json(['abilities' => config('abilities.abilities')]);
    }
}
