/// <reference types="node" />
import ServerSecretParams from '../ServerSecretParams';
import ReceiptCredentialRequest from './ReceiptCredentialRequest';
import ReceiptCredentialResponse from './ReceiptCredentialResponse';
import ReceiptCredentialPresentation from './ReceiptCredentialPresentation';
export default class ServerZkReceiptOperations {
    serverSecretParams: ServerSecretParams;
    constructor(serverSecretParams: ServerSecretParams);
    issueReceiptCredential(receiptCredentialRequest: ReceiptCredentialRequest, receiptExpirationTime: bigint, receiptLevel: bigint): ReceiptCredentialResponse;
    issueReceiptCredentialWithRandom(random: Buffer, receiptCredentialRequest: ReceiptCredentialRequest, receiptExpirationTime: bigint, receiptLevel: bigint): ReceiptCredentialResponse;
    verifyReceiptCredentialPresentation(receiptCredentialPresentation: ReceiptCredentialPresentation): void;
}
