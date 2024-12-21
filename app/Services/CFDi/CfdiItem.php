<?php

namespace Crater\Services\CFDi;

class CfdiItem extends CfdiModel
{
    public int $rowNumber;
    public string $productId;
    public string $description;
    public float $quantity;
    public float $unit;
    public float $unitPrice;
    public float $subtotal;
    public array $taxes;
    public float $total;
}
