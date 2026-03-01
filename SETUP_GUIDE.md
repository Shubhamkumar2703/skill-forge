# Skill Forge - Web3 Credential & Skill Verification Platform

## Overview

**Skill Forge** is a decentralized skill verification and credentialing platform built on Polygon Testnet. It combines on-chain credentials with verifiable off-chain proof (GitHub data and documents) to create an immutable, transparent skill verification system.

Instead of trusting only PDFs or claims on resumes, Skill Forge verifies real skills by:
- Linking GitHub profiles and extracting verifiable development activity
- Anchoring proof immutably on the blockchain
- Storing supporting evidence (GitHub data, documents, metadata) on IPFS

## Tech Stack

### Blockchain Layer
- **Network**: Polygon Testnet (Amoy - EVM-compatible, low gas fees)
- **Smart Contracts**: Solidity ^0.8.19
- **Contract**: `SkillCredential.sol` - Issues, verifies, and manages credentials
- **Wallet**: MetaMask (via ethers.js BrowserProvider)

### Off-Chain Services
- **IPFS Storage**: Pinata for decentralized file storage
- **GitHub Integration**: Public GitHub API for skill verification
- **Web3 Bridge**: ethers.js for smart contract interaction

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **UI**: Shadcn/ui components with Tailwind CSS
- **State Management**: React hooks (useWallet, custom service hooks)
- **HTTP Client**: Fetch API

## Project Structure

```
skill-forge/
├── contracts/
│   └── SkillCredential.sol          # Smart contract
├── src/
│   ├── components/
│   │   ├── CredentialCard.tsx       # Display credentials
│   │   ├── WalletButton.tsx         # Wallet connection UI
│   │   └── ... (other UI components)
│   ├── hooks/
│   │   ├── useWallet.ts            # Wallet connection & management
│   │   └── use-toast.ts
│   ├── lib/
│   │   ├── web3Config.ts           # Polygon, contract config
│   │   ├── contractService.ts      # Smart contract interactions
│   │   ├── ipfsService.ts          # IPFS upload/retrieval
│   │   ├── githubService.ts        # GitHub data fetching
│   │   └── utils.ts
│   ├── pages/
│   │   ├── Index.tsx               # Landing page
│   │   ├── Dashboard.tsx           # User credentials dashboard
│   │   ├── Verify.tsx              # Credential verification
│   │   └── Profile.tsx             # User profile & GitHub proof
│   ├── App.tsx                      # Router setup
│   └── main.tsx                     # App entry point
├── .env.example                     # Environment variables template
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
└── README.md                        # This file
```

## Smart Contract: SkillCredential.sol

### Key Features

#### 1. Credential Management
- **issueCredential()**: Issue on-chain credential to a user
  - Stores: title, description, skills, proof IPFS hash
  - Sets expiry date for credential validity
  - Returns unique credential ID

- **revokeCredential()**: Revoke credential (issuer/owner only)
  - Marks credential as revoked
  - Credential becomes invalid for verification

- **linkProof()**: Link additional proof to credential
  - Update credential with new IPFS hash
  - Emit ProofLinked event

#### 2. GitHub Integration
- **setGitHubProof()**: Store user's GitHub proof on-chain
  - Username, commit count, repo count
  - IPFS hash of GitHub activity snapshot
  - Last verified timestamp

- **getGitHubProof()**: Retrieve GitHub proof for verification

#### 3. Verification
- **verifyCredential()**: Verify credential authenticity
  - Checks: not revoked, not expired, has proof
  - Records verification with timestamp
  - Increments verification count

- **getCredentialVerifications()**: Get all verification records

#### 4. Query Functions
- **getCredential()**: Fetch full credential details
- **getHolderCredentials()**: Get all credentials for an address
- **isCredentialValid()**: Check credential validity
- **getCredentialCount()**: Get total credential count
- **getCredentialSkills()**: Get skills for a credential

### Events

```solidity
event CredentialIssued(uint256 indexed credentialId, address indexed issuer, address indexed holder, string title, uint256 timestamp);
event CredentialRevoked(uint256 indexed credentialId, uint256 timestamp);
event ProofLinked(uint256 indexed credentialId, string proofType, string ipfsHash, uint256 timestamp);
event VerificationRequested(uint256 indexed credentialId, address indexed verifier, uint256 timestamp);
```

