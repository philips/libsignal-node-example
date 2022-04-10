/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import ReceiptSerial from './ReceiptSerial';
export default class ReceiptCredentialPresentation extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer);
    getReceiptExpirationTime(): bigint;
    getReceiptLevel(): bigint;
    getReceiptSerialBytes(): ReceiptSerial;
}
