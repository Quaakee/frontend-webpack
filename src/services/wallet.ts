import { WalletClient } from '@bsv/sdk';
import { bountyAPI } from './api';

// Initialize wallet client
let walletClient: WalletClient | null = null;

// Initialize the wallet
export const initializeWallet = async (): Promise<WalletClient> => {
  if (walletClient) {
    return walletClient;
  }


  walletClient = new WalletClient('auto');
  return walletClient;
};

// Get wallet balance from the backend
export const getWalletBalance = async (): Promise<number> => {
  try {
    const { balance } = await bountyAPI.getWalletBalance();
    return balance;
  } catch (error) {
    console.error('Error fetching wallet balance:', error);
    return 0;
  }
};

// Format satoshis to a readable format (BSV)
export const formatSatoshis = (satoshis: number): string => {
  // 1 BSV = 100,000,000 satoshis
  const bsv = satoshis / 100000000;
  return bsv.toFixed(8) + ' BSV';
};

// Format satoshis to USD (approximate conversion)
export const satoshisToUSD = (satoshis: number, exchangeRate: number = 40): string => {
  // Example exchange rate: 1 BSV = $40 USD
  const bsv = satoshis / 100000000;
  const usd = bsv * exchangeRate;
  return '$' + usd.toFixed(2);
};