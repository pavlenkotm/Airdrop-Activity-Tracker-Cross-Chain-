# Deployment Guide

This guide will help you deploy the Airdrop Activity Tracker to various platforms.

## Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications.

### Steps:

1. Push your code to GitHub

2. Go to [vercel.com](https://vercel.com) and sign in

3. Click "New Project"

4. Import your GitHub repository

5. Configure your project:
   - Framework Preset: Next.js
   - Build Command: `npm run build`
   - Output Directory: `.next`

6. Add environment variables (optional):
   - `COINGECKO_API_KEY` (if using CoinGecko Pro)
   - Custom RPC endpoints

7. Click "Deploy"

### Custom Domain (Optional)

1. Go to your project settings
2. Navigate to "Domains"
3. Add your custom domain
4. Update DNS settings as instructed

## Netlify

### Steps:

1. Push your code to GitHub

2. Go to [netlify.com](https://netlify.com) and sign in

3. Click "Add new site" → "Import an existing project"

4. Connect to your GitHub repository

5. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `.next`

6. Add environment variables in site settings

7. Click "Deploy site"

## Docker

### Build Docker Image:

```bash
# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app
ENV NODE_ENV production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
USER nextjs
EXPOSE 3000
ENV PORT 3000
CMD ["node", "server.js"]
EOF

# Build image
docker build -t airdrop-tracker .

# Run container
docker run -p 3000:3000 airdrop-tracker
```

## Self-Hosting (VPS)

### Prerequisites:
- Ubuntu 20.04+ or similar Linux distribution
- Node.js 18+ installed
- Nginx (optional, for reverse proxy)
- PM2 (for process management)

### Steps:

1. Clone repository on your server:
```bash
git clone https://github.com/yourusername/Airdrop-Activity-Tracker-Cross-Chain-.git
cd Airdrop-Activity-Tracker-Cross-Chain-
```

2. Install dependencies:
```bash
npm install
```

3. Build the application:
```bash
npm run build
```

4. Install PM2:
```bash
npm install -g pm2
```

5. Start the application:
```bash
pm2 start npm --name "airdrop-tracker" -- start
pm2 save
pm2 startup
```

6. Configure Nginx (optional):
```nginx
server {
    listen 80;
    server_name your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

7. Enable SSL with Let's Encrypt:
```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d your-domain.com
```

## Environment Variables for Production

For production deployments, consider adding:

```bash
# Production mode
NODE_ENV=production

# Custom RPC endpoints (recommended for production)
NEXT_PUBLIC_ETHEREUM_RPC=https://eth-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_ARBITRUM_RPC=https://arb-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_OPTIMISM_RPC=https://opt-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_BASE_RPC=https://base-mainnet.g.alchemy.com/v2/YOUR_KEY
NEXT_PUBLIC_ZKSYNC_RPC=https://mainnet.era.zksync.io

# CoinGecko Pro API (higher rate limits)
COINGECKO_API_KEY=your_pro_api_key
```

## Performance Optimization

### 1. Use Premium RPC Providers
- Alchemy
- Infura
- QuickNode

### 2. Implement Caching
- Redis for API response caching
- Cache transaction data

### 3. CDN
- Use Vercel Edge Network
- Or CloudFlare CDN

### 4. Database (Optional)
- Store historical data
- Reduce RPC calls
- Implement user sessions

## Monitoring

### Recommended Tools:
- Vercel Analytics (built-in with Vercel)
- Google Analytics
- Sentry for error tracking
- Uptime monitoring (UptimeRobot, Pingdom)

## Security Considerations

1. **Rate Limiting**: Implement rate limiting on API routes
2. **CORS**: Configure appropriate CORS policies
3. **API Keys**: Never expose API keys in client-side code
4. **Input Validation**: Always validate wallet addresses
5. **SSL/TLS**: Use HTTPS in production

## Troubleshooting

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18+)

### RPC Errors
- Check RPC endpoint availability
- Verify API keys are correct
- Check rate limits

### Performance Issues
- Use premium RPC providers
- Implement caching
- Optimize component rendering

## Scaling

For high-traffic scenarios:

1. **Use CDN** for static assets
2. **Implement caching** (Redis, Memcached)
3. **Use load balancer** for multiple instances
4. **Database indexing** if using a database
5. **Queue system** for heavy processing (Bull, RabbitMQ)

## Support

If you encounter issues during deployment, please:
1. Check the logs
2. Verify environment variables
3. Review this guide
4. Open an issue on GitHub
