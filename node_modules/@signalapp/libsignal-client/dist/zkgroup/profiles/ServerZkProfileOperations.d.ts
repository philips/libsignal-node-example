/// <reference types="node" />
import ServerSecretParams from '../ServerSecretParams';
import GroupPublicParams from '../groups/GroupPublicParams';
import PniCredentialPresentation from './PniCredentialPresentation';
import PniCredentialResponse from './PniCredentialResponse';
import ProfileKeyCommitment from './ProfileKeyCommitment';
import ProfileKeyCredentialPresentation from './ProfileKeyCredentialPresentation';
import ProfileKeyCredentialResponse from './ProfileKeyCredentialResponse';
import ProfileKeyCredentialRequest from './ProfileKeyCredentialRequest';
import { UUIDType } from '../internal/UUIDUtil';
export default class ServerZkProfileOperations {
    serverSecretParams: ServerSecretParams;
    constructor(serverSecretParams: ServerSecretParams);
    issueProfileKeyCredential(profileKeyCredentialRequest: ProfileKeyCredentialRequest, uuid: UUIDType, profileKeyCommitment: ProfileKeyCommitment): ProfileKeyCredentialResponse;
    issueProfileKeyCredentialWithRandom(random: Buffer, profileKeyCredentialRequest: ProfileKeyCredentialRequest, uuid: UUIDType, profileKeyCommitment: ProfileKeyCommitment): ProfileKeyCredentialResponse;
    issuePniCredential(profileKeyCredentialRequest: ProfileKeyCredentialRequest, aci: UUIDType, pni: UUIDType, profileKeyCommitment: ProfileKeyCommitment): PniCredentialResponse;
    issuePniCredentialWithRandom(random: Buffer, profileKeyCredentialRequest: ProfileKeyCredentialRequest, aci: UUIDType, pni: UUIDType, profileKeyCommitment: ProfileKeyCommitment): PniCredentialResponse;
    verifyProfileKeyCredentialPresentation(groupPublicParams: GroupPublicParams, profileKeyCredentialPresentation: ProfileKeyCredentialPresentation): void;
    verifyPniCredentialPresentation(groupPublicParams: GroupPublicParams, presentation: PniCredentialPresentation): void;
}
