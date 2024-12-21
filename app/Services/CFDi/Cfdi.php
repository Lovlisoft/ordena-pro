<?php

namespace Crater\Services\CFDi;

use Carbon\Carbon;

class Cfdi extends CfdiModel
{
    public $folio;

    public $issuing;

    public $receiver;

    public $items;

    public $version;

    public $total;

    public $subtotal;

    public $tax;

    public $date;

    public function __construct(\CfdiUtils\Cfdi $cfdi)
    {
        $comprobante = $cfdi->getQuickReader();

        $this->folio = $comprobante['Folio'];

        $this->version = $comprobante['Version'];

        $this->total = $comprobante['Total'];

        $this->subtotal = $comprobante['SubTotal'];

        $this->tax = 0;

        $this->date = Carbon::parse($comprobante['Fecha']);

        $this->issuing = new CfdiEntity(
            $comprobante->emisor['Rfc'],
            $comprobante->emisor['Nombre'],
            $comprobante->emisor['RegimenFiscal']
        );

        $this->receiver = new CfdiEntity(
            $comprobante->receptor['Rfc'],
            $comprobante->receptor['Nombre'],
            $comprobante->receptor['RegimenFiscalReceptor'],
            $comprobante->receptor['DomicilioFiscalReceptor'],
            $comprobante->receptor['UsoCFDI']
        );  

        $items = $comprobante->conceptos;

        $this->items = collect();

        foreach ($items() as $key => $item) {
            $this->items->push(new CfdiItem([
                'rowNumber' => $key + 1,
                'productId' => $item['NoIdentificacion'],
                'description' => $item['Descripcion'],
                'quantity' => $item['Cantidad'],
                'unit' => $item['Unidad'],
                'price' => $item['ValorUnitario'],
                'subtotal' => $item['Importe'],
            ]));
        }
    }
}
