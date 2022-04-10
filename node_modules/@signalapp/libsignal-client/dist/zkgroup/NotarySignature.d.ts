/// <reference types="node" />
import ByteArray from './internal/ByteArray';
export default class NotarySignature extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer);
}
