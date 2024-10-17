<?php

namespace Crater\Http\Resources;

use Illuminate\Http\Resources\Json\JsonResource;

class BankAccountTransactionResource extends JsonResource
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
            'date' => $this->date,
            'account' => $this->bankAccount->accountAlias,
            'reference' => $this->reference,
            'reference_link' => $this->referenceLink,
            'debit' => $this->income,
            'credit' => $this->outcome,
        ];
    }
}
