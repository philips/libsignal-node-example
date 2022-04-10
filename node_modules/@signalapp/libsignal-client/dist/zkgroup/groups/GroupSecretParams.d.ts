/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import GroupMasterKey from './GroupMasterKey';
import GroupPublicParams from './GroupPublicParams';
export default class GroupSecretParams extends ByteArray {
    static generate(): GroupSecretParams;
    static generateWithRandom(random: Buffer): GroupSecretParams;
    static deriveFromMasterKey(groupMasterKey: GroupMasterKey): GroupSecretParams;
    constructor(contents: Buffer);
    getMasterKey(): GroupMasterKey;
    getPublicParams(): GroupPublicParams;
}
