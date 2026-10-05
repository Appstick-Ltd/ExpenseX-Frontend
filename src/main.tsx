import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { captureReferralCodeFromUrl } from './utils/referral'

// Immediately capture referral code from URL & sanitize address bar on page load
captureReferralCodeFromUrl();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
