<?php

namespace Crater\Http\Controllers\V1\Admin\Banks;

use Crater\Http\Controllers\Controller;
use Crater\Http\Requests;
use Crater\Http\Resources\BankAccountTransactionResource;
use Crater\Models\BankAccountTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Arr;

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

    /**
     * Import a CSV file to generate new bank account transactions.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function store(Request $request)
    {
        $file = $request->file('import_file');

        dd($file);

        $fileContent = Storage::get('banregio.csv');

        // 1. Split by new line. Use the PHP_EOL constant for cross-platform compatibility.
        $lines = explode(PHP_EOL, $fileContent);

        $tempArray = [];

        foreach ($lines as $row) {
            $tempArray[] = explode(',', $row);
        }

        dd($tempArray);
    }
}
