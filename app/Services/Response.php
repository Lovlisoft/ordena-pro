<?php

namespace Crater\Services;

class Response
{
    public $status;

    public $errors; 

    const STATUS_OK = 200;
    const STATUS_CREATED = 201;

    public function __construct($code = self::STATUS_OK)
    {
        $this->status = $code ?? self::STATUS_CREATED;

        $this->errors = collect();
    }

    public function ok()
    {
        return $this->status < 300;
    }

    public function addError(string $message, int $status = 400)
    {
        $this->status = $status;

        $this->errors->push(new ResponseError($message, $status));
    }

    public function throw()
    {
        return response()->json([
            'errors' => $this->errors,
        ], $this->status);
    }
}
