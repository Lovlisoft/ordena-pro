<?php

use Crater\Models\BankAccount;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateBankAccountTransactionsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bank_account_transactions', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(BankAccount::class);
            $table->string('reference')->nullable();
            $table->dateTime('date');
            $table->decimal('income');
            $table->decimal('outcome');
            $table->timestamps();

            $table->unique([
                'bank_account_id',
                'reference',
                'date',
                'income',
                'outcome',
            ], 'transaction_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bank_account_transactions');
    }
}
