<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Crater\Models\Invoice;
use Crater\Models\Payment;

class AddInvoicePaymentsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('invoice_payments', function (Blueprint $table) {
            $table->increments('id');

            $table->foreignIdFor(Invoice::class);
            $table->foreignIdFor(Payment::class);

            $table->unique(['invoice_id', 'payment_id'], 'invoice_payment');
            
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropDatabaseIfExists('invoice_payments');
    }
}
