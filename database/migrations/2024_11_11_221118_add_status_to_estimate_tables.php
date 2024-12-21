<?php

use Crater\Models\EstimateStatus;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddStatusToEstimateTables extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('estimates', function (Blueprint $table) {
            $table->after('status', function ($table) { 
                $table->foreignIdFor(EstimateStatus::class, 'estimate_status_id')
                    ->nullable()
                    ->constrained();
            });
        });

        Schema::table('estimate_items', function (Blueprint $table) {
            $table->after('total', function ($table) { 
                $table->foreignIdFor(EstimateStatus::class, 'estimate_status_id')
                    ->nullable()
                    ->constrained();
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
        Schema::table('estimates', function (Blueprint $table) {
            $table->dropForeign(['estimate_status_id']);
            $table->dropColumn('estimate_status_id');
        });

        Schema::table('estimate_items', function (Blueprint $table) {
            $table->dropForeign(['estimate_status_id']);
            $table->dropColumn('estimate_status_id');
        });
    }
}
