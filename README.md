# Crona - Blockchain-Powered Micropayments for Digital Content

Crona is a decentralized micropayments platform that enables creators to monetize their digital content through the Stellar blockchain network. Users can purchase access to premium articles, videos, and other digital assets using XLM tokens with minimal transaction fees and instant settlements.

## 🎥 Demo & Technical Overview

Watch our platform in action and learn about the technical architecture:

[![Demo Video](https://img.youtube.com/vi/Fk4SLvoFCq4/0.jpg)](https://youtu.be/Fk4SLvoFCq4)
### [▶️ Watch Demo](https://youtu.be/Fk4SLvoFCq4)
*A quick walkthrough of Crona's features and user experience*
---
[![Technical Overview](https://img.youtube.com/vi/UbGeQpvc7b0/0.jpg)](https://youtu.be/UbGeQpvc7b0)
### [▶️ Watch Technical Deep Dive](https://youtu.be/UbGeQpvc7b0)
*Detailed explanation of our architecture and technical implementation*



## 📸 UI Screenshots

### Landing Page
![Landing Page](https://github.com/RiyadSc/Crona-Consensus/blob/main/public/screencapture-localhost-8080-2025-05-16-14_26_44.png?raw=true)
*The welcoming landing page showcasing Crona's main features and value proposition*

### Content Marketplace
![Content Browser](https://github.com/RiyadSc/Crona-Consensus/blob/main/public/screencapture-localhost-8080-browse-2025-05-16-14_27_16.png?raw=true)
*Browse through a diverse collection of premium digital content*

### User Dashboard
![Dashboard](https://github.com/RiyadSc/Crona-Consensus/blob/main/public/screencapture-localhost-8080-dashboard-2025-05-16-14_28_11.png?raw=true)
*Manage your purchased content and account settings in the user dashboard*

These screenshots provide a visual overview of Crona's clean, intuitive interface and key features. The platform combines modern design with powerful functionality to deliver a seamless user experience for both creators and consumers of digital content.

## 🚀 Features

- **Micropayments**: Pay as little as $0.05 to unlock premium content
- **Blockchain Integration**: Powered by Stellar for fast, low-cost transactions
- **Wallet Management**: Create or connect existing Stellar wallets
- **Content Marketplace**: Browse and purchase digital content from creators
- **Creator Dashboard**: Upload and monetize your content
- **User Library**: Access all purchased content in one place

## 🛠️ Technology Stack

- **Frontend**: React, TypeScript, Vite
- **UI**: shadcn/ui, Tailwind CSS
- **Blockchain**: Stellar Network (via stellar-sdk)
- **Authentication**: PasskeyKit for secure wallet management
- **Backend**: Supabase for data storage
- **State Management**: React Context API, TanStack Query

## 📋 Prerequisites

- Node.js (18.x or higher)
- npm or yarn
- A Stellar wallet for testing (optional)

## 🔧 Installation & Setup

1. Clone the repository
```bash
git clone <your-repo-url>
cd consensus
```

2. Install dependencies
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_RPC_URL=https://soroban-testnet.stellar.org
VITE_NETWORK_PASSPHRASE="Test SDF Network ; September 2015"
VITE_WALLET_WASM_HASH=your_wallet_wasm_hash
VITE_LAUNCHTUBE_URL=your_launchtube_url
VITE_LAUNCHTUBE_JWT=your_launchtube_jwt
```

4. Start the development server
```bash
npm run dev
```

5. Build for production
```bash
npm run build
```

## 🔍 Usage

### For Users

1. Visit the homepage and connect or create a Stellar wallet
2. Browse through available content in the marketplace
3. Purchase content using XLM tokens
4. Access your purchased content in the user dashboard

### For Creators

1. Sign up as a creator
2. Upload your premium content (articles, videos, courses)
3. Set prices for your content
4. Track earnings and views through the creator dashboard

## 📁 Project Structure

```
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   └── ui/          # shadcn/ui components
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions and configurations
│   │   ├── passkey.ts   # Wallet connection functionality
│   │   ├── supabase.ts  # Database connection
│   │   └── utils.ts     # Helper functions
│   ├── pages/           # Application pages
│   │   ├── ContentView.tsx  # Content viewing page
│   │   ├── DashboardUser.tsx  # User dashboard
│   │   ├── Index.tsx    # Homepage
│   │   └── Landingpage.tsx  # Landing page
│   ├── App.tsx          # Main application component
│   ├── main.tsx         # Application entry point
│   └── index.css        # Global styles
├── .env                 # Environment variables
├── package.json         # Dependencies and scripts
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.js       # Vite configuration
```

## 🔒 Environment Variables

This application requires the following environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_SUPABASE_URL` | URL for your Supabase instance |
| `VITE_SUPABASE_ANON_KEY` | Anonymous API key for Supabase |
| `VITE_RPC_URL` | URL for the Stellar RPC endpoint |
| `VITE_NETWORK_PASSPHRASE` | Network passphrase for Stellar |
| `VITE_WALLET_WASM_HASH` | Hash for the wallet WASM |
| `VITE_LAUNCHTUBE_URL` | URL for Launchtube service |
| `VITE_LAUNCHTUBE_JWT` | JWT for Launchtube authentication |

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgements

- [Stellar Development Foundation](https://www.stellar.org/)
- [shadcn/ui](https://ui.shadcn.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Vite](https://vitejs.dev/)
- [Supabase](https://supabase.io/)

---

Built with ❤️ using the Stellar blockchain
