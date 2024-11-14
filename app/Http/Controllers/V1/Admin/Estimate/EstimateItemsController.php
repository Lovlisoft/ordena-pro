<?php

namespace Crater\Http\Controllers\V1\Admin\Estimate;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\AttachedFileResource;
use Crater\Models\EstimateItem;
use Crater\Models\EstimateStatus;
use Illuminate\Http\Request;

class EstimateItemsController extends Controller
{
    public function attachFile(Request $request, EstimateItem $estimateItem)
    {
        $item = $estimateItem->syncUniqueFile('file', $request->collection);

        $estimateItem->updateStatus(EstimateStatus::REVIEW);

        return AttachedFileResource::collection(
            collect([$item])
        );
    }

    public function removeFile(Request $request, EstimateItem $estimateItem, $mediaFile)
    {
        $estimateItem->deleteMedia($mediaFile);

        return response("OK", 200);
    }
}
