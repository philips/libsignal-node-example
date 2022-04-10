/// <reference types="node" />
import ServerSecretParams from '../ServerSecretParams';
import AuthCredentialResponse from './AuthCredentialResponse';
import AuthCredentialPresentation from './AuthCredentialPresentation';
import GroupPublicParams from '../groups/GroupPublicParams';
import { UUIDType } from '../internal/UUIDUtil';
export default class ServerZkAuthOperations {
    serverSecretParams: ServerSecretParams;
    constructor(serverSecretParams: ServerSecretParams);
    issueAuthCredential(uuid: UUIDType, redemptionTime: number): AuthCredentialResponse;
    issueAuthCredentialWithRandom(random: Buffer, uuid: UUIDType, redemptionTime: number): AuthCredentialResponse;
    verifyAuthCredentialPresentation(groupPublicParams: GroupPublicParams, authCredentialPresentation: AuthCredentialPresentation): void;
}
