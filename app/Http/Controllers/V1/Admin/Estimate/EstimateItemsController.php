<?php

namespace Crater\Http\Controllers\V1\Admin\Estimate;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\AttachedFileResource;
use Crater\Models\EstimateItem;
use Crater\Models\EstimateStatus;
use Illuminate\Http\Request;
use Crater\Models\Media;

class EstimateItemsController extends Controller
{
    public function attachFile(Request $request, EstimateItem $estimateItem)
    {
        $fileType =  $request->collection;

        $item = $estimateItem->syncUniqueFile('file', $fileType);

        // If the attached file is for the Estimate PDF, move status to REVIEW
        if ($fileType == 'estimate_pdf') {
            $estimateItem->updateStatus(EstimateStatus::REVIEW);
        }
        
        return AttachedFileResource::collection(
            collect([$item])
        );
    }

    public function removeFile(Request $request, EstimateItem $estimateItem, $mediaFileId)
    {
        $media = Media::where('id', $mediaFileId)->first();

        // If the removed file is for the Estimate PDF, move status back to REQUESTED
        if ($media->collection_name == 'estimate_pdf') {
            $estimateItem->updateStatus(EstimateStatus::REQUESTED);
        }

        $estimateItem->deleteMedia($mediaFileId);

        return response("OK", 200);
    }
}
