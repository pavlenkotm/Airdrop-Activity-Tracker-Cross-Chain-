# Quick Start Guide

Get the Airdrop Activity Tracker running in 5 minutes!

## Prerequisites

- Node.js 18 or higher
- npm or yarn

## Installation Steps

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/yourusername/Airdrop-Activity-Tracker-Cross-Chain-.git

# Navigate to project directory
cd Airdrop-Activity-Tracker-Cross-Chain-

# Install dependencies
npm install
```

### 2. Run Development Server

```bash
npm run dev
```

### 3. Open in Browser

Open [http://localhost:3000](http://localhost:3000)

That's it! You're ready to check airdrop eligibility.

## First Use

1. Enter a wallet address (e.g., `0x...`)
2. Click "Check Activity"
3. View your airdrop eligibility across multiple chains

## Example Wallets to Test

Try these active wallet addresses to see the tracker in action:
- Vitalik's wallet: `0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045`
- Any Ethereum address you want to check

## What Gets Checked?

For each airdrop campaign, the tracker analyzes:
- Total transaction count
- Transaction volume in USD
- Active days and weeks
- Contract interactions
- Bridge usage

## Supported Airdrops

1. **LayerZero** - Cross-chain messaging protocol
2. **zkSync Era** - Layer 2 scaling solution
3. **Linea** - ConsenSys Layer 2
4. **Base** - Coinbase Layer 2
5. **Berachain** - EVM L1 with PoL

## Supported Networks

- Ethereum Mainnet
- Arbitrum One
- Optimism
- Base
- zkSync Era

## Common Issues

### Port Already in Use

If port 3000 is already in use:
```bash
PORT=3001 npm run dev
```

### Dependencies Installation Failed

Try clearing npm cache:
```bash
npm cache clean --force
npm install
```

### Build Errors

Clear build cache:
```bash
rm -rf .next
npm run dev
```

## Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

## Environment Variables (Optional)

For better performance, create `.env.local`:

```bash
# Custom RPC endpoints (optional, but recommended)
NEXT_PUBLIC_ETHEREUM_RPC=your_rpc_url
NEXT_PUBLIC_ARBITRUM_RPC=your_rpc_url
NEXT_PUBLIC_OPTIMISM_RPC=your_rpc_url
NEXT_PUBLIC_BASE_RPC=your_rpc_url
NEXT_PUBLIC_ZKSYNC_RPC=your_rpc_url
```

Get free RPC endpoints from:
- [Alchemy](https://www.alchemy.com/)
- [Infura](https://infura.io/)
- [QuickNode](https://www.quicknode.com/)

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Check [DEPLOYMENT.md](DEPLOYMENT.md) for deployment options
- See [CONTRIBUTING.md](CONTRIBUTING.md) if you want to contribute

## Need Help?

- Check existing [GitHub Issues](https://github.com/yourusername/Airdrop-Activity-Tracker-Cross-Chain-/issues)
- Create a new issue if you find a bug
- Read the troubleshooting section in README.md

## Tips for Best Results

1. **Use Premium RPC**: Free public RPCs may have rate limits
2. **Check Recent Activity**: The tracker shows recent on-chain data
3. **Multiple Checks**: You can check multiple wallets
4. **Stay Updated**: Airdrop criteria may change over time

## Development Tips

### Hot Reload

The development server supports hot reload - changes appear instantly!

### File Structure

```
app/        - Next.js pages and API routes
components/ - React UI components
lib/        - Business logic and utilities
config/     - Network and airdrop configurations
types/      - TypeScript type definitions
```

### Adding New Airdrops

1. Create JSON file in `config/airdrops/`
2. Import in `config/airdrops/index.ts`
3. Restart dev server

### Customizing UI

- Components use Tailwind CSS
- Edit `tailwind.config.js` for theme changes
- Modify components in `components/` directory

## Performance Optimization

For production deployments:
- Use CDN (Vercel automatically provides this)
- Enable caching for API responses
- Use premium RPC providers
- Consider implementing Redis for caching

## Security Notes

- Never commit API keys to git
- Use environment variables for sensitive data
- Always validate wallet addresses
- Implement rate limiting in production

---

Happy airdrop hunting! 🚀
