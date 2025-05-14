# StellarPay Build Guide (Cursor IDE)

### 🧠 GOAL:

Build a Stellar-based micro-subscription platform where users pay per content (article, video, tutorial) using XLM or fiat (Stripe), with instant unlock and dashboards for users & creators.

---

## 🧱 Phase 1: Project Setup

### 1.1. Initialize the Project

- `npx create-react-app stellarpay --template typescript`
- Install Tailwind CSS:
    
    `npm install -D tailwindcss postcss autoprefixer`
    
    `npx tailwindcss init -p`
    

### 1.2. Set up Folder Structure

```
bash
CopierModifier
/frontend
  /components
  /pages
  /hooks
  /utils
/backend
  /controllers
  /routes
  /models
  /services
  server.ts

```

---

## 🌐 Phase 2: Frontend Implementation (React + Tailwind)

### 2.1. Design Core Pages

- [ ]  `Home.tsx` → Browse content, show preview + "Pay to Unlock" CTA
- [ ]  `Content.tsx` → Locked/unlocked view
- [ ]  `UserDashboard.tsx` → Purchases, wallet balance, history
- [ ]  `CreatorDashboard.tsx` → Uploads, earnings, set price

### 2.2. Implement UI/UX

- Tailwind styling: mobile-first, clean UI
- Modal for payment (XLM/card toggle)
- Auth (magic link/email)

---

## 🛠️ Phase 3: Backend Setup (Supabase or Node.js/Express)

### 3.1. User Auth + DB Models

- `User`: email, wallet_address, role
- `Content`: title, price, file_url, creator_id
- `Transaction`: user_id, content_id, payment_method, amount, timestamp

### 3.2. API Endpoints

- `POST /create-wallet`
- `POST /fund-wallet`
- `POST /purchase`
- `GET /user-content`
- `POST /upload-content`
- `GET /creator-stats`

---

## 💸 Phase 4: Stellar Wallet Integration

### 4.1. Wallet SDK (Frontend)

- Use `@stellar-sdk` to:
    - Generate keypair at sign-up
    - Check wallet balance
    - Sign/send payment transaction

### 4.2. Horizon API (Backend)

- Call Horizon to confirm transaction success before unlocking content.
- Store all payment receipts.

### 4.3. Fiat Integration

- Set up Stripe account
- Use Stellar anchor or convert via backend:
    - `stripe → USD → backend → XLM → Stellar wallet`

---

## ⚙️ Phase 5: Core Functionality

### 5.1. Pay-to-Unlock Flow

- User clicks "Pay to Unlock"
- Choose XLM or Card
- If XLM → sign/send via Stellar SDK
- If Card → Stripe checkout → backend swaps to XLM
- Confirm tx via Horizon
- Mark content as unlocked

### 5.2. Creator Dashboard

- Upload content
- Set price (XLM or fiat equivalent)
- View real-time stats: earnings, clicks, views
- Withdraw balance

---

## 🔐 Phase 6: Security & Access

### 6.1. Secure All Endpoints

- Use Supabase Auth JWT or custom token middleware
- Use HTTPS on deployment
- Encrypt private keys (never expose secret keys to frontend)

### 6.2. Access Control

- Role-based access (user vs creator)
- Only paid users can view unlocked content

---

## 🤖 Phase 7: Optional AI Features

### 7.1. Content Recommendation Engine

- Use `scikit-learn` or `TensorFlow.js`
- Recommend similar content after unlock based on tags/purchases

### 7.2. Chatbot Assistant

- Integrate Dialogflow or Botpress
- Handle onboarding, help, payment queries

---

## 🧪 Phase 8: Testing & Demo

### 8.1. Functional Test Checklist

- [ ]  Create wallet
- [ ]  Fund wallet (fiat or XLM)
- [ ]  Buy content with XLM
- [ ]  Buy content with Card
- [ ]  Unlock + view content
- [ ]  Creator receives payment

### 8.2. Hackathon KPIs

- ✅ Live transaction logs
- ✅ Instant unlock after payment
- ✅ Creator upload + pricing
- ✅ User dashboard

---

## 🧨 Bonus Add-ons (Time-Permitting)

- NFT-gated access via Stellar’s Soroban smart contracts
- Loyalty token (bonus XLM)
- Push notifications for new content
- React Native mobile app