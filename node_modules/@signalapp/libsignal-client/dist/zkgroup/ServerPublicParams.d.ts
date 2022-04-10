/// <reference types="node" />
import ByteArray from './internal/ByteArray';
import NotarySignature from './NotarySignature';
export default class ServerPublicParams extends ByteArray {
    constructor(contents: Buffer);
    verifySignature(message: Buffer, notarySignature: NotarySignature): void;
}
