<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccountTransaction extends Model
{
    use HasFactory;

    public function account()
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function bankAccount()
    {
        return $this->belongsTo(BankAccount::class);
    }

    public function getReferenceLinkAttribute()
    {
        $payment = Payment::where('payment_number', $this->reference)->first();

        return $payment ? "/admin/payments/{$payment->id}/view" : "";
    }
}
