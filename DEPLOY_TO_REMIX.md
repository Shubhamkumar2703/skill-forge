# 🚀 Smart Contract Deployment to Polygon Testnet (Detailed Guide)

## Overview
This guide walks you through deploying `SkillCredential.sol` to Polygon Amoy Testnet using Remix IDE in **30 minutes**.

---

## ⏰ Time Breakdown
- **Setup**: 5 minutes
- **Remix IDE**: 5 minutes
- **Compilation**: 2 minutes
- **Deployment**: 10 minutes
- **Verification**: 5 minutes
- **Configuration**: 3 minutes
- **Total**: ~30 minutes

---

## 📋 Prerequisites

### Required
- [ ] MetaMask browser extension installed
- [ ] Polygon Amoy testnet added to MetaMask
- [ ] 0.5+ MATIC testnet tokens (from faucet)

### Optional
- [ ] Polygonscan account (for contract verification)

---

## 🔧 Step 1: Prepare MetaMask (5 minutes)

### 1.1 Add Polygon Amoy Testnet

1. Open **MetaMask** browser extension
2. Click on network dropdown (top left)
3. Click **"Add network"**
4. Click **"Add a network manually"**
5. Fill in these details:

```
Network Name: Polygon Amoy
RPC URL: https://rpc-amoy.polygon.technology/
Chain ID: 80002
Currency Symbol: MATIC
Block Explorer: https://www.oklink.com/amoy
```

6. Click **"Save"**

### 1.2 Get Testnet MATIC

1. Go to: https://faucet.polygon.technology/
2. Select **Network**: "Polygon Amoy"
3. **Paste your wallet address** (click MetaMask to copy)
4. Click **"Submit"**
5. Wait 2-5 minutes for tokens to arrive

**Verify**: Check MetaMask balance - should show ~0.5 MATIC

---

## 🌐 Step 2: Open Remix IDE (2 minutes)

1. Open browser and go to: https://remix.ethereum.org
2. Wait for Remix to fully load (may take 15-30 seconds)
3. You should see the Remix interface with file explorer on left

---

## 📄 Step 3: Create & Copy Smart Contract (5 minutes)

### 3.1 Create New File

1. In Remix, look at **left sidebar**
2. Click **"Create New File"** icon (looks like a page with +)
3. Enter filename: `SkillCredential.sol`
4. Click **"Create"**

### 3.2 Copy Contract Code

1. Go back to your project folder
2. Open `contracts/SkillCredential.sol`
3. **Select all code** (Ctrl+A)
4. **Copy code** (Ctrl+C)

### 3.3 Paste in Remix

1. Click on the `SkillCredential.sol` tab in Remix
2. **Delete any placeholder text**
3. **Paste the contract code** (Ctrl+V)
4. You should see the complete contract with syntax highlighting

