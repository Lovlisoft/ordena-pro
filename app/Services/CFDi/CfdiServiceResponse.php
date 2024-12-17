<?php

namespace Crater\Services\CFDi;

use Crater\Services\Response;

class CfdiServiceResponse extends Response
{
    public $cfdi;

    public function __construct(Cfdi $cfdi = null)
    {
        parent::__construct();

        $this->cfdi = $cfdi;
    }
}
