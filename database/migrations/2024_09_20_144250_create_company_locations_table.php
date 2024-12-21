<?php

use Crater\Models\Address;
use Crater\Models\Company;
use Crater\Models\CompanyOffice;
use Crater\Models\Office;
use Crater\Models\TaxType;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyLocationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('locations', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->char('invoice_serie');
            $table->foreignIdFor(TaxType::class, 'iva');
            $table->foreignIdFor(Address::class)->nullable();
            $table->foreignIdFor(Company::class)->default(1);
            $table->foreignIdFor(Office::class)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('locations');
    }
}
