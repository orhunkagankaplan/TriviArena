# TriviArene
**Skill-based quiz battles with real stakes on Base blockchain**

[![Base](https://img.shields.io/badge/Built%20on-Base-0052FF)](https://base.org)
[![Status](https://img.shields.io/badge/Status-MVP%20Development-yellow)](https://github.com/orhunkagankaplan/triviarena)
[![License](https://img.shields.io/badge/License-MIT-green)](./LICENSE)

## 🎯 Overview

TriviArena is a competitive quiz platform where users battle each other for real stakes. Challenge friends, prove your knowledge, and win crypto - all on Base's lightning-fast, low-cost infrastructure.

**Think: Trivia meets Polymarket meets Web3**

## ✨ Features

### 🎮 Game Modes
- **Practice Mode** - Train your skills risk-free
- **Quick Match** - Instant battles with random opponents
- **Challenge Friend** - Direct challenges via shareable links
- **Tournament Mode** *(Coming Soon)* - 10+ player competitions

### 💰 Stake Options
- $10, $50, $100, $500 stakes
- Winner takes 95% of prize pool
- 5% platform fee
- Instant payouts via smart contract

### 🧠 Categories
- **Crypto/Web3** - DeFi, NFTs, blockchain technology
- **Gaming** - Video games, esports, gaming culture
- **Sports** - Football, basketball, Olympics, records
- **General Knowledge** - History, science, geography, culture

### 🔐 Security Features
- Smart contract escrow system
- 24-hour challenge expiry
- Automatic refunds for unaccepted challenges
- Transparent on-chain results

## 🛠️ Tech Stack

**Frontend:**
- React 18 + Next.js 14
- TypeScript
- Tailwind CSS
- Lucide Icons

**Blockchain:**
- Base (Ethereum L2)
- Solidity ^0.8.0
- Wagmi + Viem
- RainbowKit

**Infrastructure:**
- Vercel (hosting)
- IPFS (question storage)
- The Graph (indexing)

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MetaMask or compatible wallet
- Base Sepolia testnet ETH

### Installation

```bash
# Clone repository
git clone https://github.com/orhunkagankaplan/triviarena
cd triviarena

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your contract addresses and RPC URLs

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

### Smart Contract Deployment

```bash
# Deploy to Base Sepolia testnet
npx hardhat deploy --network base-sepolia

# Verify contract
npx hardhat verify --network base-sepolia [CONTRACT_ADDRESS]
```

## 📊 Project Status

**Current Progress: 80% Complete**

- ✅ Frontend UI/UX (Polymarket-style design)
- ✅ Quiz gameplay mechanics
- ✅ Challenge system with shareable links
- ✅ 500+ trivia questions across 4 categories
- ✅ Smart contract architecture
- 🚧 Wallet integration (in progress)
- 🚧 Base Sepolia deployment (this week)
- 📅 Mainnet launch target: November 2024

## 🎯 Roadmap

### Phase 1: MVP Launch (Week 1-2)
- Deploy to Base mainnet
- Launch with 1,000 curated questions
- Partner with 10 crypto influencers
- Target: 1,000 active users

### Phase 2: Growth (Month 2)
- Tournament mode (10+ players)
- Leaderboards & achievements
- Referral program (5% of friend's first 10 games)
- Target: 10,000 active users

### Phase 3: Scale (Month 3-6)
- Mobile app (iOS/Android)
- Custom branded challenges
- Category expansion (Music, Movies, etc.)
- Target: 50,000+ active users

## 💡 Why Base?

Base provides the perfect infrastructure for TriviArena:

- **Low Fees** - $0.01-0.05 per transaction enables $10 stakes
- **Fast Finality** - Instant game results and payouts
- **EVM Compatible** - Familiar tooling and ecosystem
- **Coinbase Integration** - Easy onboarding for new users
- **Growing Ecosystem** - Built-in user base and support

## 📈 Business Model

**Revenue Streams:**
1. **Platform Fee** - 5% of all game stakes
2. **Premium Features** - $9.99/month (no fees, advanced stats)
3. **Power-ups** - One-time boosters ($1-2 each)
4. **Tournaments** - Entry fees and sponsorships

**Projections:**
- Month 1: $5K revenue (1,000 users)
- Month 3: $25K revenue (10,000 users)
- Month 6: $100K+ revenue (50,000 users)

## 🏆 Competitive Advantages

1. **First Mover** - First skill-based quiz platform on Base
2. **Network Effects** - More players = better matching
3. **Question Database** - 500+ curated questions (growing)
4. **Superior UX** - Polymarket-level design quality
5. **Social Virality** - Challenge links drive organic growth

## 🤝 Contributing

We're not accepting external contributions during MVP phase. Follow our progress:

- Twitter: [@TriviArena](https://twitter.com/TriviArena) *(launching soon)*
- Discord: [Join our community](https://discord.gg/triviarena) *(launching soon)*

## 📄 License

MIT License - see [LICENSE](./LICENSE) file for details

## 🔗 Links

- **Website:** triviarena.io *(coming soon)*
- **Demo:** [View Prototype](https://triviarena-demo.vercel.app) *(coming soon)*
- **Docs:** [Documentation](./docs) *(coming soon)*
- **Smart Contract:** [Base Explorer](https://sepolia.basescan.org) *(deploying this week)*

## 📧 Contact

For partnerships, press, or inquiries:
- Email: hello@triviarena.io
- Twitter: [@TriviArena](https://twitter.com/TriviArena)

---

**Built with ❤️ on Base** 🔵

*TriviArena is participating in Base Batches - supporting the next generation of onchain applications.*
