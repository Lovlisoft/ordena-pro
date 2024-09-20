<?php

use Crater\Models\Office;
use Crater\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddUserRelationsWithOffices extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_offices', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->foreignIdFor(User::class);
            $table->foreignIdFor(Office::class);
            $table->timestamps();

            $table->unique([
                'user_id',
                'office_id',
            ]);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('user_offices');
    }
}
