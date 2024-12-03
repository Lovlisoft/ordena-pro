<?php

namespace Crater\Services\CFDi;

class Cfdi
{
    public $folio;

    public $issuing;

    public $receiver;

    public $items;

    public $version;

    public $total;

    public $subtotal;

    public $date;

    public function __construct(\CfdiUtils\Cfdi $cfdi)
    {
        $comprobante = $cfdi->getQuickReader();

        $this->folio = $comprobante['Folio'];

        $this->version = $comprobante['Version'];

        $this->total = $comprobante['Total'];

        $this->subtotal = $comprobante['SubTotal'];

        $this->date = $comprobante['version'];

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
    }
}
