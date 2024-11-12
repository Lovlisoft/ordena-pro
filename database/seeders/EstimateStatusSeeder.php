<?php

namespace Database\Seeders;

use Crater\Models\EstimateStatus;
use Illuminate\Database\Seeder;

class EstimateStatusSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $statuses = [
            'draft' => 'Borrador',
            'requested' => 'Solicitado',
            'review' => 'En revisión',
            'changes' => 'Requiere cambios',
            'approved' => 'Aprobada',
            'rejected' => 'Rechazada',
            'canceled' => 'Cancelada',
            'done' => 'Concluida',
        ];

        foreach ($statuses as $status => $name) {
            EstimateStatus::create([
                'slug' => $status,
                'description' => $name,
            ]);
        }
    }
}
