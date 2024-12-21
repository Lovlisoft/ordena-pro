<?php

namespace Crater\Traits;

use Spatie\MediaLibrary\InteractsWithMedia;
use Crater\Models\EstimateStatus;
use Illuminate\Support\Arr;

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
        return (object) Arr::get($this->flowMapResource, $this->currentStatus->slug);
    }

    public function getFlowMapResourceAttribute()
    {
        $map = $this->flowMap;
        
        $userPermittedActions = Arr::get($this->userActions, request()->user()->mainRole->id, []);

        foreach ($map as $key => $status) {
            foreach ($status as $sequence => $action) {
                $actions = [];

                $iteration = 1;
                foreach ($action as $slug => $label) {
                    if (in_array($slug, $userPermittedActions) && $status = EstimateStatus::where('slug', $slug)->first()) {
                        $actions[] = [
                            'action' => $status->slug,
                            'label' => $label,
                            'color' => $status->color,
                            'main' => $iteration == 1 && $sequence == 'next',
                            'icon' => $status->icon,
                        ];
                    };

                    $iteration++;
                }

                Arr::set($map, "{$key}.{$sequence}", $actions);
            }
        }

        return $map;
    }
}
