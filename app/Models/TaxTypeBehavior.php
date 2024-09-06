<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TaxTypeBehavior extends Model
{
    use HasFactory;

    protected $fillable = [
        'slug',
        'description',
    ];
}
