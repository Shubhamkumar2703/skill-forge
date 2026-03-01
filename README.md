# 🎓 Skill Forge - Web3 Credential & Skill Verification Platform

> **Verify real skills, not just certificates.** A decentralized credentialing platform that combines on-chain credentials with verifiable GitHub proof.

![License](https://img.shields.io/badge/License-MIT-blue.svg)
![Blockchain](https://img.shields.io/badge/Blockchain-Polygon-8247E5.svg)
![React](https://img.shields.io/badge/React-18-61DAFB.svg)
![Solidity](https://img.shields.io/badge/Solidity-0.8.19-363636.svg)

## 🚀 Quick Start

```bash
# Clone repository
git clone https://github.com/Shubhamkumar2703/skill-forge.git
cd skill-forge

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your credentials

# Start development server
npm run dev

# Visit http://localhost:8080
```

## 📋 Features

✅ **Wallet-Based Identity**
- Connect with MetaMask
- No email/password authentication
- Non-custodial (you control your keys)

✅ **On-Chain Credentials**
- Issue immutable certificates on Polygon Testnet
- Blockchain-verified credentials
- Timestamp-based expiry
- Revocation support

✅ **GitHub Proof Integration**
- Link GitHub profile
- Fetch commits, repositories, activity
- Verify real development experience
- Extract programming languages

✅ **IPFS Storage**
- Decentralized file storage via Pinata
- Content-addressable (hash-verified)
- Supporting evidence: credentials, documents, GitHub data
- Gateway access for public viewing

✅ **Skill Verification**
- Extract skills from GitHub activity
- Language detection from repositories
- Commit frequency analysis
- Public verification dashboard

✅ **Transparent & Immutable**
- All credentials on Polygon blockchain
- Verification history recorded
- Proof on IPFS (decentralized)
- Tamper-proof system

## 🛠️ Tech Stack

**Blockchain**
- Polygon Testnet (Amoy - EVM-compatible, fast, cheap)
- Solidity smart contracts
- ethers.js for Web3 integration

**Off-Chain**
- Pinata for IPFS storage
- GitHub API for skill verification

**Frontend**
- React 18 + TypeScript
- Vite (fast dev server)
- Shadcn/ui + Tailwind CSS
- Framer Motion (animations)

**Build & Deploy**
- npm/Vite for development
- Vercel for frontend hosting

## 📁 Project Structure

```
skill-forge/
├── contracts/
│   └── SkillCredential.sol         # Smart contract (credential management)
├── src/
│   ├── components/                  # React components
│   ├── hooks/
│   │   ├── useWallet.ts            # Wallet connection
│   │   └── useWallet.ts
│   ├── lib/
│   │   ├── web3Config.ts           # Polygon config
│   │   ├── contractService.ts      # Smart contract calls
│   │   ├── ipfsService.ts          # IPFS upload/retrieval
│   │   └── githubService.ts        # GitHub data fetching
│   ├── pages/                       # Page components
│   ├── App.tsx                      # Router
│   └── main.tsx                     # Entry point
├── SETUP_GUIDE.md                   # Detailed technical guide
├── DEPLOYMENT_GUIDE.md              # Deployment instructions
└── package.json
```

## 🔧 Configuration

### 1. Smart Contract Deployment

Deploy `contracts/SkillCredential.sol` to Polygon Testnet:

- **Remix IDE** (easiest): Copy contract to remix.ethereum.org
- **Hardhat**: `npx hardhat run scripts/deploy.js --network polygonAmoy`
- **Foundry**: `forge create --rpc-url ... --private-key ...`

After deployment, save the contract address.

### 2. Environment Variables

Create `.env.local`:

```env
# Polygon RPC
VITE_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology/
VITE_SKILL_CREDENTIAL_ADDRESS=0x...  # Your deployed contract

# Pinata (IPFS)
VITE_PINATA_API_KEY=pnk_...
VITE_PINATA_SECRET_API_KEY=...
VITE_PINATA_JWT=eyJhbGc...

# GitHub (Optional)
VITE_GITHUB_TOKEN=ghp_...
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

### 3. Get Testnet Tokens

Get free Polygon Amoy MATIC:
- Faucet: https://faucet.polygon.technology/

## 🚀 Usage

### Connect Wallet

```typescript
import { useWallet } from '@/hooks/useWallet';

function MyComponent() {
  const { connect, isConnected, address } = useWallet();
  
  return (
    <button onClick={connect}>
      {isConnected ? `Connected: ${address?.slice(0, 6)}...` : 'Connect Wallet'}
    </button>
  );
}
```

### Issue Credential

```typescript
import { issueCredential } from '@/lib/contractService';
import { uploadGitHubProofToIPFS } from '@/lib/ipfsService';
import { generateGitHubProof } from '@/lib/githubService';

// 1. Generate GitHub proof
const proof = await generateGitHubProof('octocat');

// 2. Upload to IPFS
const ipfsHash = await uploadGitHubProofToIPFS(proof);

// 3. Issue credential on-chain
const result = await issueCredential(signer, {
  holder: '0x...',
  title: 'Blockchain Developer',
  description: 'Verified GitHub-backed credential',
  skills: ['Solidity', 'Web3', 'DeFi'],
  expiryDate: Math.floor(Date.now() / 1000) + 365 * 24 * 3600,
  proofIPFSHash: ipfsHash,
});

console.log('Credential issued:', result.transactionHash);
```

### Verify Credential

```typescript
import { getCredentialDetails, verifyCredential } from '@/lib/contractService';

// Get credential details
const credential = await getCredentialDetails(credentialId);
console.log(credential.title, credential.skills);

// Verify credential
await verifyCredential(signer, credentialId);
```

## 📊 Smart Contract Functions

### Issue Credential
```solidity
function issueCredential(
  address holder,
  string title,
  string description,
  string[] skills,
  uint256 expiryDate,
  string proofIPFSHash
) returns (uint256)
```

### Verify Credential
```solidity
function verifyCredential(uint256 credentialId)
```

### Revoke Credential
```solidity
function revokeCredential(uint256 credentialId)
```

### Store GitHub Proof
```solidity
function setGitHubProof(
  string username,
  uint256 totalCommits,
  uint256 publicRepos,
  string profileIPFSHash
)
```

See [SETUP_GUIDE.md](./SETUP_GUIDE.md) for complete contract documentation.

## 🧪 Testing

```bash
# Run tests
npm run test

# Watch mode
npm run test:watch

# Lint code
npm run lint
```

## 📦 Build

```bash
# Production build
npm run build

# Preview build
npm run preview
```

## 🌐 Deployment

### Deploy to Vercel

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

See [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for detailed instructions.

## 🔐 Security

### Smart Contract
- Access control (issuer/owner only)
- Expiry validation
- Revocation mechanism
- No reentrancy vulnerabilities

### Frontend
- ethers.js (battle-tested Web3 library)
- MetaMask (non-custodial)
- No private key storage
- No server-side processing

### IPFS
- Content-addressed (hash-verified)
- Pinata redundancy
- Decentralized storage

## 📚 Documentation

- **[SETUP_GUIDE.md](./SETUP_GUIDE.md)** - Technical architecture & integration guide
- **[DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)** - Step-by-step deployment instructions

## 🗺️ Roadmap

- [ ] Multi-chain support (Base, Optimism, Arbitrum)
- [ ] NFT badge system
- [ ] Issuer marketplace
- [ ] GitHub Actions automation
- [ ] Zero-knowledge proofs
- [ ] Mobile app (React Native)
- [ ] DAO governance
- [ ] LinkedIn/Coursera integration

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create feature branch: `git checkout -b feature/amazing-feature`
3. Commit changes: `git commit -m 'Add amazing feature'`
4. Push: `git push origin feature/amazing-feature`
5. Open Pull Request

## 📝 License

MIT License - see [LICENSE](./LICENSE)

## 🙏 Acknowledgments

- [Polygon](https://polygon.technology/) - Scaling Ethereum
- [Pinata](https://pinata.cloud/) - IPFS infrastructure
- [GitHub](https://github.com/) - API & community
- [ethers.js](https://docs.ethers.org/) - Web3 library
- [Shadcn/ui](https://ui.shadcn.com/) - Component library
- [Vite](https://vitejs.dev/) - Build tool

## 📬 Support

- **Issues**: [GitHub Issues](https://github.com/Shubhamkumar2703/skill-forge/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Shubhamkumar2703/skill-forge/discussions)

## 🔗 Links

- **Website**: [skillforge.xyz](https://skillforge.xyz)
- **GitHub**: [Shubhamkumar2703/skill-forge](https://github.com/Shubhamkumar2703/skill-forge)
- **Smart Contract**: Polygon Testnet (see .env.local)
- **Demo**: [Live Demo](https://skill-forge.vercel.app)

---

**Made with ❤️ for the Web3 community**

_Verify real skills, not just certificates._

