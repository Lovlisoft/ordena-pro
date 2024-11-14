<?php

namespace Crater\Traits;

use Spatie\MediaLibrary\InteractsWithMedia;

trait HasAttachedFiles
{
    use InteractsWithMedia;

    function syncUniqueFile($file, $collection)
    {
        $user = auth()->user();

        $this->clearMediaCollection($collection);

        $this->addMediaFromRequest($file)
            ->withCustomProperties(['author' => [
                'id' => $user->id,
                'name' => $user->name,
            ]])
            ->toMediaCollection($collection);

        return $this->getMedia($collection)->first();
    }
}
