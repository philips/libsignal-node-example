"use strict";
//
// Copyright 2020-2021 Signal Messenger, LLC.
// SPDX-License-Identifier: AGPL-3.0-only
//
Object.defineProperty(exports, "__esModule", { value: true });
const crypto_1 = require("crypto");
const Constants_1 = require("../internal/Constants");
const Native = require("../../../Native");
const AuthCredentialResponse_1 = require("./AuthCredentialResponse");
const UUIDUtil_1 = require("../internal/UUIDUtil");
class ServerZkAuthOperations {
    constructor(serverSecretParams) {
        this.serverSecretParams = serverSecretParams;
    }
    issueAuthCredential(uuid, redemptionTime) {
        const random = (0, crypto_1.randomBytes)(Constants_1.RANDOM_LENGTH);
        return this.issueAuthCredentialWithRandom(random, uuid, redemptionTime);
    }
    issueAuthCredentialWithRandom(random, uuid, redemptionTime) {
        return new AuthCredentialResponse_1.default(Native.ServerSecretParams_IssueAuthCredentialDeterministic(this.serverSecretParams.getContents(), random, (0, UUIDUtil_1.fromUUID)(uuid), redemptionTime));
    }
    verifyAuthCredentialPresentation(groupPublicParams, authCredentialPresentation) {
        Native.ServerSecretParams_VerifyAuthCredentialPresentation(this.serverSecretParams.getContents(), groupPublicParams.getContents(), authCredentialPresentation.getContents());
    }
}
exports.default = ServerZkAuthOperations;
//# sourceMappingURL=ServerZkAuthOperations.js.map