<?php

namespace Crater\Models;

use Crater\Traits\HasCustomFieldsTrait;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Crater\Traits\HasAttachedFiles;
use Spatie\MediaLibrary\HasMedia;

class EstimateItem extends Model implements HasMedia
{
    use HasFactory;
    use HasCustomFieldsTrait;
    use HasAttachedFiles;

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

    public function status()
    {
        return $this->belongsTo(EstimateStatus::class, 'estimate_status_id');
    }

    public function getCurrentStatusAttribute()
    {
        return $this->status ?? EstimateStatus::where('slug', 'requested')->first();
    }

    public function scopeWhereCompany($query, $company_id)
    {
        $query->where('company_id', $company_id);
    }

    public function updateStatus($status)
    {
        if (! $this->isClosed) {
            $this->updateStatusBySlug($status);
        }
    }

    public function updateStatusBySlug($status)
    {
        $this->estimate_status_id = EstimateStatus::where('slug', $status)->first()->id;
        $this->save();
    }

    public function getIsClosedAttribute()
    {
        return in_array($this->currentStatus->slug, EstimateStatus::CLOSED_STATUSES);
    }
}
