"use strict";
//
// Copyright 2020-2021 Signal Messenger, LLC.
// SPDX-License-Identifier: AGPL-3.0-only
//
Object.defineProperty(exports, "__esModule", { value: true });
const ByteArray_1 = require("../internal/ByteArray");
const Native = require("../../../Native");
const UuidCiphertext_1 = require("../groups/UuidCiphertext");
class AuthCredentialPresentation extends ByteArray_1.default {
    constructor(contents) {
        super(contents, Native.AuthCredentialPresentation_CheckValidContents);
    }
    getUuidCiphertext() {
        return new UuidCiphertext_1.default(Native.AuthCredentialPresentation_GetUuidCiphertext(this.contents));
    }
    getRedemptionTime() {
        return Native.AuthCredentialPresentation_GetRedemptionTime(this.contents);
    }
}
exports.default = AuthCredentialPresentation;
//# sourceMappingURL=AuthCredentialPresentation.js.map