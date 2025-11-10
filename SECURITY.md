# Security Considerations for Discord Activity

## Current Architecture

This application uses Discord OAuth with Supabase's anonymous (anon) key for database access. This is a common pattern for Discord Activities but has security limitations.

## Security Model

### What's Protected:
- ✅ Discord validates user identity via OAuth
- ✅ Authorization codes are single-use and expire quickly
- ✅ Client secrets are stored server-side only
- ✅ Frontend code validates user ownership before operations
- ✅ Discord IDs are immutable and cryptographically secure

### What's NOT Protected:
- ❌ Anyone with the anon key can read all user data
- ❌ Malicious actors could modify data if they bypass frontend checks
- ❌ No server-side validation of user ownership
- ❌ Rate limiting relies on Supabase's defaults

## Data Sensitivity Classification

The data in this app is **LOW SENSITIVITY**:
- Pomodoro session counts and duration
- XP/level/streak statistics
- User settings (volume, preferences)
- Discord username and avatar (already public)

**No sensitive data stored:**
- ❌ No passwords or credentials
- ❌ No payment information
- ❌ No private messages
- ❌ No email addresses or phone numbers

## Acceptable Risk Assessment

For a Discord Activity focused on pomodoro tracking:
- **Risk**: Low - Data is not sensitive and users expect a casual environment
- **Impact**: Low - Worst case is incorrect stats or griefing
- **Likelihood**: Low - Requires technical knowledge and motivation
- **Mitigation**: Easy to reset/restore data if needed

## Recommended Improvements

### Short Term (Easy):
1. **Rate Limiting**: Add Supabase rate limiting on anon key
2. **Input Validation**: Server-side validation via edge functions
3. **Monitoring**: Track unusual access patterns
4. **Backup**: Regular database backups

### Medium Term (Moderate Effort):
1. **Backend Proxy**: Create Express server to proxy Supabase calls
2. **Validation Layer**: Server validates Discord tokens and user ownership
3. **Service Role Key**: Move to service role key server-side

### Long Term (Production-Ready):
1. **Supabase Auth Integration**: Use Supabase Auth with Discord OAuth provider
2. **Proper RLS Policies**: Lock down policies with auth.uid()
3. **API Gateway**: Add authentication layer
4. **Audit Logging**: Track all data modifications

## Security Best Practices Currently Implemented

✅ **Secrets Management**:
- Client secret stored in Supabase edge function secrets
- Never committed to git
- Not exposed to frontend

✅ **OAuth Flow**:
- Proper authorization code exchange
- Server-side token validation
- No refresh tokens stored client-side

✅ **Discord Security**:
- Uses Discord's official SDK
- Validates Discord context (frame_id)
- OAuth scopes limited to necessary permissions

✅ **Data Validation**:
- Frontend validates user owns data
- Discord ID used as primary identifier
- Input sanitization on user-provided fields

## For Production Deployment

If this app scales or stores more sensitive data, **migrate to Option 1 or 2** above.

For the current use case (Discord Activity for pomodoro tracking), the **current security model is acceptable**.

## Security Disclosure

If you discover a security vulnerability, please:
1. Do NOT open a public issue
2. Contact the maintainer directly
3. Allow reasonable time for a fix before disclosure

## References

- [Discord Security Best Practices](https://discord.com/developers/docs/topics/oauth2#oauth2)
- [Supabase Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [OWASP API Security Top 10](https://owasp.org/www-project-api-security/)
