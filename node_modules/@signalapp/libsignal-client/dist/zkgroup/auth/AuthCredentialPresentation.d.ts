/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import UuidCiphertext from '../groups/UuidCiphertext';
export default class AuthCredentialPresentation extends ByteArray {
    constructor(contents: Buffer);
    getUuidCiphertext(): UuidCiphertext;
    getRedemptionTime(): number;
}
