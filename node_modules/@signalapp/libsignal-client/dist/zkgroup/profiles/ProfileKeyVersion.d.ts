/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
export default class ProfileKeyVersion extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer | string);
    toString(): string;
}
