<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColorFieldToEstimateStatusTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('estimate_statuses', function (Blueprint $table) {
            $table->after('description', function ($table) {
                $table->string('color')->default('gray');
            });
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('estimate_status', function (Blueprint $table) {
            $table->dropColumn('color');
        });
    }
}