## Backend Services

### 1. Web3 Configuration (`web3Config.ts`)

Provides:
- Polygon Testnet RPC endpoint
- Contract ABI and address
- Provider/signer setup
- Network switching logic

```typescript
import { getProvider, getContractWithSigner } from '@/lib/web3Config';

const provider = getProvider();
const contract = getContractWithSigner(signer);
```

### 2. Contract Service (`contractService.ts`)

High-level functions for smart contract interaction:

```typescript
// Issue credential
await issueCredential(signer, {
  holder: "0x...",
  title: "Blockchain Developer",
  description: "...",
  skills: ["Solidity", "Web3", "DeFi"],
  expiryDate: Math.floor(Date.now() / 1000) + 365 * 24 * 3600,
  proofIPFSHash: "Qm..."
});

// Verify credential
await verifyCredential(signer, credentialId);

// Get credentials for user
const credentials = await getHolderCredentials(userAddress);

// Store GitHub proof
await storeGitHubProof(signer, username, commits, repos, ipfsHash);
```

### 3. IPFS Service (`ipfsService.ts`)

Pinata integration for decentralized storage:

```typescript
// Upload file
const ipfsHash = await uploadToIPFS(file);

// Upload GitHub proof
const hash = await uploadGitHubProofToIPFS({
  username: "octocat",
  totalCommits: 150,
  publicRepos: 25,
  repositories: [...],
  recentCommits: [...],
  verifiedAt: new Date().toISOString()
});

// Retrieve JSON from IPFS
const data = await getJSONFromIPFS(ipfsHash);

// Get IPFS gateway URL
const url = getIPFSFileURL(ipfsHash);
```

### 4. GitHub Service (`githubService.ts`)

Fetch user's development activity:

```typescript
// Get complete GitHub proof
const proof = await generateGitHubProof("octocat");
// Returns: username, totalCommits, publicRepos, repositories, recentCommits, followerCount, verifiedAt

// Fetch user profile
const user = await fetchGitHubUser("octocat");

// Get repositories
const repos = await fetchUserRepositories("octocat");

// Count total commits
const commitCount = await countTotalCommits("octocat");

// Get primary languages
const langs = await getUserPrimaryLanguages("octocat");
```

## Frontend Integration

### Wallet Connection (`useWallet` Hook)

```typescript
const {
  address,
  balance,
  chainId,
  isConnected,
  isCorrectNetwork,
  connect,
  disconnect,
  switchNetwork,
  provider,
  error,
} = useWallet();
```

### Workflow: Issue a Credential with GitHub Proof

```typescript
import { useWallet } from '@/hooks/useWallet';
import { generateGitHubProof } from '@/lib/githubService';
import { uploadGitHubProofToIPFS } from '@/lib/ipfsService';
import { issueCredential } from '@/lib/contractService';
import { getSigner } from 'ethers';

// 1. Connect wallet
const { connect, provider } = useWallet();
await connect();

// 2. Fetch GitHub proof
const githubProof = await generateGitHubProof("octocat");

// 3. Upload proof to IPFS
const proofIPFSHash = await uploadGitHubProofToIPFS(githubProof);

// 4. Issue credential on-chain
const signer = await provider.getSigner();
const result = await issueCredential(signer, {
  holder: "0x...",
  title: "Web3 Developer Verified",
  description: "...",
  skills: ["Solidity", "JavaScript", "Web3"],
  expiryDate: Math.floor(Date.now() / 1000) + 365 * 24 * 3600,
  proofIPFSHash: proofIPFSHash,
});

console.log("Credential issued:", result.transactionHash);
```

## Environment Variables

Create a `.env.local` file based on `.env.example`:

```env
# Web3 & Blockchain
VITE_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology/
VITE_SKILL_CREDENTIAL_ADDRESS=0x... # After deploying smart contract

# IPFS & Pinata
VITE_PINATA_API_KEY=your_api_key
VITE_PINATA_SECRET_API_KEY=your_secret_key
VITE_PINATA_JWT=your_jwt_token

# GitHub API
VITE_GITHUB_TOKEN=your_github_token
```

### Getting Credentials

