/// <reference types="node" />
import ServerPublicParams from '../ServerPublicParams';
import GroupSecretParams from '../groups/GroupSecretParams';
import PniCredential from './PniCredential';
import PniCredentialPresentation from './PniCredentialPresentation';
import PniCredentialRequestContext from './PniCredentialRequestContext';
import PniCredentialResponse from './PniCredentialResponse';
import ProfileKey from './ProfileKey';
import ProfileKeyCredential from './ProfileKeyCredential';
import ProfileKeyCredentialPresentation from './ProfileKeyCredentialPresentation';
import ProfileKeyCredentialRequestContext from './ProfileKeyCredentialRequestContext';
import ProfileKeyCredentialResponse from './ProfileKeyCredentialResponse';
import { UUIDType } from '../internal/UUIDUtil';
export default class ClientZkProfileOperations {
    serverPublicParams: ServerPublicParams;
    constructor(serverPublicParams: ServerPublicParams);
    createProfileKeyCredentialRequestContext(uuid: UUIDType, profileKey: ProfileKey): ProfileKeyCredentialRequestContext;
    createProfileKeyCredentialRequestContextWithRandom(random: Buffer, uuid: UUIDType, profileKey: ProfileKey): ProfileKeyCredentialRequestContext;
    createPniCredentialRequestContext(aci: UUIDType, pni: UUIDType, profileKey: ProfileKey): PniCredentialRequestContext;
    createPniCredentialRequestContextWithRandom(random: Buffer, aci: UUIDType, pni: UUIDType, profileKey: ProfileKey): PniCredentialRequestContext;
    receiveProfileKeyCredential(profileKeyCredentialRequestContext: ProfileKeyCredentialRequestContext, profileKeyCredentialResponse: ProfileKeyCredentialResponse): ProfileKeyCredential;
    receivePniCredential(requestContext: PniCredentialRequestContext, response: PniCredentialResponse): PniCredential;
    createProfileKeyCredentialPresentation(groupSecretParams: GroupSecretParams, profileKeyCredential: ProfileKeyCredential): ProfileKeyCredentialPresentation;
    createProfileKeyCredentialPresentationWithRandom(random: Buffer, groupSecretParams: GroupSecretParams, profileKeyCredential: ProfileKeyCredential): ProfileKeyCredentialPresentation;
    createPniCredentialPresentation(groupSecretParams: GroupSecretParams, credential: PniCredential): PniCredentialPresentation;
    createPniCredentialPresentationWithRandom(random: Buffer, groupSecretParams: GroupSecretParams, credential: PniCredential): PniCredentialPresentation;
}
