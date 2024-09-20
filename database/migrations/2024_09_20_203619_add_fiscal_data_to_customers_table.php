<?php

use Crater\Models\SatCfdiUse;
use Crater\Models\SatPaymentMethod;
use Crater\Models\SatRegime;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddFiscalDataToCustomersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->string('rfc', 20)->after('name')->nullable();
            $table->string('postal_code', 6)->after('rfc')->nullable();
            $table->foreignIdFor(SatRegime::class)->after('postal_code')->nullable();
            $table->foreignIdFor(SatPaymentMethod::class)->after('sat_regime_id')->nullable();
            $table->foreignIdFor(SatCfdiUse::class)->after('sat_payment_method_id')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('customers', function (Blueprint $table) {
            $table->dropColumn('sat_cfdi_use_id');
            $table->dropColumn('sat_payment_method_id');
            $table->dropColumn('sat_regime_id');
            $table->dropColumn('postal_code');
            $table->dropColumn('rfc');
        });
    }
}
