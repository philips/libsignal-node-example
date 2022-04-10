/// <reference types="node" />
import ByteArray from '../internal/ByteArray';
import ProfileKeyCredentialRequest from './ProfileKeyCredentialRequest';
export default class ProfileKeyCredentialRequestContext extends ByteArray {
    constructor(contents: Buffer);
    getRequest(): ProfileKeyCredentialRequest;
}
