import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { patchUrlMappings } from '@discord/embedded-app-sdk'
import './index.css'
import App from './App.tsx'

// Configure Discord proxy URL mappings for external requests
// This allows requests to Supabase to bypass CSP restrictions
patchUrlMappings([
  {
    prefix: '/supabase',
    target: 'btjhclvebbtjxmdnprwz.supabase.co'
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
