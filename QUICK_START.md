# ⚡ Quick Developer Setup

## 5-Minute Setup

### Prerequisites
- Node.js 18+
- MetaMask browser extension
- GitHub account (optional, for GitHub proof)

### Step 1: Clone & Install (2 min)

```bash
git clone https://github.com/Shubhamkumar2703/skill-forge.git
cd skill-forge
npm install
```

### Step 2: Configure Environment (2 min)

```bash
cp .env.example .env.local
```

Edit `.env.local`:
```env
# Minimum required for local dev:
VITE_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology/
VITE_SKILL_CREDENTIAL_ADDRESS=0x0000000000000000000000000000000000000000

# Optional (for full features):
VITE_PINATA_JWT=your_pinata_jwt_here
VITE_GITHUB_TOKEN=your_github_token_here
```

### Step 3: Start Dev Server (1 min)

```bash
npm run dev
# Opens http://localhost:8080
```

## What to Do Next

### Option A: Deploy Smart Contract (10 min)

1. Go to [remix.ethereum.org](https://remix.ethereum.org)
2. Create file: `SkillCredential.sol`
3. Copy code from `contracts/SkillCredential.sol`
4. Click "Compile" → "Deploy" (MetaMask pops up)
5. Copy contract address
6. Update `.env.local`:
   ```env
   VITE_SKILL_CREDENTIAL_ADDRESS=0xYourNewAddress
   ```

### Option B: Test Frontend Only

```bash
# Use default/mock contract address
# Frontend will work but blockchain features will fail
# Good for UI/UX development
```

### Option C: Get Pinata Credentials (5 min)

1. Go to [pinata.cloud](https://pinata.cloud)
2. Sign up → API Keys
3. Copy API Key, Secret, JWT token
4. Update `.env.local`:
   ```env
   VITE_PINATA_API_KEY=pnk_...
   VITE_PINATA_SECRET_API_KEY=...
   VITE_PINATA_JWT=eyJ...
   ```

## Essential Commands

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Run tests
npm run test

# Lint code
npm run lint
```

## Project Folder Tour

```
skill-forge/
├── contracts/SkillCredential.sol     ← Smart contract logic
├── src/lib/
│   ├── web3Config.ts                 ← Polygon config
│   ├── contractService.ts            ← Smart contract calls
│   ├── ipfsService.ts                ← Upload to IPFS
│   └── githubService.ts              ← Fetch GitHub data
├── src/hooks/useWallet.ts            ← Wallet connection
└── src/pages/                         ← App pages
```

## Code Examples

### Connect Wallet
```typescript
import { useWallet } from '@/hooks/useWallet';

const { connect, isConnected, address } = useWallet();

<button onClick={connect}>
  {isConnected ? address : 'Connect'}
</button>
```

### Get GitHub Data
```typescript
import { generateGitHubProof } from '@/lib/githubService';

const proof = await generateGitHubProof('octocat');
console.log(proof.totalCommits, proof.publicRepos);
```

### Upload to IPFS
```typescript
import { uploadToIPFS } from '@/lib/ipfsService';

const file = new File(['data'], 'proof.json');
const hash = await uploadToIPFS(file);
console.log('IPFS Hash:', hash);
```

### Call Smart Contract
```typescript
import { issueCredential } from '@/lib/contractService';

const tx = await issueCredential(signer, {
  holder: '0x...',
  title: 'Developer',
  skills: ['Solidity', 'Web3'],
  expiryDate: Math.floor(Date.now() / 1000) + 365 * 24 * 3600,
  proofIPFSHash: 'Qm...',
});
```

## Common Issues

### MetaMask won't connect
- Refresh page
- Check MetaMask is unlocked
- Ensure MetaMask extension is enabled

### "Invalid contract address"
- Contract not deployed yet
- Wrong address in `.env.local`
- Polygon Testnet selected

### "Pinata upload failed"
- Missing/invalid JWT token
- Token expired (regenerate)
- Internet connection issue

### Port 8080 already in use
```bash
npm run dev -- --port 3000
# Or kill process on 8080
lsof -i :8080
kill -9 <PID>
```

## Next Steps

1. Read [SETUP_GUIDE.md](./SETUP_GUIDE.md) for architecture
2. Read [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) for production
3. Start building features in `src/components/`
4. Check out the pages in `src/pages/`

## Useful Links

- **Solidity Docs**: https://docs.soliditylang.org/
- **ethers.js Docs**: https://docs.ethers.org/
- **Polygon Docs**: https://polygon.technology/
- **Pinata Docs**: https://docs.pinata.cloud/
- **GitHub API**: https://docs.github.com/rest

## Need Help?

- Check [SETUP_GUIDE.md](./SETUP_GUIDE.md) for detailed info
- Open issue on [GitHub](https://github.com/Shubhamkumar2703/skill-forge/issues)
- Ask questions in [Discussions](https://github.com/Shubhamkumar2703/skill-forge/discussions)

---

**Ready to build?** Start with `npm run dev` and happy coding! 🚀
