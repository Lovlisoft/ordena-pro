<?php

namespace Crater\Http\Controllers\V1\Admin\Estimate;

use Crater\Http\Controllers\Controller;
use Crater\Http\Resources\AttachedFileResource;
use Crater\Models\EstimateItem;
use Crater\Models\EstimateStatus;
use Crater\Models\Invoice;
use Illuminate\Http\Request;
use Crater\Models\Media;
use Crater\Services\CFDi\CfdiService;
use Illuminate\Support\Arr;

class EstimateItemsController extends Controller
{
    public function attachFile(Request $request, EstimateItem $estimateItem)
    {
        $fileType =  $request->collection;
        $estimate = $estimateItem->estimate;
        $errors = collect();

        if (! $request->hasFile('file')) {
            abort(400, 'No se encuentra el archivo cargado');
        }

        $filePath = $request->file->getRealPath();
        $fileContent = file_get_contents($filePath);
        $newItemStatus = null;
        
        switch($fileType) {
            // If the file is the estimate PDF then update the status of the item
            case 'estimate_pdf':
                $newItemStatus = EstimateStatus::REVIEW;
                break;

            // If the file is the invoice / CFDI then 
            case 'invoice_xml':
                $cfdiService = new CfdiService($fileContent);
                $response = $cfdiService
                    ->checkIsValidFile()
                    //->isEmitedFor($estimate->customer->rfc)
                    ->getResponse();

                $errors = $errors->merge($response->errors);

                

                if ($response->ok()) {
                    $newItemStatus = EstimateStatus::DONE;
                    $invoice = Invoice::createFromCfdi($response->cfdi, $estimate->customer_id);
                }

                break;
        }

        // If any errror, abort the attachement process
        if ($errors->isNotEmpty()) {
            return $response->throw();
        }

        // Attach the file to the entity
        $item = $estimateItem->syncUniqueFile('file', $fileType);

        if ($newItemStatus) {
            $estimateItem->updateStatus($newItemStatus);
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
