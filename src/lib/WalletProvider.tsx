import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { account, server } from './passkey';
import { supabase } from './supabase';
import { toast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

// Types for wallet state
interface WalletContextType {
  contractId: string | null;
  keyId: string | null;
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
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Load from localStorage on mount
  useEffect(() => {
    const storedContractId = localStorage.getItem(CONTRACT_KEY);
    const storedKeyId = localStorage.getItem(WALLET_KEY);
    if (storedContractId && storedKeyId) {
      setContractId(storedContractId);
      setKeyId(storedKeyId);
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
    setLoading(true);
    try {
      const wallet = await account.createWallet('StellarPay', 'anon');
      await server.send(wallet.signedTx);
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('key_id_base64', wallet.keyIdBase64)
        .single();
      if (existingUser) {
        setContractId(existingUser.contract_id);
        setKeyId(existingUser.key_id_base64);
        localStorage.setItem(CONTRACT_KEY, existingUser.contract_id);
        localStorage.setItem(WALLET_KEY, existingUser.key_id_base64);
        navigate('/dashboard');
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({ contract_id: wallet.contractId, key_id_base64: wallet.keyIdBase64 })
          .single();
        if (insertError) {
          throw insertError;
        } else {
          setContractId((newUser as any).contract_id);
          setKeyId((newUser as any).key_id_base64);
          localStorage.setItem(CONTRACT_KEY, (newUser as any).contract_id);
          localStorage.setItem(WALLET_KEY, (newUser as any).key_id_base64);
          navigate('/dashboard');
        }
      }
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
      setContractId(wallet.contractId);
      setKeyId(wallet.keyIdBase64);
      localStorage.setItem(CONTRACT_KEY, wallet.contractId);
      localStorage.setItem(WALLET_KEY, wallet.keyIdBase64);
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('key_id_base64', wallet.keyIdBase64)
        .single();
      if (existingUser) {
        setContractId(existingUser.contract_id);
        setKeyId(existingUser.key_id_base64);
        localStorage.setItem(CONTRACT_KEY, existingUser.contract_id);
        localStorage.setItem(WALLET_KEY, existingUser.key_id_base64);
        navigate('/dashboard');
      } else {
        const { data: newUser, error: insertError } = await supabase
          .from('users')
          .insert({ contract_id: wallet.contractId, key_id_base64: wallet.keyIdBase64 })
          .single();
        if (insertError) {
          throw insertError;
        } else {
          setContractId((newUser as any).contract_id);
          setKeyId((newUser as any).key_id_base64);
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
    localStorage.removeItem(CONTRACT_KEY);
    localStorage.removeItem(WALLET_KEY);
    // Optionally: account.revoke() if available
    window.location.reload();
  }, []);

  const isConnected = !!contractId && !!keyId;

  return (
    <WalletContext.Provider value={{ contractId, keyId, createWallet, connectWallet, logout, isConnected, loading }}>
      {children}
    </WalletContext.Provider>
  );
};

export function useWallet() {
  const ctx = useContext(WalletContext);
  if (!ctx) throw new Error('useWallet must be used within a WalletProvider');
  return ctx;
} 