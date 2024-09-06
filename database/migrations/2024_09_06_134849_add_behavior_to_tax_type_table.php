<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddBehaviorToTaxTypeTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('tax_types', function (Blueprint $table) {
            $table->foreignId('tax_type_behavior_id')
                ->after('collective_tax')
                ->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('tax_type', function (Blueprint $table) {
            $table->dropColumn('tax_type_behavior_id');
        });
    }
}
