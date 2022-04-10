/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
export default class GroupMasterKey extends ByteArray {
    static SIZE: number;
    constructor(contents: Buffer);
}
