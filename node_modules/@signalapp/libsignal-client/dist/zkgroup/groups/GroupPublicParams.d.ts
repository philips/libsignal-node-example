/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import GroupIdentifier from './GroupIdentifier';
export default class GroupPublicParams extends ByteArray {
    constructor(contents: Buffer);
    getGroupIdentifier(): GroupIdentifier;
}
