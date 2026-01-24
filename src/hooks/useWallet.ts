import { useState, useCallback, useEffect } from 'react';
import { BrowserProvider, formatEther } from 'ethers';
import { switchToPolygonTestnet, POLYGON_TESTNET } from '@/lib/web3Config';

interface WalletState {
  address: string | null;
  balance: string | null;
  chainId: number | null;
  isConnecting: boolean;
  isConnected: boolean;
  error: string | null;
  isCorrectNetwork: boolean;
  provider: BrowserProvider | null;
}

export function useWallet() {
  const [state, setState] = useState<WalletState>({
    address: null,
    balance: null,
    chainId: null,
    isConnecting: false,
    isConnected: false,
    error: null,
    isCorrectNetwork: false,
    provider: null,
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
      const chainId = Number(network.chainId);
      const isCorrectNetwork = chainId === POLYGON_TESTNET.chainId;

      setState({
        address,
        balance: formatEther(balance),
        chainId,
        isConnecting: false,
        isConnected: true,
        error: null,
        isCorrectNetwork,
        provider,
      });

      // Suggest switching to Polygon if not on correct network
      if (!isCorrectNetwork) {
        try {
          await switchToPolygonTestnet(provider);
          setState(prev => ({ ...prev, isCorrectNetwork: true, chainId: POLYGON_TESTNET.chainId }));
        } catch (switchError) {
          console.warn('User rejected network switch');
        }
      }
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
      isCorrectNetwork: false,
      provider: null,
    });
  }, []);

  const switchNetwork = useCallback(async () => {
    if (!state.provider) {
      setState(prev => ({ ...prev, error: 'Provider not initialized' }));
      return;
    }

    try {
      await switchToPolygonTestnet(state.provider);
      setState(prev => ({ ...prev, isCorrectNetwork: true, chainId: POLYGON_TESTNET.chainId }));
    } catch (error: any) {
      setState(prev => ({
        ...prev,
        error: error.message || 'Failed to switch network',
      }));
    }
  }, [state.provider]);

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
    switchNetwork,
    formatAddress,
  };
}

declare global {
  interface Window {
    ethereum?: any;
  }
}
