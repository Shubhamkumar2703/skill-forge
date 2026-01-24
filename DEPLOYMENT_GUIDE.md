# Deployment & Configuration Guide

## Step-by-Step Deployment Instructions

### Step 1: Deploy Smart Contract to Polygon Testnet

#### Option A: Using Remix IDE (Easiest)

1. **Open Remix IDE**
   - Go to https://remix.ethereum.org
   - Click "Create New File" (New icon on left sidebar)
   - Name it: `SkillCredential.sol`

2. **Copy Contract Code**
   - Copy the entire content from `contracts/SkillCredential.sol`
   - Paste into the new Remix file

3. **Compile Contract**
   - Click on "Solidity Compiler" tab (left sidebar)
   - Click "Compile SkillCredential.sol"
   - Ensure compiler version is 0.8.19 or higher

4. **Deploy Contract**
   - Click "Deploy & Run Transactions" tab
   - Select environment: "Injected Provider - MetaMask"
   - MetaMask popup: Switch to Polygon Amoy Testnet
   - Select contract: "SkillCredential"
   - Click "Deploy"
   - MetaMask popup: Confirm transaction
   - Wait for deployment confirmation

5. **Copy Contract Address**
   - After deployment, contract appears in "Deployed Contracts"
   - Click copy icon next to contract address
   - Save for later (example: `0x1234567890abcdef...`)

#### Option B: Using Hardhat (Advanced)

```bash
# Install Hardhat
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox

# Initialize project
npx hardhat

# Create contracts/SkillCredential.sol
# Copy contract code

# Update hardhat.config.js
```

**hardhat.config.js**:
```javascript
require("@nomicfoundation/hardhat-toolbox");

module.exports = {
  solidity: "0.8.19",
  networks: {
    polygonAmoy: {
      url: process.env.POLYGON_RPC_URL,
      accounts: [process.env.PRIVATE_KEY],
      chainId: 80002,
    },
  },
};
```

```bash
# Deploy
npx hardhat run scripts/deploy.js --network polygonAmoy

# Copy deployed address
```

### Step 2: Get Pinata Credentials

1. **Create Pinata Account**
   - Go to https://pinata.cloud
   - Sign up with email

2. **Generate API Keys**
   - Dashboard → API Keys → "+ Create Key"
   - Name: "Skill Forge"
   - Admin Privileges: Ensure checked
   - Click "Create Key"
   - Copy "API Key" and "API Secret Key"

3. **Generate JWT Token**
   - Dashboard → API Keys → "+ Generate JWT"
   - Expiration: 1 year (or longer)
   - Click "Generate"
   - Copy the JWT token

4. **Save Credentials**
   ```env
   VITE_PINATA_API_KEY=your_api_key_here
   VITE_PINATA_SECRET_API_KEY=your_secret_key_here
   VITE_PINATA_JWT=your_jwt_token_here
   ```

### Step 3: Get GitHub Token (Optional but Recommended)

1. **GitHub Settings**
   - Go to https://github.com/settings/tokens
   - Click "Generate new token" → "Generate new token (classic)"

2. **Configure Token**
   - Token name: "Skill Forge"
   - Expiration: 1 year
   - Scopes: Select `public_repo`
   - Click "Generate token"

3. **Save Token**
   ```env
   VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxx
   ```

### Step 4: Configure Environment Variables

1. **Create `.env.local` file**

```bash
cd skill-forge
cp .env.example .env.local
```

2. **Edit `.env.local`**

```env
# Web3 & Blockchain
VITE_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology/
VITE_SKILL_CREDENTIAL_ADDRESS=0xYourContractAddressHere

# IPFS & Pinata
VITE_PINATA_API_KEY=pnk_xxxxxxxxxxxxx
VITE_PINATA_SECRET_API_KEY=your_secret_key
VITE_PINATA_JWT=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# GitHub API
VITE_GITHUB_TOKEN=ghp_xxxxxxxxxxxxxxxxxxxxxx
```

3. **Verify `.env.local` is in `.gitignore`**

```bash
# Check .gitignore contains:
cat .gitignore | grep ".env"
# Should output: .env.local
```

### Step 5: Get Polygon Testnet Tokens

1. **Visit Polygon Faucet**
   - Go to https://faucet.polygon.technology/

2. **Claim MATIC Tokens**
   - Select Network: "Polygon Amoy"
   - Paste your MetaMask wallet address
   - Click "Submit"
   - Wait for tokens (2-5 minutes)

