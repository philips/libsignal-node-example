/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
export default class ReceiptSerial extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer);
}
