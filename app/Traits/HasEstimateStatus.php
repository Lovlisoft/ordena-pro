<?php

namespace Crater\Traits;

use Spatie\MediaLibrary\InteractsWithMedia;
use Crater\Models\EstimateStatus;

trait HasEstimateStatus
{
    use InteractsWithMedia;

    public function status()
    {
        return $this->belongsTo(EstimateStatus::class, 'estimate_status_id');
    }

    public function getCurrentStatusAttribute()
    {
        return $this->status()->first() ?? EstimateStatus::where('slug', 'requested')->first();
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

    public function getUserFlowAttribute()
    {
        // TODO: Move this to a database structure
        $statuses = EstimateStatus::all();

        return $statuses;
    }
}
