/**
 * Cloudflare Worker for R2 Security
 * Deploy this to protect your music files from hotlinking and abuse
 */

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    
    // 1. Referer check - only allow requests from your domain
    const referer = request.headers.get('Referer');
    const allowedDomains = [
      'pomodoro-project-psi.vercel.app',
      'localhost',
      '127.0.0.1'
    ];
    
    // Allow if referer is from your domain or direct browser access (empty referer for media)
    const isAllowedReferer = !referer || allowedDomains.some(domain => 
      referer.includes(domain)
    );
    
    if (!isAllowedReferer) {
      return new Response('Forbidden', { status: 403 });
    }
    
    // 2. Rate limiting - max 100 requests per minute per IP
    const clientIP = request.headers.get('CF-Connecting-IP');
    const rateLimitKey = `rate_limit:${clientIP}`;
    
    // Use Cloudflare KV for rate limiting (optional, requires KV namespace)
    // const count = await env.RATE_LIMIT.get(rateLimitKey) || 0;
    // if (count > 100) {
    //   return new Response('Rate limit exceeded', { status: 429 });
    // }
    // await env.RATE_LIMIT.put(rateLimitKey, count + 1, { expirationTtl: 60 });
    
    // 3. Block common bot user agents
    const userAgent = request.headers.get('User-Agent') || '';
    const botPatterns = [
      'bot', 'crawler', 'spider', 'scraper', 
      'curl', 'wget', 'python-requests'
    ];
    
    const isBot = botPatterns.some(pattern => 
      userAgent.toLowerCase().includes(pattern)
    );
    
    // Allow legitimate search engine bots but block scrapers
    const allowedBots = ['googlebot', 'bingbot'];
    const isAllowedBot = allowedBots.some(bot => 
      userAgent.toLowerCase().includes(bot)
    );
    
    if (isBot && !isAllowedBot) {
      return new Response('Forbidden', { status: 403 });
    }
    
    // 4. Only allow GET/HEAD requests
    if (request.method !== 'GET' && request.method !== 'HEAD') {
      return new Response('Method not allowed', { status: 405 });
    }
    
    // 5. Add cache headers to reduce R2 requests
    const response = await fetch(request);
    const newResponse = new Response(response.body, response);
    
    // Cache for 1 week
    newResponse.headers.set('Cache-Control', 'public, max-age=604800');
    newResponse.headers.set('Access-Control-Allow-Origin', 
      referer ? new URL(referer).origin : '*'
    );
    
    return newResponse;
  }
};
