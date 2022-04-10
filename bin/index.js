"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const SignalClient = __importStar(require("@signalapp/libsignal-client"));
SignalClient.initLogger(SignalClient.LogLevel.Trace, (level, target, fileOrNull, lineOrNull, message) => {
    const targetPrefix = target ? '[' + target + '] ' : '';
    const file = fileOrNull !== null && fileOrNull !== void 0 ? fileOrNull : '<unknown>';
    const line = lineOrNull !== null && lineOrNull !== void 0 ? lineOrNull : 0;
    // eslint-disable-next-line no-console
    console.log(targetPrefix + file + ':' + line + ': ' + message);
});
class InMemorySessionStore extends SignalClient.SessionStore {
    constructor() {
        super(...arguments);
        this.state = new Map();
    }
    saveSession(name, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = name.name() + '::' + name.deviceId();
            Promise.resolve(this.state.set(idx, record.serialize()));
        });
    }
    getSession(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = name.name() + '::' + name.deviceId();
            const serialized = this.state.get(idx);
            if (serialized) {
                return Promise.resolve(SignalClient.SessionRecord.deserialize(serialized));
            }
            else {
                return Promise.resolve(null);
            }
        });
    }
    getExistingSessions(addresses) {
        return __awaiter(this, void 0, void 0, function* () {
            return addresses.map(address => {
                const idx = address.name() + '::' + address.deviceId();
                const serialized = this.state.get(idx);
                if (!serialized) {
                    throw 'no session for ' + idx;
                }
                return SignalClient.SessionRecord.deserialize(serialized);
            });
        });
    }
}
class InMemoryIdentityKeyStore extends SignalClient.IdentityKeyStore {
    constructor(localRegistrationId) {
        super();
        this.idKeys = new Map();
        this.identityKey = SignalClient.PrivateKey.generate();
        this.localRegistrationId = localRegistrationId !== null && localRegistrationId !== void 0 ? localRegistrationId : 5;
    }
    getIdentityKey() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.identityKey);
        });
    }
    getLocalRegistrationId() {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(this.localRegistrationId);
        });
    }
    isTrustedIdentity(name, key, _direction) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = name.name() + '::' + name.deviceId();
            if (this.idKeys.has(idx)) {
                const currentKey = this.idKeys.get(idx);
                return Promise.resolve(currentKey.compare(key) == 0);
            }
            else {
                return Promise.resolve(true);
            }
        });
    }
    saveIdentity(name, key) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = name.name() + '::' + name.deviceId();
            const seen = this.idKeys.has(idx);
            if (seen) {
                const currentKey = this.idKeys.get(idx);
                const changed = currentKey.compare(key) != 0;
                this.idKeys.set(idx, key);
                return Promise.resolve(changed);
            }
            this.idKeys.set(idx, key);
            return Promise.resolve(false);
        });
    }
    getIdentity(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = name.name() + '::' + name.deviceId();
            if (this.idKeys.has(idx)) {
                return Promise.resolve(this.idKeys.get(idx));
            }
            else {
                return Promise.resolve(null);
            }
        });
    }
}
class InMemoryPreKeyStore extends SignalClient.PreKeyStore {
    constructor() {
        super(...arguments);
        this.state = new Map();
    }
    savePreKey(id, record) {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.resolve(this.state.set(id, record.serialize()));
        });
    }
    getPreKey(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(SignalClient.PreKeyRecord.deserialize(this.state.get(id)));
        });
    }
    removePreKey(id) {
        return __awaiter(this, void 0, void 0, function* () {
            this.state.delete(id);
            return Promise.resolve();
        });
    }
}
class InMemorySignedPreKeyStore extends SignalClient.SignedPreKeyStore {
    constructor() {
        super(...arguments);
        this.state = new Map();
    }
    saveSignedPreKey(id, record) {
        return __awaiter(this, void 0, void 0, function* () {
            Promise.resolve(this.state.set(id, record.serialize()));
        });
    }
    getSignedPreKey(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return Promise.resolve(SignalClient.SignedPreKeyRecord.deserialize(this.state.get(id)));
        });
    }
}
class InMemorySenderKeyStore extends SignalClient.SenderKeyStore {
    constructor() {
        super(...arguments);
        this.state = new Map();
    }
    saveSenderKey(sender, distributionId, record) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = distributionId + '::' + sender.name() + '::' + sender.deviceId();
            Promise.resolve(this.state.set(idx, record));
        });
    }
    getSenderKey(sender, distributionId) {
        return __awaiter(this, void 0, void 0, function* () {
            const idx = distributionId + '::' + sender.name() + '::' + sender.deviceId();
            if (this.state.has(idx)) {
                return Promise.resolve(this.state.get(idx));
            }
            else {
                return Promise.resolve(null);
            }
        });
    }
}
