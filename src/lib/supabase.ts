import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

function customFetch(url: RequestInfo, options: RequestInit = {}) {
  options.headers = {
    ...(options.headers || {}),
    'apikey': supabaseAnonKey,
  };
  if (!(options.headers as Record<string, string>)['Content-Type']) {
    (options.headers as Record<string, string>)['Content-Type'] = 'application/json';
  }
  const walletId = localStorage.getItem('wallet.contractId');
  console.log('[CustomFetch] wallet.contractId from localStorage:', walletId);
  if (walletId) {
    (options.headers as Record<string, string>)['x-wallet-id'] = walletId;
  }
  console.log('[CustomFetch] Request headers being sent:', JSON.stringify(options.headers));
  return fetch(url, options);
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  global: {
    fetch: customFetch,
  }
});

async function handleWalletConnection(contract_id: string, key_id_base64: string) {
  console.log("handleWalletConnection called with:", { contract_id, key_id_base64 });

  const { data: existingUser, error: selectError } = await supabase
    .from('users')
    .select('*')
    .eq('key_id_base64', key_id_base64)
    .single();

  console.log("Existing user result:", existingUser, selectError);

  if (existingUser) {
    console.log("User already exists, connecting...");
    return { status: 'exists', message: 'Wallet already exists, connecting you...', user: existingUser };
  } else {
    const { data: newUser, error: insertError } = await supabase
      .from('users')
      .insert({ contract_id, key_id_base64 })
      .single();

    console.log("Insert result:", newUser, insertError);

    if (insertError) {
      return { status: 'error', message: 'Failed to create wallet. Please try again.', error: insertError };
    } else {
      return { status: 'created', message: 'Wallet created successfully!', user: newUser };
    }
  }
} 