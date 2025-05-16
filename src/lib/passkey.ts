import { PasskeyKit, PasskeyServer } from 'passkey-kit';

// These should be set in your .env file and injected at build time
const passkeyConfig = {
  rpcUrl: import.meta.env.VITE_RPC_URL,
  networkPassphrase: import.meta.env.VITE_NETWORK_PASSPHRASE,
  walletWasmHash: import.meta.env.VITE_WALLET_WASM_HASH,
  launchtubeUrl: import.meta.env.VITE_LAUNCHTUBE_URL,
  launchtubeJwt: import.meta.env.VITE_LAUNCHTUBE_JWT,
};

export const account = new PasskeyKit(passkeyConfig);
export const server = new PasskeyServer(passkeyConfig);
console.log('PasskeyKit config:', passkeyConfig);
account.createWallet('StellarPay', 'anon'); 