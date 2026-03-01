/**
 * Smart Contract Interaction Service
 * Handle credential issuance, verification, and credential management
 */

import { ethers } from 'ethers';
import {
  getContractWithSigner,
  getProvider,
  getContract,
  SKILL_CREDENTIAL_ADDRESS,
} from '@/lib/web3Config';

/**
 * Issue a new credential on-chain
 */
export async function issueCredential(
  signer: ethers.Signer,
  params: {
    holder: string;
    title: string;
    description: string;
    skills: string[];
    expiryDate: number;
    proofIPFSHash: string;
  }
) {
  try {
    const contract = getContractWithSigner(signer);

    const tx = await contract.issueCredential(
      params.holder,
      params.title,
      params.description,
      params.skills,
      params.expiryDate,
      params.proofIPFSHash
    );

    const receipt = await tx.wait();
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      success: receipt.status === 1,
    };
  } catch (error) {
    console.error('Failed to issue credential:', error);
    throw error;
  }
}

/**
 * Revoke a credential
 */
export async function revokeCredential(
  signer: ethers.Signer,
  credentialId: number
) {
  try {
    const contract = getContractWithSigner(signer);
    const tx = await contract.revokeCredential(credentialId);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      success: receipt.status === 1,
    };
  } catch (error) {
    console.error('Failed to revoke credential:', error);
    throw error;
  }
}

/**
 * Link proof to a credential
 */
export async function linkProofToCredential(
  signer: ethers.Signer,
  credentialId: number,
  proofType: string,
  ipfsHash: string
) {
  try {
    const contract = getContractWithSigner(signer);
    const tx = await contract.linkProof(credentialId, proofType, ipfsHash);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      success: receipt.status === 1,
    };
  } catch (error) {
    console.error('Failed to link proof:', error);
    throw error;
  }
}

/**
 * Store GitHub proof on-chain
 */
export async function storeGitHubProof(
  signer: ethers.Signer,
  username: string,
  totalCommits: number,
  publicRepos: number,
  profileIPFSHash: string
) {
  try {
    const contract = getContractWithSigner(signer);
    const tx = await contract.setGitHubProof(
      username,
      totalCommits,
      publicRepos,
      profileIPFSHash
    );

    const receipt = await tx.wait();
    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      success: receipt.status === 1,
    };
  } catch (error) {
    console.error('Failed to store GitHub proof:', error);
    throw error;
  }
}

/**
 * Verify a credential
 */
export async function verifyCredential(
  signer: ethers.Signer,
  credentialId: number
) {
  try {
    const contract = getContractWithSigner(signer);
    const tx = await contract.verifyCredential(credentialId);
    const receipt = await tx.wait();

    return {
      transactionHash: receipt.hash,
      blockNumber: receipt.blockNumber,
      success: receipt.status === 1,
    };
  } catch (error) {
    console.error('Failed to verify credential:', error);
    throw error;
  }
}

/**
 * Get credential details
 */
export async function getCredentialDetails(credentialId: number) {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    const credential = await contract.getCredential(credentialId);

    return {
      id: Number(credential.id),
      issuer: credential.issuer,
      holder: credential.holder,
      title: credential.title,
      description: credential.description,
      skills: credential.skills,
      issuedDate: Number(credential.issuedDate),
      expiryDate: Number(credential.expiryDate),
      isRevoked: credential.isRevoked,
      proofIPFSHash: credential.proofIPFSHash,
      verificationCount: Number(credential.verificationCount),
    };
  } catch (error) {
    console.error('Failed to fetch credential:', error);
    throw error;
  }
}

/**
 * Get all credentials for a holder
 */
export async function getHolderCredentials(holderAddress: string) {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    const credentialIds = await contract.getHolderCredentials(holderAddress);

    const credentials = await Promise.all(
      credentialIds.map((id) => getCredentialDetails(Number(id)))
    );

    return credentials;
  } catch (error) {
    console.error('Failed to fetch holder credentials:', error);
    throw error;
  }
}

/**
 * Check if credential is valid
 */
export async function isCredentialValid(credentialId: number): Promise<boolean> {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    return await contract.isCredentialValid(credentialId);
  } catch (error) {
    console.error('Failed to check credential validity:', error);
    throw error;
  }
}

/**
 * Get GitHub proof for a user
 */
export async function getGitHubProof(userAddress: string) {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    const proof = await contract.getGitHubProof(userAddress);

    return {
      username: proof.username,
      totalCommits: Number(proof.totalCommits),
      publicRepos: Number(proof.publicRepos),
      profileIPFSHash: proof.profileIPFSHash,
      lastVerifiedAt: Number(proof.lastVerifiedAt),
    };
  } catch (error) {
    console.error('Failed to fetch GitHub proof:', error);
    throw error;
  }
}

/**
 * Get verification count for a credential
 */
export async function getVerificationCount(credentialId: number): Promise<number> {
  try {
    const credential = await getCredentialDetails(credentialId);
    return credential.verificationCount;
  } catch (error) {
    console.error('Failed to get verification count:', error);
    throw error;
  }
}

/**
 * Get total credential count
 */
export async function getTotalCredentialCount(): Promise<number> {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    const count = await contract.getCredentialCount();
    return Number(count);
  } catch (error) {
    console.error('Failed to get credential count:', error);
    throw error;
  }
}

/**
 * Get skills for a credential
 */
export async function getCredentialSkills(credentialId: number): Promise<string[]> {
  try {
    const provider = getProvider();
    const contract = getContract(provider);
    return await contract.getCredentialSkills(credentialId);
  } catch (error) {
    console.error('Failed to get credential skills:', error);
    throw error;
  }
}
