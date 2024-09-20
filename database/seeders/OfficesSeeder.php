<?php

namespace Database\Seeders;

use Crater\Models\Company;
use Crater\Models\CompanyOffice;
use Crater\Models\Office;
use Crater\Models\TaxType;
use Illuminate\Database\Seeder;

class OfficesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $structure = [
            'Alfonso Reyes' => [
                'a' => 16,
                'b' => 8,
            ],
            'Tamez' => [
                'c' => 16,
                'd' => 8,
            ],
            'Socios' => [
                'e' => 16,
                'f' => 8,
            ],
            'Camper' => [
                'g' => 16,
            ],
            'GGR' => [
                'h' => 16,
            ],
            'OPN' => [
                'i' => 16,
            ],
            'Emmanuel' => [
                'j' => 16,
            ],
        ];

        $companyId = 1;

        foreach ($structure as $name => $of) {
            $office = Office::create([
                'name' => $name,
                'company_id' => $companyId, 
            ]);

            foreach($of as $serie => $iva) {
                $iva = TaxType::where('percent', $iva / 100)->first();

                $office->locations()->create([
                    'name' => 'Serie ' . strtoupper($serie),
                    'invoice_serie' => $serie,
                    'company_id' => $companyId,
                    'iva' => $iva->id,
                ]);
            }
        }
    }
}
