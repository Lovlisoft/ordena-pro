<?php

namespace Crater\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserRole extends Model
{
    use HasFactory;

    const AGENTE = 2;
    const ADMIN = 3;

    protected $table = 'roles';
}
