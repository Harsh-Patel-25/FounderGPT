# FounderGPT - Full Setup & Usage Guide

## Current Status ✅

Your FounderGPT platform is now running with complete user authentication!

### What's Running:
- **Frontend**: http://localhost:8081 (React + TypeScript)
- **Backend API**: http://localhost:5000 (Node.js + Express)
- **Auth System**: JWT-based with email/password authentication
- **Database**: JSON file storage (works without MongoDB)

---

## How to Get Started

### 1. Frontend Setup (Already Done ✅)

The frontend is running on port 8081 and includes:
- Public Landing Page (/)
- Registration Page (/register)
- Login Page (/login)
- Protected Dashboard (/dashboard)
- About Page (/about)
- User Profile (/profile)

### 2. Backend Setup (Already Done ✅)

The backend is running on port 5000 with:
- User registration & login endpoints
- JWT token-based authentication
- JSON file database fallback (no MongoDB required)
- Rate limiting
- Error handling

### 3. Create Your First Account

**Option A: Register via Frontend**
1. Go to http://localhost:8081
2. Click "Start Free" or navigate to /register
3. Fill in:
   - Full Name: Your name
   - Email: your@email.com
   - Password: At least 6 characters
   - Confirm Password: Same as above
4. Click "Sign Up"
5. You'll be automatically logged in and redirected to dashboard

**Option B: Use Demo Login**
1. Go to http://localhost:8081/login
2. Click "Demo Login" button
3. Instantly access the dashboard as demo user

### 4. Access Your Dashboard

After login, you'll see the main FounderGPT dashboard with:
- **Overview Tab**: Basic analysis cards
- **Market Potential Tab**: TAM/SAM/SOM analysis
- **Tech Stack Tab**: Technology recommendations
- **Funding Tab**: Funding requirement analysis
- **Risk Tab**: SWOT analysis and risk assessment
- **GTM Tab**: Go-to-market strategy

---

## Backend API Endpoints

### Authentication

**Register**
```bash
POST http://localhost:5000/api/auth/register
Content-Type: application/json

{
  "fullName": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "confirmPassword": "password123"
}
```

**Login**
```bash
POST http://localhost:5000/api/auth/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Get Current User**
```bash
GET http://localhost:5000/api/auth/me
Authorization: Bearer {JWT_TOKEN}
```

### Analysis Endpoints

All analysis endpoints are available at:
- POST /api/analysis/idea - Validate startup idea
- POST /api/analysis/competitor - Analyze competitors
- POST /api/analysis/business-model - Generate business model
- POST /api/analysis/roadmap - Create product roadmap
- POST /api/analysis/pitch - Generate investor pitch
- POST /api/analysis/score - Calculate startup score
- POST /api/analysis/market - Market analysis
- POST /api/analysis/tech-stack - Tech recommendation
- POST /api/analysis/funding - Funding analysis
- POST /api/analysis/risk - Risk assessment
- POST /api/analysis/gtm - Go-to-market strategy

---

## File & Data Storage

### User Data Location
```
Backend/data/users.json
```

This file stores:
- User accounts
- Email addresses
- Hashed passwords (bcryptjs)
- Account creation dates

### Format:
```json
[
  {
    "id": "user-id",
    "fullName": "User Name",
    "email": "user@email.com",
    "password": "$2a$10$...", // bcrypt hash
    "createdAt": "2026-04-03T..."
  }
]
```

---

## How to Get Startup Analysis

### Step 1: Login to Dashboard
- Go to http://localhost:8081
- Register or use demo login

### Step 2: Input Your Startup Idea
- You'll see input fields for:
  - **Startup Idea**: What problem does it solve?
  - **Industry**: Which industry? (e.g., FinTech, SaaS)
  - **Target Market**: Who are the customers?

### Step 3: Select Analysis Type
Choose from 10 different analyses:
1. **Market Analysis** - TAM/SAM/SOM, growth potential, demographics
2. **Competitor Analysis** - Competitive landscape, positioning
3. **Business Model** - Revenue streams, pricing, unit economics
4. **Product Roadmap** - MVP to scale, milestones
5. **Startup Score** - Overall viability scoring
6. **Investor Pitch** - Pitch deck generation
7. **Tech Stack** - Technology recommendations
8. **Funding Analysis** - Financial projections, burn rate
9. **Risk Assessment** - SWOT, success factors
10. **GTM Strategy** - Market entry, 90-day playbook

### Step 4: Get AI-Powered Advice
- The platform uses Google Gemini 2.5 Flash AI
- Responses are instant and data-driven
- Advice includes actionable strategies and metrics

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:5000
```

