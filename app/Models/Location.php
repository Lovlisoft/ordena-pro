<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Location extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'invoice_serie',
        'company_id',
        'iva',
    ];

    public function company()
    {
        return $this->belongsTo(Company::class);
    }

    public function office()
    {
        return $this->belongsTo(Office::class);
    }

    public function getSerieAttribute()
    {
        return strtoupper($this->invoice_serie ?? "");
    }

    public function iva()
    {
        return $this->belongsTo(TaxType::class);
    }
}
