<?php

namespace Crater\Models;

use Crater\Traits\HasCustomFieldsTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Crater\Traits\HasAttachedFiles;
use Crater\Traits\HasEstimateStatus;
use Spatie\MediaLibrary\HasMedia;

class EstimateItem extends Model implements HasMedia
{
    use HasFactory;
    use HasCustomFieldsTrait;
    use HasAttachedFiles;
    use HasEstimateStatus;

    protected $guarded = [
        'id'
    ];

    protected $casts = [
        'price' => 'integer',
        'total' => 'integer',
        'discount' => 'float',
        'quantity' => 'float',
        'discount_val' => 'integer',
        'tax' => 'integer',
    ];

    public function estimate()
    {
        return $this->belongsTo(Estimate::class);
    }

    public function item()
    {
        return $this->belongsTo(Item::class);
    }

    public function taxes()
    {
        return $this->hasMany(Tax::class);
    }

    public function scopeWhereCompany($query, $company_id)
    {
        $query->where('company_id', $company_id);
    }

    public function getEstimatePdfAttribute()
    {
        return $this->getMedia('estimate_pdf')->first() ?? null;
    }

    public function getCalculatedTotalAttribute()
    {
        return $this->base_amount + $this->ieps_amount + $this->iva_amount;
    }

    public function getPrecisionSubtotalAttribute()
    {
        return $this->precision_price * $this->quantity / 1000000;
    }

    public function getIepsAttribute()
    {
        // TODO: Return the specific tax related to IEPS, not only the first one
        return $this->item->taxes->first()->taxType->percent;
    }

    public function getIepsAmountAttribute()
    {
        return $this->quantity * $this->ieps;
    }

    public function getBaseAmountAttribute()
    {
        return $this->ieps_breakdown 
            ? $this->precision_subtotal - $this->ieps_amount
            : $this->precision_subtotal;
    }

    public function getIvaAmountAttribute()
    {
        return $this->base_amount * 0.16;
    }

    public function getIepsBreakdownAttribute()
    {
        return !! $this->estimate->show_price_breakdown;
    }
}
