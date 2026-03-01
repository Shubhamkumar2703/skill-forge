/**
 * Web3 Configuration
 * Polygon Testnet (Mumbai) RPC and Smart Contract Configuration
 */

import { ethers } from 'ethers';

// ============ Network Configuration ============
export const POLYGON_TESTNET = {
  chainId: 80002,
  name: 'Polygon Amoy Testnet',
  rpcUrl: import.meta.env.VITE_POLYGON_RPC_URL || 'https://rpc-amoy.polygon.technology/',
  blockExplorer: 'https://www.oklink.com/amoy',
  nativeCurrency: {
    name: 'MATIC',
    symbol: 'MATIC',
    decimals: 18,
  },
};

// ============ Smart Contract ABI ============
export const SKILL_CREDENTIAL_ABI = [
  {
    inputs: [],
    name: 'credentialCounter',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'address', name: '_holder', type: 'address' },
      { internalType: 'string', name: '_title', type: 'string' },
      { internalType: 'string', name: '_description', type: 'string' },
      { internalType: 'string[]', name: '_skills', type: 'string[]' },
      { internalType: 'uint256', name: '_expiryDate', type: 'uint256' },
      { internalType: 'string', name: '_proofIPFSHash', type: 'string' },
    ],
    name: 'issueCredential',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_credentialId', type: 'uint256' }],
    name: 'revokeCredential',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'uint256', name: '_credentialId', type: 'uint256' },
      { internalType: 'string', name: '_proofType', type: 'string' },
      { internalType: 'string', name: '_ipfsHash', type: 'string' },
    ],
    name: 'linkProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      { internalType: 'string', name: '_username', type: 'string' },
      { internalType: 'uint256', name: '_totalCommits', type: 'uint256' },
      { internalType: 'uint256', name: '_publicRepos', type: 'uint256' },
      { internalType: 'string', name: '_profileIPFSHash', type: 'string' },
    ],
    name: 'setGitHubProof',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_user', type: 'address' }],
    name: 'getGitHubProof',
    outputs: [
      {
        components: [
          { internalType: 'string', name: 'username', type: 'string' },
          { internalType: 'uint256', name: 'totalCommits', type: 'uint256' },
          { internalType: 'uint256', name: 'publicRepos', type: 'uint256' },
          { internalType: 'string', name: 'profileIPFSHash', type: 'string' },
          { internalType: 'uint256', name: 'lastVerifiedAt', type: 'uint256' },
        ],
        internalType: 'struct SkillCredential.GitHubProof',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_credentialId', type: 'uint256' }],
    name: 'verifyCredential',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_credentialId', type: 'uint256' }],
    name: 'getCredential',
    outputs: [
      {
        components: [
          { internalType: 'uint256', name: 'id', type: 'uint256' },
          { internalType: 'address', name: 'issuer', type: 'address' },
          { internalType: 'address', name: 'holder', type: 'address' },
          { internalType: 'string', name: 'title', type: 'string' },
          { internalType: 'string', name: 'description', type: 'string' },
          { internalType: 'string[]', name: 'skills', type: 'string[]' },
          { internalType: 'uint256', name: 'issuedDate', type: 'uint256' },
          { internalType: 'uint256', name: 'expiryDate', type: 'uint256' },
          { internalType: 'bool', name: 'isRevoked', type: 'bool' },
          { internalType: 'string', name: 'proofIPFSHash', type: 'string' },
          { internalType: 'uint256', name: 'verificationCount', type: 'uint256' },
        ],
        internalType: 'struct SkillCredential.Credential',
        name: '',
        type: 'tuple',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'address', name: '_holder', type: 'address' }],
    name: 'getHolderCredentials',
    outputs: [{ internalType: 'uint256[]', name: '', type: 'uint256[]' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_credentialId', type: 'uint256' }],
    name: 'isCredentialValid',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'getCredentialCount',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [{ internalType: 'uint256', name: '_credentialId', type: 'uint256' }],
    name: 'getCredentialSkills',
    outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
    stateMutability: 'view',
    type: 'function',
  },
];

// ============ Smart Contract Address ============
// Update this after deploying the contract
export const SKILL_CREDENTIAL_ADDRESS =
  import.meta.env.VITE_SKILL_CREDENTIAL_ADDRESS ||
  '0x0000000000000000000000000000000000000000';

// ============ Provider & Signer Setup ============
export function getProvider() {
  return new ethers.JsonRpcProvider(POLYGON_TESTNET.rpcUrl);
}

export function getContract(provider: ethers.Provider) {
  return new ethers.Contract(
    SKILL_CREDENTIAL_ADDRESS,
    SKILL_CREDENTIAL_ABI,
    provider
  );
}

export function getContractWithSigner(signer: ethers.Signer) {
  return new ethers.Contract(
    SKILL_CREDENTIAL_ADDRESS,
    SKILL_CREDENTIAL_ABI,
    signer
  );
}

// ============ Helper Functions ============
export async function switchToPolygonTestnet(provider: ethers.BrowserProvider) {
  try {
    await provider.send('wallet_switchEthereumChain', [
      { chainId: `0x${POLYGON_TESTNET.chainId.toString(16)}` },
    ]);
  } catch (switchError: any) {
    // This error code indicates that the chain has not been added to MetaMask
    if (switchError.code === 4902) {
      try {
        await provider.send('wallet_addEthereumChain', [
          {
            chainId: `0x${POLYGON_TESTNET.chainId.toString(16)}`,
            chainName: POLYGON_TESTNET.name,
            rpcUrls: [POLYGON_TESTNET.rpcUrl],
            blockExplorerUrls: [POLYGON_TESTNET.blockExplorer],
            nativeCurrency: POLYGON_TESTNET.nativeCurrency,
          },
        ]);
      } catch (addError) {
        throw addError;
      }
    } else {
      throw switchError;
    }
  }
}