### Step 6: Test Locally

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Open http://localhost:8080 in browser
```

### Step 7: Deploy Frontend to Vercel

1. **Push to GitHub**

```bash
git init
git add .
git commit -m "Initial commit: Skill Forge"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/skill-forge.git
git push -u origin main
```

2. **Deploy with Vercel**

```bash
# Install Vercel CLI
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

3. **Configure Environment Variables on Vercel**

- Go to https://vercel.com/dashboard
- Select your project
- Settings → Environment Variables
- Add all variables from `.env.local`
- Redeploy

### Step 8: Verify Deployment

**Check Smart Contract**

```bash
# Visit Polygon Amoy Explorer
# https://www.oklink.com/amoy

# Search for your contract address
# Verify contract is deployed and callable
```

**Check IPFS Gateway**

```bash
# Test Pinata gateway
# Replace IPFS_HASH with actual hash
# https://gateway.pinata.cloud/ipfs/IPFS_HASH
```

**Check Frontend**

```bash
# Visit your Vercel URL
# Connect wallet
# Test credential issuance
```

## Troubleshooting

### MetaMask Issues

**"Chain not found" error**

- MetaMask → Settings → Networks → Add Network
- Network Name: Polygon Amoy
- RPC URL: https://rpc-amoy.polygon.technology/
- Chain ID: 80002
- Currency: MATIC

**"Not enough balance" error**

- Get testnet MATIC from faucet: https://faucet.polygon.technology/
- Wait 2-5 minutes for tokens to arrive

### Pinata Issues

**"Invalid JWT" error**

- Generate new JWT token
- Ensure token hasn't expired
- Check for trailing spaces in `.env.local`

### Smart Contract Issues

**"Contract address not found" error**

- Verify contract was deployed to Polygon Amoy
- Check address format (should start with 0x)
- Verify address in `.env.local` is correct

**"Gas estimation failed" error**

- Ensure you have enough MATIC balance
- Check Polygon network isn't congested
- Increase gas limit in MetaMask

### GitHub API Issues

**"Rate limit exceeded" error**

- GitHub public API: 60 requests/hour (unauthenticated)
- With token: 5,000 requests/hour
- Add `VITE_GITHUB_TOKEN` to increase limit

## Production Checklist

Before deploying to production:

- [ ] Smart contract deployed to Polygon mainnet
- [ ] All environment variables set correctly
- [ ] Pinata account with sufficient credits
- [ ] GitHub token configured (or remove feature)
- [ ] Frontend tested on multiple browsers
- [ ] MetaMask connected and tested
- [ ] Wallet has sufficient MATIC for transactions
- [ ] IPFS gateway is accessible
- [ ] Smart contract verified on Polygonscan
- [ ] Frontend deployed to custom domain

## Polygon Mainnet Deployment

For production (Polygon Mainnet, not testnet):

```env
# Update RPC URL
VITE_POLYGON_RPC_URL=https://polygon-rpc.com/

# Update network in web3Config.ts
export const POLYGON_MAINNET = {
  chainId: 137,
  name: 'Polygon Mainnet',
  rpcUrl: 'https://polygon-rpc.com/',
  blockExplorer: 'https://polygonscan.com/',
  // ...
};
```

**Important**: Mainnet uses real MATIC tokens. Be cautious with gas fees!

## Monitoring & Analytics

### Monitor Smart Contract

- **Polygonscan**: https://polygonscan.com/
- Search contract address
- View transactions, events, holders

### Monitor IPFS

- **Pinata Dashboard**: https://pinata.cloud/dashboard
- View uploads, pin status
- Check bandwidth usage

### Monitor Website

- **Vercel Analytics**: Dashboard → Analytics
- View page views, response times
- Monitor errors and logs

## Scaling & Optimization

### For High Traffic

1. **IPFS**: Upgrade Pinata plan
2. **Frontend**: Enable Vercel caching
3. **Smart Contract**: Consider Layer 2 batching

### For Cost Reduction

1. **Gas Optimization**: Batch transactions
2. **IPFS**: Use gateway caching
3. **GitHub API**: Cache API responses

## Security Hardening

1. **Smart Contract**
   - Get professional audit
   - Use OpenZeppelin libraries
   - Implement timelock for upgrades

2. **Frontend**
   - Enable Content Security Policy (CSP)
   - Use environment variable validation
   - Implement rate limiting

3. **Infrastructure**
   - Use Vercel edge functions for API routes
   - Enable DDoS protection
   - Regular security updates

## Support

For issues during deployment:

1. Check error messages carefully
2. Review troubleshooting section above
3. Check GitHub issues: https://github.com/Shubhamkumar2703/skill-forge/issues
4. Open new issue with:
   - Error message
   - Steps to reproduce
   - Environment details
   - Screenshots
