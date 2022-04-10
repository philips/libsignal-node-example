/// <reference types="node" />
import ServerPublicParams from '../ServerPublicParams';
import AuthCredential from './AuthCredential';
import AuthCredentialPresentation from './AuthCredentialPresentation';
import AuthCredentialResponse from './AuthCredentialResponse';
import GroupSecretParams from '../groups/GroupSecretParams';
import { UUIDType } from '../internal/UUIDUtil';
export default class ClientZkAuthOperations {
    serverPublicParams: ServerPublicParams;
    constructor(serverPublicParams: ServerPublicParams);
    receiveAuthCredential(uuid: UUIDType, redemptionTime: number, authCredentialResponse: AuthCredentialResponse): AuthCredential;
    createAuthCredentialPresentation(groupSecretParams: GroupSecretParams, authCredential: AuthCredential): AuthCredentialPresentation;
    createAuthCredentialPresentationWithRandom(random: Buffer, groupSecretParams: GroupSecretParams, authCredential: AuthCredential): AuthCredentialPresentation;
}
