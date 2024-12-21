<?php

namespace Crater\Services\CFDi;

use CfdiUtils\Cfdi as CfdiDocument;
use CfdiUtils\CfdiCreateObjectException;
use Exception;

class CfdiService
{
    protected $cfdiString;

    protected $cfdi;

    protected $document;

    protected $response;

    public function __construct(string $cfdi = null)
    {
        if ($cfdi) {
            $this->cfdiString = $cfdi;

            $this->setCfdi($cfdi);
        }
    }

    public function checkIsValidFile()
    {
        if (is_null($this->cfdi)) {
            $this->getResponse()->addError('El archivo no tiene el formato XML esperado.');
        }

        return $this;
    }

    public function isEmitedFor(string $rfc)
    {
        if (is_null($this->cfdi)) return $this;

        if ($this->cfdi->receiver->rfc !== $rfc) {
            $this->getResponse()->addError('El archivo pertenece a otro cliente');
        }

        return $this;
    }

    public function isEmitedBy(string $rfc)
    {
        if (is_null($this->cfdi)) return $this;

        if ($this->cfdi->issuing->rfc !== $rfc) {
            $this->getResponse()->addError('El fue emitido por una empresa desconocida');
        }

        return $this;
    }

    public function getResponse()
    {
        return $this->response ?? $this->setResponse();
    }

    public function setResponse()
    {
        $this->response = new CfdiServiceResponse($this->cfdi);

        return $this->response;
    }

    public function setCfdi(string $string = null)
    {
        if ($document = $this->getDocument($string)) {
            $this->cfdi = new Cfdi($document);
        }
    }

    protected function getDocument(string $string = null)
    {
        return $this->document ?? $this->setDocument($string);
    }

    protected function setDocument(string $string = null)
    {
        try {
            $this->document = CfdiDocument::newFromString($string ?? $this->cfdiString);
        } catch (CfdiCreateObjectException $e) {
            collect($e->getExceptions())->each(function ($exception) {
                // TODO: Devolver estos errores de forma más inteligente
                //$this->getResponse()->addError($exception->getMessage());
            });
        }
        
        return $this->document;
    }

    public function setString(string $string)
    {
        $this->cfdiString = $string;
        
        return $this->cfdiString;
    }
}
