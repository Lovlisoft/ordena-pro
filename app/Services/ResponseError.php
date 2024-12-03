<?php

namespace Crater\Services;

class ResponseError
{
    public $status;

    public $message;

    public function __construct(string $message = 'There is an error', $status = 400)
    {
        $this->status = $status;

        $this->message = $message;
    }
}
