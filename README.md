# FounderGPT

**FounderGPT** is a premier, AI-powered platform designed to provide founders and investors with deep, data-driven startup analysis and validation. Move beyond basic concepts to generate comprehensive business models, 10-year tech roadmaps, and high-velocity go-to-market strategies.

![FounderGPT Screenshot](https://raw.githubusercontent.com/Harsh-Patel-25/FounderGPT/main/public/screenshot.png) *(Note: Placeholder)*

## 🚀 Key Features

- **Market Potential Card:** Bottom-up TAM/SAM/SOM calculations, growth rates, and demographic targeting.
- **Tech Stack Panel:** Senior CTO-level architectural recommendations with phased development scopes.
- **Funding Breakdown:** Detailed burn rate analysis, runway estimation, and team composition planning.
- **Risk Assessment:** Real-time calculated risk scores based on category-specific probability and impact.
- **GTM Strategy:** Actionable 90-day playbooks, acquisition channel analysis, and competitive positioning.
- **Investor Pitch Generator:** Data-backed narratives ready for fundraising.

## 🛠️ Tech Stack

- **Frontend:** React, Vite, TypeScript, Tailwind CSS, Lucide Icons, Radix UI.
- **Backend:** Node.js, Express, Winston Logger.
- **AI Engine:** Multi-provider support (NVIDIA, OpenAI, Google Gemini) with fallback logic.

## 📦 Installation & Setup

### 1. Prerequisites
- [Node.js](https://nodejs.org/) (v16+)
- API Keys for one or more: [NVIDIA AI](https://build.nvidia.com/), [OpenAI](https://platform.openai.com/), or [Google Gemini](https://ai.google.dev/).

### 2. Clone & Install
```bash
git clone https://github.com/Harsh-Patel-25/FounderGPT.git
cd FounderGPT

# Install Frontend dependencies
npm install

# Install Backend dependencies
cd Backend
npm install
cd ..
```

### 3. Environment Configuration

**Frontend:** Create a `.env` file in the root directory:
```env
VITE_API_URL=http://localhost:4999
```

**Backend:** Create a `.env` file in the `Backend/` directory:
```env
PORT=4999
GEMINI_API_KEY=your-key-here
NVIDIA_API_KEY=your-key-here
OPENAI_API_KEY=your-key-here
PREFERRED_AI_SERVICE=nvidia
ALLOW_LOCAL_AI_FALLBACK=true
```

### 4. Running the Application

**Start the Backend:**
```bash
cd Backend
npm run dev
```

**Start the Frontend:**
```bash
# In the root directory
npm run dev
```

The application will be available at `http://localhost:5173`.

## 🔒 Security & Privacy

FounderGPT is designed with security in mind. All API keys are stored locally in `.env` files and are excluded from version control via `.gitignore`. 

## ⚖️ License

MIT License - Copyright (c) 2026 FounderGPT.