import * as assert from 'assert';
import * as SignalClient from '@signalapp/libsignal-client';

SignalClient.initLogger(
  SignalClient.LogLevel.Trace,
  (level, target, fileOrNull, lineOrNull, message) => {
    const targetPrefix = target ? '[' + target + '] ' : '';
    const file = fileOrNull ?? '<unknown>';
    const line = lineOrNull ?? 0;
    // eslint-disable-next-line no-console
    console.log(targetPrefix + file + ':' + line + ': ' + message);
  }
);

class InMemorySessionStore extends SignalClient.SessionStore {
  private state = new Map<string, Buffer>();
  async saveSession(
    name: SignalClient.ProtocolAddress,
    record: SignalClient.SessionRecord
  ): Promise<void> {
    const idx = name.name() + '::' + name.deviceId();
    Promise.resolve(this.state.set(idx, record.serialize()));
  }
  async getSession(
    name: SignalClient.ProtocolAddress
  ): Promise<SignalClient.SessionRecord | null> {
    const idx = name.name() + '::' + name.deviceId();
    const serialized = this.state.get(idx);
    if (serialized) {
      return Promise.resolve(
        SignalClient.SessionRecord.deserialize(serialized)
      );
    } else {
      return Promise.resolve(null);
    }
  }
  async getExistingSessions(
    addresses: SignalClient.ProtocolAddress[]
  ): Promise<SignalClient.SessionRecord[]> {
    return addresses.map(address => {
      const idx = address.name() + '::' + address.deviceId();
      const serialized = this.state.get(idx);
      if (!serialized) {
        throw 'no session for ' + idx;
      }
      return SignalClient.SessionRecord.deserialize(serialized);
    });
  }
}

class InMemoryIdentityKeyStore extends SignalClient.IdentityKeyStore {
  private idKeys = new Map();
  private localRegistrationId: number;
  private identityKey: SignalClient.PrivateKey;

  constructor(localRegistrationId?: number) {
    super();
    this.identityKey = SignalClient.PrivateKey.generate();
    this.localRegistrationId = localRegistrationId ?? 5;
  }

  async getIdentityKey(): Promise<SignalClient.PrivateKey> {
    return Promise.resolve(this.identityKey);
  }
  async getLocalRegistrationId(): Promise<number> {
    return Promise.resolve(this.localRegistrationId);
  }

  async isTrustedIdentity(
    name: SignalClient.ProtocolAddress,
    key: SignalClient.PublicKey,
    _direction: SignalClient.Direction
  ): Promise<boolean> {
    const idx = name.name() + '::' + name.deviceId();
    if (this.idKeys.has(idx)) {
      const currentKey = this.idKeys.get(idx);
      return Promise.resolve(currentKey.compare(key) == 0);
    } else {
      return Promise.resolve(true);
    }
  }

  async saveIdentity(
    name: SignalClient.ProtocolAddress,
    key: SignalClient.PublicKey
  ): Promise<boolean> {
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
  }
  async getIdentity(
    name: SignalClient.ProtocolAddress
  ): Promise<SignalClient.PublicKey | null> {
    const idx = name.name() + '::' + name.deviceId();
    if (this.idKeys.has(idx)) {
      return Promise.resolve(this.idKeys.get(idx));
    } else {
      return Promise.resolve(null);
    }
  }
}

class InMemoryPreKeyStore extends SignalClient.PreKeyStore {
  private state = new Map();
  async savePreKey(
    id: number,
    record: SignalClient.PreKeyRecord
  ): Promise<void> {
    Promise.resolve(this.state.set(id, record.serialize()));
  }
  async getPreKey(id: number): Promise<SignalClient.PreKeyRecord> {
    return Promise.resolve(
      SignalClient.PreKeyRecord.deserialize(this.state.get(id))
    );
  }
  async removePreKey(id: number): Promise<void> {
    this.state.delete(id);
    return Promise.resolve();
  }
}

class InMemorySignedPreKeyStore extends SignalClient.SignedPreKeyStore {
  private state = new Map();
  async saveSignedPreKey(
    id: number,
    record: SignalClient.SignedPreKeyRecord
  ): Promise<void> {
    Promise.resolve(this.state.set(id, record.serialize()));
  }
  async getSignedPreKey(id: number): Promise<SignalClient.SignedPreKeyRecord> {
    return Promise.resolve(
      SignalClient.SignedPreKeyRecord.deserialize(this.state.get(id))
    );
  }
}

class InMemorySenderKeyStore extends SignalClient.SenderKeyStore {
  private state = new Map();
  async saveSenderKey(
    sender: SignalClient.ProtocolAddress,
    distributionId: SignalClient.Uuid,
    record: SignalClient.SenderKeyRecord
  ): Promise<void> {
    const idx =
      distributionId + '::' + sender.name() + '::' + sender.deviceId();
    Promise.resolve(this.state.set(idx, record));
  }
  async getSenderKey(
    sender: SignalClient.ProtocolAddress,
    distributionId: SignalClient.Uuid
  ): Promise<SignalClient.SenderKeyRecord | null> {
    const idx =
      distributionId + '::' + sender.name() + '::' + sender.deviceId();
    if (this.state.has(idx)) {
      return Promise.resolve(this.state.get(idx));
    } else {
      return Promise.resolve(null);
    }
  }
}

