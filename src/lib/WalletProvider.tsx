import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { account, server } from './passkey';
import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { Keypair } from 'stellar-sdk';

// Types for wallet state
interface WalletContextType {
  contractId: string | null;
  keyId: string | null;
  stellarPublicKey: string | null;
  createWallet: () => Promise<void>;
  connectWallet: () => Promise<void>;
  logout: () => void;
  isConnected: boolean;
  loading: boolean;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

const WALLET_KEY = 'wallet.keyIdBase64';
const CONTRACT_KEY = 'wallet.contractId';

// Helper to generate a UUID (v4)
function generateUUID() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

export const WalletProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [contractId, setContractId] = useState<string | null>(null);
  const [keyId, setKeyId] = useState<string | null>(null);
  const [stellarPublicKey, setStellarPublicKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const storedContractId = localStorage.getItem(CONTRACT_KEY);
    const storedKeyId = localStorage.getItem(WALLET_KEY);
    if (storedContractId && storedKeyId) {
      setContractId(storedContractId);
      setKeyId(storedKeyId);
      // Fetch stellarPublicKey from Supabase if contractId exists
      supabase
        .from('users')
        .select('stellar_public_key')
        .eq('contract_id', storedContractId)
        .single()
        .then(({ data }) => {
          if (data && data.stellar_public_key) {
            setStellarPublicKey(data.stellar_public_key);
          }
        });
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (contractId && keyId) {
      localStorage.setItem(CONTRACT_KEY, contractId);
      localStorage.setItem(WALLET_KEY, keyId);
    }
  }, [contractId, keyId]);

  const createWallet = useCallback(async () => {
    console.log('[CreateWallet] Starting wallet creation process');
    setLoading(true);
    try {
      console.log('[CreateWallet] Attempting to create wallet with StellarPay');
      const wallet = await account.createWallet('StellarPay', 'anon');
      console.log('[CreateWallet] Wallet created successfully:', wallet);
  
      console.log('[CreateWallet] Sending signed transaction to server');
      await server.send(wallet.signedTx);
      console.log('[CreateWallet] Transaction sent successfully');
  
      console.log('[CreateWallet] Setting contract and key IDs');
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);
  
      console.log('[CreateWallet] Generating Stellar keypair');
      const stellarKeypair = Keypair.random();
      const stellarPublicKey = stellarKeypair.publicKey();
      const stellarSecret = stellarKeypair.secret();
      console.log('[CreateWallet] Stellar public key generated:', stellarPublicKey);
  
      console.log('[CreateWallet] Setting local storage items');
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);

      console.log('[CreateWallet] key id is', wallet.keyIdBase64)
      
        const newUserData = {
          contract_id: wallet.contractId,
          key_id_base64: wallet.keyIdBase64,
          stellar_public_key: stellarPublicKey
        };
        console.log('[CreateWallet] Attempting to insert new user:', newUserData);
        
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert(newUserData)
          .single();
  
        if (insertError) {
          console.error('[CreateWallet] Error inserting new user:', insertError);
          throw insertError;
        } else {
          console.log('[CreateWallet] New user created successfully - User ID:', newUserData.key_id_base64);
          console.log('[CreateWallet] New user details:', {
            contractId: newUserData.contract_id,
            keyIdBase64: newUserData.key_id_base64,
            stellarPublicKey: newUserData.stellar_public_key,
            // Add any other relevant fields you want to log
          });

          setContractId(newUserData.contract_id);
          setKeyId(newUserData.key_id_base64);
          setStellarPublicKey(newUserData.stellar_public_key || stellarPublicKey);
          localStorage.setItem(CONTRACT_KEY, newUserData.contract_id);
          localStorage.setItem(WALLET_KEY, newUserData.key_id_base64);
          console.log('[CreateWallet] Navigating to dashboard for new user');
          navigate('/dashboard');
        
      }
    } catch (err) {
      console.error('[CreateWallet] Error in createWallet:', {
        error: err,
        stringifiedError: JSON.stringify(err),
        message: err?.message,
        stack: err?.stack
      });
      throw err;
    } finally {
      console.log('[CreateWallet] Process completed, setting loading to false');
      setLoading(false);
    }
  }, [navigate]);


  const connectWallet = useCallback(async () => {
    setLoading(true);
    try {
      const wallet = await account.connectWallet();
      console.log('[WalletProvider] wallet:', wallet);
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);

    
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);
      // Check if user exists
      const { data: existingUsers } = await supabase
        .from('users')
        .select('*')
        .eq('key_id_base64', wallet.keyIdBase64)
        .single();

      const existingUser = existingUsers[0]
      console.log("Existing user:", existingUser)
      console.log("User id", existingUser.key_id_base64)
      if (existingUser) {
        setContractId(existingUser.contract_id);
        setKeyId(existingUser.key_id_base64);
        setStellarPublicKey(existingUser.stellar_public_key || null);
        localStorage.setItem(CONTRACT_KEY, existingUser.contract_id);
        localStorage.setItem(WALLET_KEY, existingUser.key_id_base64);
        navigate('/dashboard');
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({ contract_id: wallet.contractId, key_id_base64: wallet.keyIdBase64, stellar_public_key: wallet.contractId })
          .single();
        if (insertError) {
          throw insertError;
        } else {
          setContractId((newUser as any).contract_id);
          setKeyId((newUser as any).key_id_base64);
          setStellarPublicKey((newUser as any).stellar_public_key || wallet.contractId);
          localStorage.setItem(CONTRACT_KEY, (newUser as any).contract_id);
          localStorage.setItem(WALLET_KEY, (newUser as any).key_id_base64);
          navigate('/dashboard');
        }
      }
    } catch (err) {
      console.error('Error in connectWallet:', err, JSON.stringify(err), err?.message, err?.stack);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const logout = useCallback(() => {
    setContractId(null);
    setKeyId(null);
    setStellarPublicKey(null);
    localStorage.removeItem(CONTRACT_KEY);
    localStorage.removeItem(WALLET_KEY);
    // Optionally: account.revoke() if available
    window.location.reload();
  }, []);

  const isConnected = !!contractId && !!keyId;

  return (
    <WalletContext.Provider value={{ contractId, keyId, stellarPublicKey, createWallet, connectWallet, logout, isConnected, loading }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
} 