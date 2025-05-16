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
const STELLAR_KEY = 'wallet.stellarPublicKey';

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
    const storedStellarKey = localStorage.getItem(STELLAR_KEY);
    if (storedContractId && storedKeyId && storedStellarKey) {
      setContractId(storedContractId);
      setKeyId(storedKeyId);
      setStellarPublicKey(storedStellarKey);
    }
  }, []);

  // Save to localStorage when changed
  useEffect(() => {
    if (contractId && keyId && stellarPublicKey) {
      localStorage.setItem(CONTRACT_KEY, contractId);
      localStorage.setItem(WALLET_KEY, keyId);
      localStorage.setItem(STELLAR_KEY, stellarPublicKey);
    }
  }, [contractId, keyId, stellarPublicKey]);

  const createWallet = useCallback(async () => {
    setLoading(true);
    try {
      const wallet = await account.createWallet('StellarPay', 'anon');
      console.log('[WalletProvider] wallet:', wallet);
      // Generate Stellar keypair
      const stellarKeypair = Keypair.random();
      const stellarPublicKey = stellarKeypair.publicKey();
      // Save to Supabase
      await supabase.from('users').insert({
        contract_id: wallet.contractId,
        key_id_base64: wallet.keyIdBase64,
        stellar_public_key: stellarPublicKey,
      });
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);
      setStellarPublicKey(stellarPublicKey);
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);
      localStorage.setItem(STELLAR_KEY, stellarPublicKey);
      navigate('/dashboard');
    } catch (err) {
      console.error('Error in createWallet:', err, JSON.stringify(err), err?.message, err?.stack);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  const connectWallet = useCallback(async () => {
    setLoading(true);
    try {
      const wallet = await account.connectWallet();
      console.log('[WalletProvider] wallet:', wallet);
      // Fetch user by passkey and get stellar_public_key
      const { data: user } = await supabase
        .from('users')
        .select('stellar_public_key,contract_id,key_id_base64')
        .eq('key_id_base64', wallet.keyIdBase64)
        .single();
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);
      setStellarPublicKey(user?.stellar_public_key || null);
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);
      if (user?.stellar_public_key) {
        localStorage.setItem(STELLAR_KEY, user.stellar_public_key);
      }
      navigate('/dashboard');
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
    localStorage.removeItem(STELLAR_KEY);
    // Optionally: account.revoke() if available
    window.location.reload();
  }, []);

  const isConnected = !!contractId && !!keyId && !!stellarPublicKey;

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