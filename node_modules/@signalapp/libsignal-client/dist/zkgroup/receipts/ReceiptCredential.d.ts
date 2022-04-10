/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
export default class ReceiptCredential extends ByteArray {
    constructor(contents: Buffer);
    getReceiptExpirationTime(): bigint;
    getReceiptLevel(): bigint;
}
