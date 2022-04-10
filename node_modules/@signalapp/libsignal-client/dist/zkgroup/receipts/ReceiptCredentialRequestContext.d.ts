/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import ReceiptCredentialRequest from './ReceiptCredentialRequest';
export default class ReceiptCredentialRequestContext extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer);
    getRequest(): ReceiptCredentialRequest;
}