**Check**: Code should appear without errors (may have yellow warnings - that's OK)

---

## ✅ Step 4: Compile Smart Contract (3 minutes)

### 4.1 Open Compiler

1. On left sidebar, click **"Solidity Compiler"** icon (looks like ⌚)
2. You should see compiler settings panel

### 4.2 Set Compiler Version

1. Look for **"Compiler"** dropdown
2. Select version: **`0.8.19`** (or latest 0.8.x)
3. Click **"Compile SkillCredential.sol"** button
4. Wait for compilation to finish (10-30 seconds)

**Success**: You should see a ✅ checkmark next to the contract name

**If you see errors**:
- Check that you copied the entire contract
- Make sure no text is missing
- Try compiling again

---

## 🚀 Step 5: Deploy to Polygon Testnet (10 minutes)

### 5.1 Open Deploy Panel

1. On left sidebar, click **"Deploy & Run Transactions"** icon (looks like a play button ▶)
2. You should see deployment settings panel

### 5.2 Set Environment

1. Look for **"Environment"** dropdown at top
2. Click it and select: **"Injected Provider - MetaMask"**
3. MetaMask popup appears - click **"Connect"**
4. You should see your wallet address appear

### 5.3 Verify Network

1. Check that MetaMask shows: **"Polygon Amoy"** network
2. If not, switch to Polygon Amoy in MetaMask
3. Refresh Remix if needed

### 5.4 Select Contract

1. Look for **"Contract"** dropdown
2. Make sure **"SkillCredential"** is selected
3. You should see constructor parameters (if any)

### 5.5 Deploy

1. Click **"Deploy"** button (orange/red button)
2. **MetaMask popup appears** - review transaction
3. Click **"Confirm"** in MetaMask
4. Wait for deployment (30-60 seconds)

**Success indicators**:
- ✅ Transaction appears in MetaMask activity
- ✅ "Deployed Contracts" section appears in Remix
- ✅ Contract address shows at bottom

---

## 📝 Step 6: Save Contract Address (2 minutes)

### 6.1 Get Contract Address

1. In Remix, look for **"Deployed Contracts"** section
2. You'll see your contract listed
3. Click the **copy icon** next to the contract address
4. This is your deployed contract address (looks like: `0x1234567890abcdef...`)

### 6.2 Save for Later

**Create a text file** with:
```
=== SKILL CREDENTIAL DEPLOYMENT ===
Date: January 25, 2026
Network: Polygon Amoy Testnet
Chain ID: 80002

Contract Address: 0xYOUR_CONTRACT_ADDRESS_HERE
Transaction Hash: 0xYOUR_TX_HASH_HERE
Deployment Block: 12345678

Keep this safe! You'll need it for .env.local
```

---

## ✨ Step 7: Verify Contract Works (3 minutes)

### 7.1 Test a Function

1. In Remix's "Deployed Contracts" section
2. Expand the contract (click dropdown arrow)
3. Look for **"getCredentialCount"** function
4. Click it to execute
5. Should return: `0` (no credentials yet)

**This confirms**: Contract is deployed and working!

### 7.2 Verify on Polygonscan

1. Go to: https://www.oklink.com/amoy
2. Search for your contract address
3. You should see:
   - ✅ Contract code
   - ✅ Recent transactions
   - ✅ Function list

---

## 🔧 Step 8: Configure Project (3 minutes)

### 8.1 Update .env.local

1. Go back to your project folder
2. Open `.env.local` (or create from `.env.example`)
3. Update this line:

```env
VITE_SKILL_CREDENTIAL_ADDRESS=0xYOUR_CONTRACT_ADDRESS_HERE
```

**Replace** `0xYOUR_CONTRACT_ADDRESS_HERE` with your actual contract address from step 6.1

### 8.2 Verify Other Variables

Make sure you have:

```env
# Polygon RPC
VITE_POLYGON_RPC_URL=https://rpc-amoy.polygon.technology/

# Smart Contract Address (just updated)
VITE_SKILL_CREDENTIAL_ADDRESS=0x...

# IPFS & Pinata (keep existing or add from Pinata)
VITE_PINATA_JWT=your_jwt_token

# GitHub (optional)
VITE_GITHUB_TOKEN=your_token
```

### 8.3 Save File

Save `.env.local` - this tells your frontend where the contract is!

---

## ✅ Verification Checklist

- [ ] MetaMask connected to Polygon Amoy
- [ ] Have 0.5+ MATIC testnet tokens
- [ ] Contract deployed to Remix
- [ ] Compilation successful (✅ checkmark)
- [ ] Deployment successful (MetaMask confirmed)
- [ ] Contract address copied
- [ ] `.env.local` updated with contract address
- [ ] `getCredentialCount()` returns 0
- [ ] Contract visible on Polygonscan

---

## 🎉 Success!

Your smart contract is now deployed! 

**Next Steps**:
1. Start your dev server: `npm run dev`
2. Connect your wallet in the app
3. Test credential issuance
4. Build frontend components

---

## 🐛 Troubleshooting

### Problem: "MetaMask popup doesn't appear"
**Solution**:
1. Check MetaMask is unlocked
2. Check MetaMask extension is enabled
3. Try refreshing Remix
4. Try clicking "Connect to MetaMask" again

### Problem: "Insufficient balance for gas"
**Solution**:
1. Get more MATIC from faucet: https://faucet.polygon.technology/
2. Wait 5 minutes and try deploying again

### Problem: "Network is Ethereum, not Polygon"
**Solution**:
1. Click MetaMask network dropdown
2. Select "Polygon Amoy"
3. Refresh Remix page
4. Try deployment again

### Problem: "Compilation failed"
**Solution**:
1. Make sure entire contract code was copied
2. Check Solidity version is 0.8.19+
3. Look for error messages in Remix
4. Copy contract again from file

### Problem: "Contract address not showing"
**Solution**:
1. Check MetaMask transaction succeeded
2. Look at bottom of Remix window
3. Scroll down in "Deployed Contracts" section
4. Try refreshing Remix

### Problem: "Can't find contract on Polygonscan"
**Solution**:
1. Wait 1-2 minutes (network confirmation)
2. Try refreshing Polygonscan page
3. Check address is correct (copy from Remix)
4. Make sure you're on Amoy testnet explorer

---

## 🔗 Useful Links

- **Remix IDE**: https://remix.ethereum.org
- **Polygon Faucet**: https://faucet.polygon.technology/
- **Polygonscan (Explorer)**: https://www.oklink.com/amoy
- **Polygon Docs**: https://polygon.technology/developers
- **MetaMask**: https://metamask.io/

---

## 💡 Pro Tips

1. **Keep contract address safe** - Save it in a text file
2. **Verify on Polygonscan** - Screenshot for records
3. **Test functions in Remix** - Before building frontend
4. **Use consistent environment** - Same address everywhere

---

## 📊 Expected Timeline

```
Start
  ↓
5 min: MetaMask setup + get MATIC
  ↓
2 min: Open Remix IDE
  ↓
5 min: Copy contract code
  ↓
3 min: Compile contract
  ↓
10 min: Deploy to Polygon
  ↓
2 min: Save contract address
  ↓
3 min: Verify & test
  ↓
DONE! (30 min total)
```

---

## 🎯 Next Action

**After deployment**:
1. Update `.env.local` with contract address
2. Run `npm run dev`
3. Connect wallet and test app
4. Start building components!

---

## FAQ

**Q: Can I redeploy if something goes wrong?**
A: Yes! You can deploy again anytime. Each deployment gets a new address.

**Q: Do I need to verify the contract?**
A: Not required for testnet, but recommended. See DEPLOYMENT_GUIDE.md for verification.

**Q: How much does deployment cost?**
A: About 0.001-0.002 MATIC (cents). Testnet tokens are free.

**Q: Can I upgrade the contract?**
A: Not with current design. You'd need to redeploy or use proxy pattern.

**Q: How long does deployment take?**
A: Usually 30-60 seconds. Check MetaMask transaction status.

---

**Congratulations! Your smart contract is live on Polygon Testnet!** 🎉

Need help? Check troubleshooting section above or review [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md)
