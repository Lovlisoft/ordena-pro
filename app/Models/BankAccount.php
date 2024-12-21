<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class BankAccount extends Model
{
    use HasFactory;

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

    public function getAccountAliasAttribute()
    {
        return $this->bank->name . " (" . $this->account . ")";
    }
}
