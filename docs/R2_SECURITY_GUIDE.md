# R2 Security Configuration Guide

## Protecting Your Music Storage from Abuse

### Option 1: Simple Referer Check (Recommended for Start)

1. **Go to Cloudflare Dashboard** → R2 → Your Bucket
2. Enable **Public Access Settings**
3. Add **Custom Domain** (e.g., music.your-domain.com)
4. Go to **Cloudflare Workers** → Create Worker
5. Paste the code from `cloudflare-worker-security.js`
6. Deploy and route to your R2 domain

### Option 2: Enable Cloudflare Access Rules

1. **Cloudflare Dashboard** → Security → WAF
2. Create rules:
   - Block requests with empty referer (except media types)
   - Rate limit: 100 requests/minute per IP
   - Block known bad user agents

### Option 3: Budget Alerts (Important!)

1. **Cloudflare Dashboard** → R2 → Billing
2. Set up **Usage Alerts**:
   - Alert at: **10GB storage** (50% of 20GB before charges)
   - Alert at: **$1 spending**
   - Email notifications enabled

### Option 4: Monitor Usage

**Check R2 Metrics regularly:**
```bash
# View storage size
wrangler r2 bucket info pomodoro-music

# View bandwidth usage
# Go to Cloudflare Dashboard → R2 → Metrics
```

### Cost Protection Features

**Free Tier Limits:**
- ✅ Storage: 10 GB/month (FREE)
- ✅ Class A Operations: 1M/month (FREE) - uploads
- ✅ Class B Operations: 10M/month (FREE) - downloads  
- ✅ Egress: UNLIMITED (FREE)

**What You're Using:**
- Storage: ~2.1 GB (well under 10GB limit)
- Monthly requests: ~50 users × 100 songs × 30 days = 150K (under 10M limit)

### Best Practices

1. **Enable Cloudflare Cache** - Reduces R2 requests dramatically
2. **Set long cache headers** - Files cached for 7 days in browser
3. **Use Referer checking** - Only your domain can embed files
4. **Rate limiting** - Prevent single IP from hammering server
5. **Block bots** - Stop automated scrapers

### Estimated Costs Even WITH Attacks

**Worst case scenario:**
- 1 million bot requests = Still FREE (under 10M Class B operations)
- 100GB bandwidth = Still FREE (unlimited egress)
- Only charge: Storage over 10GB

**You're safe because:**
- ❌ Bots can't upload (no write access)
- ✅ Downloads are FREE
- ✅ R2 designed for this exact use case

### Quick Security Setup (5 minutes)

1. **Update your music URLs to use referrer policy:**
   Already done! Your site uses proper CORS headers.

2. **Set Cache-Control headers:**
   Add this to your R2 bucket settings or Worker (already in worker code).

3. **Enable Cloudflare Bot Fight Mode:**
   - Cloudflare Dashboard → Security → Bots
   - Enable "Bot Fight Mode" (FREE)

4. **Set spending limit:**
   - Cloudflare Dashboard → Billing
   - Set monthly limit: $5 (will stop at limit)

### Monitoring

**Weekly check:**
```bash
# Check storage usage
curl -X GET "https://api.cloudflare.com/client/v4/accounts/YOUR_ACCOUNT_ID/r2/buckets/pomodoro-music/usage" \
  -H "Authorization: Bearer YOUR_API_TOKEN"
```

**Or use Dashboard:**
Cloudflare Dashboard → R2 → pomodoro-music → Metrics

---

## Bottom Line

**You're unlikely to get charged even with attacks because:**
1. ✅ No upload abuse possible (read-only public access)
2. ✅ Bandwidth is FREE (unlimited egress)
3. ✅ 10M read operations/month FREE (you'll use ~150K)
4. ✅ Only storage costs after 10GB (you're using 2.1GB)

**Recommendation:** Just enable **Bot Fight Mode** and set a **spending alert** at $1. You're good to go! 🎉
