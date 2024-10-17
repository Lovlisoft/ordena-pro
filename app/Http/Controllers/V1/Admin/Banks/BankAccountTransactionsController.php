<?php

namespace Crater\Http\Controllers\V1\Admin\Banks;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Resources\BankAccountTransactionResource;
use Crater\Models\BankAccountTransaction;
use Illuminate\Http\Request;

class BankAccountTransactionsController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        return BankAccountTransactionResource::collection(BankAccountTransaction::paginate());
    }
}
