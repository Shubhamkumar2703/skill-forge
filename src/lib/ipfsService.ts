/**
 * IPFS Service using Pinata API
 * Upload credentials, GitHub proofs, and documents to IPFS
 */

const PINATA_API_KEY = import.meta.env.VITE_PINATA_API_KEY || '';
const PINATA_SECRET_API_KEY = import.meta.env.VITE_PINATA_SECRET_API_KEY || '';
const PINATA_JWT = import.meta.env.VITE_PINATA_JWT || '';

interface PinataResponse {
  IpfsHash: string;
  PinSize: number;
  Timestamp: string;
}

/**
 * Upload a file to IPFS via Pinata
 */
export async function uploadToIPFS(file: File): Promise<string> {
  if (!PINATA_JWT && !PINATA_API_KEY) {
    throw new Error('Pinata credentials not configured');
  }

  const formData = new FormData();
  formData.append('file', file);

  const metadata = JSON.stringify({
    name: file.name,
    keyvalues: {
      uploadedAt: new Date().toISOString(),
    },
  });

  formData.append('pinataMetadata', metadata);

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinFileToIPFS', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Pinata upload failed: ${response.statusText}`);
    }

    const data: PinataResponse = await response.json();
    return data.IpfsHash;
  } catch (error) {
    console.error('IPFS upload error:', error);
    throw error;
  }
}

/**
 * Upload JSON data to IPFS
 */
export async function uploadJSONToIPFS(data: any, filename: string): Promise<string> {
  if (!PINATA_JWT && !PINATA_API_KEY) {
    throw new Error('Pinata credentials not configured');
  }

  const jsonString = JSON.stringify(data);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const file = new File([blob], filename, { type: 'application/json' });

  return uploadToIPFS(file);
}

/**
 * Upload GitHub proof data to IPFS
 */
export async function uploadGitHubProofToIPFS(githubData: {
  username: string;
  totalCommits: number;
  publicRepos: number;
  repositories: any[];
  recentCommits: any[];
  verifiedAt: string;
}): Promise<string> {
  const filename = `github-proof-${githubData.username}-${Date.now()}.json`;
  return uploadJSONToIPFS(githubData, filename);
}

/**
 * Upload credential metadata to IPFS
 */
export async function uploadCredentialMetadataToIPFS(metadata: {
  title: string;
  description: string;
  skills: string[];
  issuer: string;
  issuedDate: number;
  expiryDate: number;
  githubProofHash?: string;
  documentIPFSHash?: string;
}): Promise<string> {
  const filename = `credential-${metadata.title}-${Date.now()}.json`;
  return uploadJSONToIPFS(metadata, filename);
}

/**
 * Retrieve file from IPFS via Pinata gateway
 */
export function getIPFSFileURL(ipfsHash: string): string {
  return `https://gateway.pinata.cloud/ipfs/${ipfsHash}`;
}

/**
 * Retrieve JSON from IPFS
 */
export async function getJSONFromIPFS(ipfsHash: string): Promise<any> {
  try {
    const response = await fetch(getIPFSFileURL(ipfsHash));
    if (!response.ok) {
      throw new Error(`Failed to fetch from IPFS: ${response.statusText}`);
    }
    return response.json();
  } catch (error) {
    console.error('IPFS retrieval error:', error);
    throw error;
  }
}

/**
 * Pin an existing IPFS hash to Pinata (for redundancy)
 */
export async function pinIPFSHash(ipfsHash: string, filename: string): Promise<void> {
  if (!PINATA_JWT && !PINATA_API_KEY) {
    throw new Error('Pinata credentials not configured');
  }

  const metadata = {
    name: filename,
    keyvalues: {
      pinnedAt: new Date().toISOString(),
    },
  };

  try {
    const response = await fetch('https://api.pinata.cloud/pinning/pinByHash', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${PINATA_JWT}`,
      },
      body: JSON.stringify({
        hashToPin: ipfsHash,
        pinataMetadata: metadata,
      }),
    });

    if (!response.ok) {
      throw new Error(`Pinata pin failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('IPFS pin error:', error);
    throw error;
  }
}

/**
 * Unpin an IPFS hash from Pinata
 */
export async function unpinIPFSHash(ipfsHash: string): Promise<void> {
  if (!PINATA_JWT && !PINATA_API_KEY) {
    throw new Error('Pinata credentials not configured');
  }

  try {
    const response = await fetch(
      `https://api.pinata.cloud/pinning/unpin/${ipfsHash}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${PINATA_JWT}`,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Pinata unpin failed: ${response.statusText}`);
    }
  } catch (error) {
    console.error('IPFS unpin error:', error);
    throw error;
  }
}
