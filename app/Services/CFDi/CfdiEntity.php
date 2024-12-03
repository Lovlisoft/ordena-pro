<?php

namespace Crater\Services\CFDi;

class CfdiEntity
{
    public function __construct(
        public string $rfc,
        public string $name,
        public string $regime,
        public string $zipcode = "",
        public string $cfdiUse = ""
    ) {}
}