async function main() {
	const aKeys = new InMemoryIdentityKeyStore();
	const bKeys = new InMemoryIdentityKeyStore();

	const aSess = new InMemorySessionStore();
	const bSess = new InMemorySessionStore();

	const bPreK = new InMemoryPreKeyStore();
	const bSPreK = new InMemorySignedPreKeyStore();

	const bPreKey = SignalClient.PrivateKey.generate();
	const bSPreKey = SignalClient.PrivateKey.generate();

	const bIdentityKey = await bKeys.getIdentityKey();
	const bSignedPreKeySig = bIdentityKey.sign(
		bSPreKey.getPublicKey().serialize()
	);

	const aAddress = SignalClient.ProtocolAddress.new('+14151111111', 1);
	const bAddress = SignalClient.ProtocolAddress.new('+19192222222', 1);

	const bRegistrationId = await bKeys.getLocalRegistrationId();
	const bPreKeyId = 31337;
	const bSignedPreKeyId = 22;

	const bPreKeyBundle = SignalClient.PreKeyBundle.new(
		bRegistrationId,
		bAddress.deviceId(),
		bPreKeyId,
		bPreKey.getPublicKey(),
		bSignedPreKeyId,
		bSPreKey.getPublicKey(),
		bSignedPreKeySig,
		bIdentityKey.getPublicKey()
	);

	const bPreKeyRecord = SignalClient.PreKeyRecord.new(
		bPreKeyId,
		bPreKey.getPublicKey(),
		bPreKey
	);

	bPreK.savePreKey(bPreKeyId, bPreKeyRecord);

	const bSPreKeyRecord = SignalClient.SignedPreKeyRecord.new(
		bSignedPreKeyId,
		42, // timestamp
		bSPreKey.getPublicKey(),
		bSPreKey,
		bSignedPreKeySig
	);
	bSPreK.saveSignedPreKey(bSignedPreKeyId, bSPreKeyRecord);

	await SignalClient.processPreKeyBundle(
		bPreKeyBundle,
		bAddress,
		aSess,
		aKeys
	);
	const aMessage = Buffer.from('Greetings hoo-man', 'utf8');
	console.log("a -> aMessage: " + aMessage);

	const aCiphertext = await SignalClient.signalEncrypt(
		aMessage,
		bAddress,
		aSess,
		aKeys
	);
	console.log("a -> encrypted(aMessage): " + aCiphertext.serialize().toString('hex'));

	assert.deepEqual(
		aCiphertext.type(),
		SignalClient.CiphertextMessageType.PreKey
	);

	const aCiphertextR = SignalClient.PreKeySignalMessage.deserialize(
		aCiphertext.serialize()
	);

	const bDPlaintext = await SignalClient.signalDecryptPreKey(
		aCiphertextR,
		aAddress,
		bSess,
		bKeys,
		bPreK,
		bSPreK
	);
	assert.deepEqual(bDPlaintext, aMessage);
	console.log("b -> decrypted(aMessage): " + bDPlaintext)

	const bMessage = Buffer.from(
		'Sometimes the only thing more dangerous than a question is an answer.',
		'utf8'
	);
	console.log("b -> bMessage: " + bMessage)

	const bCiphertext = await SignalClient.signalEncrypt(
		bMessage,
		aAddress,
		bSess,
		bKeys
	);
	console.log("b -> encrypted(bMessage): " + bCiphertext.serialize().toString('hex'));

	assert.deepEqual(
		bCiphertext.type(),
		SignalClient.CiphertextMessageType.Whisper
	);

	const bCiphertextR = SignalClient.SignalMessage.deserialize(
		bCiphertext.serialize()
	);

	const aDPlaintext = await SignalClient.signalDecrypt(
		bCiphertextR,
		bAddress,
		aSess,
		aKeys
	);
	console.log("a -> decrypted(bMessage): " + aDPlaintext)

	assert.deepEqual(aDPlaintext, bMessage);

	const session = await bSess.getSession(aAddress);

	if (session != null) {
		assert(session.serialize().length > 0);
		assert.deepEqual(session.localRegistrationId(), 5);
		assert.deepEqual(session.remoteRegistrationId(), 5);
		assert(session.hasCurrentState());
		assert(
			!session.currentRatchetKeyMatches(
				SignalClient.PrivateKey.generate().getPublicKey()
			)
		);

		session.archiveCurrentState();
		assert(!session.hasCurrentState());
		assert(
			!session.currentRatchetKeyMatches(
				SignalClient.PrivateKey.generate().getPublicKey()
			)
		);
	} else {
		assert.fail('no session found');
	}

}

main();