### Backend (Backend/.env)
```
PORT=5000
NODE_ENV=development

# Database (optional - uses JSON fallback if not configured)
MONGODB_URI=mongodb://localhost:27017/foundergpt

# Authentication
JWT_SECRET=your_jwt_secret_key_here_change_in_production_12345

# AI APIs
GEMINI_API_KEY=AIzaSyC8W_m0TMMLZGuKH-qEWKenfDPi66C7c6U
OPENAI_API_KEY=sk-proj-...

# Server
CORS_ORIGIN=http://localhost:8080
```

---

## Running the Application

### Start Frontend (in project root)
```bash
npm run dev
# Runs on http://localhost:8081
```

### Start Backend (in Backend folder)
```bash
cd Backend
npm run start
# Runs on http://localhost:5000
```

Both servers must be running for the complete application to work.

---

## Troubleshooting

### Issue: "Cannot connect to backend"
- Ensure Backend server is running: `npm run start` in Backend folder
- Check if port 5000 is available
- Verify CORS is enabled in Backend/src/app.js

### Issue: "Passwords do not match"
- Passwords must be identical (case-sensitive)
- Minimum 6 characters required

### Issue: "Email already registered"
- Check Backend/data/users.json
- Edit the file to remove duplicate emails if needed
- Or use a different email address

### Issue: "Invalid token"
- Clear browser localStorage (DevTools > Application > Local Storage > Clear All)
- Login again to get a fresh token

---

## Next Steps

### Immediate Priorities:
1. ✅ Test registration & login flow
2. ✅ Generate startup analyses for your idea
3. ⏳ Save favorite analyses to user profile
4. ⏳ Export analyses as PDF reports
5. ⏳ Add team collaboration features

### Recommended Enhancements:
1. **Email Verification** - Confirm user emails during registration
2. **Password Reset** - Forgot password functionality
3. **MongoDB Setup** - Scale to production database
4. **API Rate Limiting** - Prevent abuse
5. **Analytics Dashboard** - Track user analyses and insights

---

## Architecture Overview

```
FounderGPT
├── Frontend (React + TypeScript)
│   ├── Pages: Landing, Dashboard, Login, Register, Profile, About
│   ├── Components: Analysis cards, navbar, protected routes
│   └── Services: API calls to backend
├── Backend (Node.js + Express)
│   ├── Routes: /api/auth (register, login, me)
│   ├── Routes: /api/analysis (10 AI analysis endpoints)
│   ├── Services: Gemini AI, OpenAI, Together API
│   ├── Models: User (with password hashing)
│   └── Database: JSON file (fallback) or MongoDB
└── Services: Gemini 2.5 Flash AI
```

---

## Support & Documentation

**API Health Check**
```bash
curl http://localhost:5000/api/health
```

**Test User Registration**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "Test User",
    "email": "test@example.com",
    "password": "test123456",
    "confirmPassword": "test123456"
  }'
```

---

## You're All Set! 🚀

Your FounderGPT platform is ready to help founders validate startup ideas with AI-powered analysis. Start by creating an account and exploring the 10 different analysis modules to get comprehensive insights for your startup!

Happy validating! 🎯
