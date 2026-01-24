import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
    error: null,
  });

  const connect = useCallback(async () => {
    if (typeof window.ethereum === 'undefined') {
      setState(prev => ({ ...prev, error: 'MetaMask is not installed' }));
      return;
    }

    setState(prev => ({ ...prev, isConnecting: true, error: null }));

    try {
      const provider = new BrowserProvider(window.ethereum);
      const accounts = await provider.send('eth_requestAccounts', []);
      const address = accounts[0];
      const balance = await provider.getBalance(address);
      const network = await provider.getNetwork();

      setState({
        address,
        balance: formatEther(balance),
        chainId: Number(network.chainId),
        isConnecting: false,
        isConnected: true,
        error: null,
      });
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        isConnecting: false,
        error: error.message || 'Failed to connect wallet',
      }));
    }
  }, []);

  const disconnect = useCallback(() => {
    setState({
      address: null,
      balance: null,
      chainId: null,
      isConnecting: false,
      isConnected: false,
      error: null,
    });
  }, []);

  const formatAddress = useCallback((address: string) => {
    return `${address.slice(0, 6)}...${address.slice(-4)}`;
  }, []);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length === 0) {
          disconnect();
        } else {
          connect();
        }
      });

      window.ethereum.on('chainChanged', () => {
        connect();
      });
    }
  }, [connect, disconnect]);

  return {
    ...state,
    connect,
    disconnect,
    formatAddress,
  };
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
