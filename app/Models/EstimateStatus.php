<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EstimateStatus extends Model
{
    use HasFactory;

    protected $table = 'estimate_statuses';

    protected $fillable = [
        'slug',
        'description',
    ];

    const DRAFT = 'draft';
    const REQUESTED = 'requested';
    const REVIEW = 'review';
    const CHANGES = 'changes';
    const APPROVED = 'approved';
    const REJECTED = 'rejected';
    const CANCELED = 'canceled';  
    const DONE = 'done';

    const CLOSED_STATUSES = [
        self::APPROVED,
        self::REJECTED,
        self::CANCELED,
        self::DONE,
    ];
}
