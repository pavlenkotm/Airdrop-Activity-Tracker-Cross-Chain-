# Airdrop Activity Tracker (Cross-Chain)

A comprehensive cross-chain airdrop activity tracker that helps users check their eligibility for potential airdrops across multiple blockchain networks.

## Features

- **Multi-Chain Support**: Track activity across Ethereum, Arbitrum, Optimism, Base, and zkSync Era
- **Comprehensive Analysis**: Monitor transactions, contract interactions, volumes, and bridge usage
- **Real-time Price Data**: Integration with CoinGecko API for USD volume calculations
- **Multiple Airdrop Campaigns**: Pre-configured criteria for LayerZero, zkSync, Linea, Base, and Berachain
- **User-Friendly Interface**: Clean, responsive UI built with Next.js and Tailwind CSS
- **Detailed Requirements**: Visual progress tracking for each airdrop requirement

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, TypeScript
- **Styling**: Tailwind CSS
- **Blockchain**: ethers.js v6
- **API Integration**: CoinGecko API for price data
- **RPC Providers**: Public RPC endpoints for each supported network

## Supported Networks

1. **Ethereum Mainnet** - Chain ID: 1
2. **Arbitrum One** - Chain ID: 42161
3. **Optimism** - Chain ID: 10
4. **Base** - Chain ID: 8453
5. **zkSync Era** - Chain ID: 324

## Airdrop Campaigns

### 1. LayerZero
- Minimum 10 transactions
- $100+ in volume
- 5+ active days
- 2+ weeks of activity
- 5+ contract interactions
- 2+ bridge transactions

### 2. zkSync Era
- Minimum 20 transactions
- $200+ in volume
- 10+ active days
- 4+ weeks of activity
- 8+ contract interactions
- Bridge required

### 3. Linea
- Minimum 15 transactions
- $150+ in volume
- 7+ active days
- 3+ weeks of activity
- 6+ contract interactions
- Bridge required

### 4. Base
- Minimum 15 transactions
- $150+ in volume
- 8+ active days
- 3+ weeks of activity
- 7+ contract interactions
- Bridge required

### 5. Berachain
- Minimum 25 transactions
- $250+ in volume
- 12+ active days
- 5+ weeks of activity
- 10+ contract interactions

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/Airdrop-Activity-Tracker-Cross-Chain-.git
cd Airdrop-Activity-Tracker-Cross-Chain-
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

```
├── app/                      # Next.js app directory
│   ├── api/                 # API routes
│   │   └── check-activity/  # Activity checking endpoint
│   ├── layout.tsx           # Root layout
│   ├── page.tsx             # Main page
│   └── globals.css          # Global styles
├── components/              # React components
│   ├── WalletInput.tsx      # Wallet address input
│   ├── AirdropCard.tsx      # Airdrop status card
│   ├── StatusBadge.tsx      # Status indicator
│   ├── RequirementRow.tsx   # Requirement progress
│   └── NetworkStats.tsx     # Network statistics table
├── config/                  # Configuration files
│   ├── networks.ts          # Network configurations
│   └── airdrops/            # Airdrop criteria configs
│       ├── layerzero.json
│       ├── zksync.json
│       ├── linea.json
│       ├── base.json
│       └── berachain.json
├── lib/                     # Core libraries
│   ├── blockchain/          # Blockchain utilities
│   │   ├── provider.ts      # RPC provider management
│   │   ├── transactions.ts  # Transaction fetching
│   │   └── scanner.ts       # Activity scanning
│   └── services/            # External services
│       ├── coingecko.ts     # CoinGecko API integration
│       └── activityChecker.ts # Activity verification
└── types/                   # TypeScript type definitions
    └── index.ts
```

## Usage

1. Enter a wallet address (0x...) in the input field
2. Click "Check Activity" button
3. View your activity breakdown across all supported networks
4. Review each airdrop's requirements and your current status
5. See what requirements you still need to meet

## How It Works

1. **Address Validation**: Validates the entered Ethereum address format
2. **Multi-Chain Scanning**: Queries transaction data from each supported network via RPC
3. **Activity Analysis**:
   - Counts total transactions
   - Identifies contract interactions
   - Detects bridge transactions
   - Calculates active days and weeks
4. **Volume Calculation**: Fetches ETH price from CoinGecko and estimates USD volume
5. **Requirement Checking**: Compares activity against each airdrop's criteria
6. **Status Determination**: Shows OK (green), Warning (yellow), or Incomplete (red)

## Customization

### Adding New Airdrops

Create a new JSON file in `config/airdrops/`:

```json
{
  "id": "my-airdrop",
  "name": "My Airdrop",
  "description": "Description of the airdrop",
  "networks": ["ethereum", "arbitrum"],
  "criteria": {
    "minTransactions": 10,
    "minVolume": 100,
    "minActiveDays": 5,
    "minContractInteractions": 5
  },
  "contracts": {
    "ethereum": [
      {
        "address": "0x...",
        "network": "ethereum",
        "name": "Contract Name",
        "type": "dex"
      }
    ]
  }
}
```

Then import it in `config/airdrops/index.ts`.

### Adding New Networks

1. Add network configuration to `config/networks.ts`:

```typescript
[Network.NEW_NETWORK]: {
  name: 'Network Name',
  chainId: 123,
  rpcUrl: 'https://rpc.url',
  explorer: 'https://explorer.url',
  nativeCurrency: {
    name: 'Token Name',
    symbol: 'SYM',
    decimals: 18,
  },
  coingeckoId: 'token-id',
}
```

2. Add the network to the `Network` enum in `types/index.ts`

## API Endpoints

### POST `/api/check-activity`

Check wallet activity across all networks and airdrops.

**Request:**
```json
{
  "address": "0x..."
}
```

**Response:**
```json
{
  "address": "0x...",
  "airdrops": [...],
  "totalStats": [...],
  "lastChecked": 1234567890
}
```

## Limitations

- Uses public RPC endpoints (rate limits may apply)
- Transaction history is limited by RPC capabilities
- Volume calculations are estimates based on transaction count
- For production use, consider:
  - Using block explorer APIs (Etherscan, etc.)
  - Implementing a backend indexer
  - Using The Graph protocol for indexed data
  - Adding caching layer (Redis)
  - Using premium RPC providers

## Future Enhancements

- [ ] NFT minting detection
- [ ] Liquidity provision tracking
- [ ] Wallet age calculation
- [ ] More detailed contract interaction analysis
- [ ] Historical price data for accurate volume
- [ ] Export results to PDF/CSV
- [ ] Wallet comparison feature
- [ ] Email notifications for requirement updates
- [ ] Integration with more block explorers
- [ ] Support for additional networks (Polygon, Avalanche, etc.)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Disclaimer

This tool provides estimates based on publicly available on-chain data. Actual airdrop eligibility is determined by the respective projects and may use different criteria. This is not financial advice. Always do your own research.

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Contact

For questions or suggestions, please open an issue on GitHub.

---

Built with ❤️ for the crypto community