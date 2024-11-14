<?php

namespace Crater\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Arr;

class AttachedFileResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        $author = $this->getCustomProperty('author');

        return [
            'id' => $this->id,
            'uuid' => $this->uuid,
            'file_name' => $this->name,
            'url' => $this->getUrl(),
            'type' => $this->collection_name,
            'author' => [
                'id' => Arr::get($author, 'id'),
                'name' => Arr::get($author, 'name'),
            ],
        ];
    }
}
