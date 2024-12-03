<?php

namespace Crater\Services\CFDi;

class CfdiItem
{
    public function __construct(
        public int $rowNumber,
        public string $product,
        public float $quantity,
        public float $unit,
        public float $unitPrice,
        public float $subtotal,
        public array $taxes = [],
        public float $total
    ) {}
}
