<?php

namespace Crater\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class EstimateStatusResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'id' => $this->id,
            'slug' => $this->slug,
            'name' => $this->description,
            'color' => $this->color,
            'icon' => $this->icon,
        ];
    }
}
