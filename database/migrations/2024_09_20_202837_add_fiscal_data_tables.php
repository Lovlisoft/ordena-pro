<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFiscalDataTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('sat_cfdi_uses', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('sat_code');
        });

        Schema::create('sat_payment_methods', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
        });

        Schema::create('sat_regimes', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('sat_regimes');
        Schema::dropIfExists('sat_payment_methods');
        Schema::dropIfExists('sat_cfdi_uses');
    }
}
