<?php

namespace Database\Seeders;

use Crater\Models\TaxTypeBehavior;
use Illuminate\Database\Seeder;

class TaxTypeBehaviorsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $behaviors = [
            [
                'slug' => 'pop',
                'description' => 'Percentage over price',
            ],
            [
                'slug' => 'apu',
                'description' => 'Amount per unit',
            ],
        ];

        foreach ($behaviors as $behavior) {
            TaxTypeBehavior::create($behavior);
        }
    }
}