#### Pinata
1. Go to [pinata.cloud](https://pinata.cloud)
2. Sign up and create API keys
3. Generate JWT token in Settings

#### GitHub Token
1. Go to [github.com/settings/tokens](https://github.com/settings/tokens)
2. Create new Personal Access Token with `public_repo` scope

## Deployment

### 1. Deploy Smart Contract

Use Remix IDE or Hardhat:

```bash
# Using Remix IDE
1. Go to https://remix.ethereum.org
2. Create new file: contracts/SkillCredential.sol
3. Copy contract code
4. Select Polygon Testnet in environment
5. Deploy with MetaMask
6. Copy deployed contract address
```

### 2. Update Contract Address

Update `VITE_SKILL_CREDENTIAL_ADDRESS` in `.env.local`:

```env
VITE_SKILL_CREDENTIAL_ADDRESS=0xYourDeployedContractAddress
```

### 3. Deploy Frontend

```bash
# Build
npm run build

# Deploy to Vercel
npm install -g vercel
vercel --prod
```

## Running Locally

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- Polygon Testnet tokens (faucet: https://faucet.polygon.technology/)

### Setup

```bash
# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
# Fill in credentials

# Start dev server
npm run dev

# Open http://localhost:8080
```

## Features Walkthrough

### 1. Wallet Connection
- Click "Connect Wallet" button
- MetaMask opens
- Auto-switches to Polygon Testnet
- Shows user's address and balance

### 2. Link GitHub Profile
- Navigate to Profile page
- Enter GitHub username
- Fetches: repos, commits, languages
- Stores GitHub proof on-chain
- Uploads proof to IPFS

### 3. Issue Credential
- Navigate to Dashboard
- Click "Issue Credential"
- Fill: title, description, skills
- Select expiry date
- GitHub proof auto-attached
- Click "Issue" → MetaMask signs tx
- Credential stored on-chain + IPFS

### 4. Verify Credential
- Navigate to Verify page
- Enter credential ID or wallet address
- Displays credential details
- Shows verification status
- Links to IPFS proof
- Shows GitHub-backed skills

### 5. Public Verification
- Anyone can verify credentials
- No wallet connection needed for viewing
- Transparent, immutable record
- Tamper-proof (blockchain + IPFS)

## Advanced Features

### Credential Revocation
```typescript
await revokeCredential(signer, credentialId);
```

### Link Additional Proof
```typescript
await linkProofToCredential(signer, credentialId, "github", newIPFSHash);
```

### Multi-Skill Verification
- Each credential can have multiple skills
- Skills extracted from GitHub activity
- Language detection from repositories
- Commit frequency analysis

### Verification History
- All verifications recorded on-chain
- Timestamp for each verification
- Verifier identity stored
- Immutable proof trail

## Security Considerations

1. **Smart Contract Security**
   - Access control: Only issuer/owner can revoke
   - Expiry validation: Credentials expire after set date
   - Revocation check: Prevents verification of revoked credentials

2. **IPFS Security**
   - Content-addressed: Hash verifies file integrity
   - Pinata redundancy: Multiple replicas
   - Decentralized: No single point of failure

3. **GitHub Verification**
   - Public API: Read-only access
   - User consent: GitHub username provided by user
   - Timestamp: Proof includes verification date

4. **Frontend Security**
   - ethers.js: Secure Web3 library
   - No private key exposure: MetaMask handles signing
   - No server-side processing of credentials
   - Open-source: Code fully auditable

## Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Lint
npm run lint
```

## Roadmap

- [ ] Support multiple blockchain networks (Base, Optimism, Arbitrum)
- [ ] NFT badge system for credentials
- [ ] Decentralized issuer marketplace
- [ ] GitHub Actions integration for auto-verification
- [ ] Privacy-preserving zero-knowledge proofs
- [ ] Mobile app (React Native)
- [ ] DAO governance for credential standards
- [ ] Integration with LinkedIn, Coursera, freeCodeCamp

## Contributing

Contributions welcome! Please:

1. Fork repository
2. Create feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open Pull Request

## License

This project is open source and available under the MIT License.

## Support & Community

- **Issues**: Report bugs on GitHub
- **Discussions**: Ask questions in GitHub Discussions
- **Discord**: Join our community (coming soon)

## Acknowledgments

- Polygon for low-cost, fast transactions
- Pinata for IPFS infrastructure
- GitHub for public API access
- Shadcn/ui for beautiful components
- ethers.js for Web3 integration
