# FounderGPT - Complete Platform Architecture

## System Overview

```
┌─────────────────────────────────────────────────────────────────┐
│                      FounderGPT Platform                          │
│                     Full Stack Application                         │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────────────┐
│   FRONTEND (React + TypeScript)      │
│   http://localhost:8081              │
├──────────────────────────────┤
│ Pages:                       │
│  ✅ Landing (/                        │
│  ✅ Login (/login)                    │
│  ✅ Register (/register)              │
│  ✅ Dashboard (/dashboard) - PROTECTED
│  ✅ Profile (/profile) - PROTECTED    │
│  ✅ About (/about)                    │
│                              │
│ Features:                    │
│  ✅ User Authentication      │
│  ✅ JWT Token Storage        │
│  ✅ 10 AI Analysis Modules   │
│  ✅ Responsive Design        │
│  ✅ Protected Routes         │
└──────────────────────────────┘
           ▼ API Calls
┌──────────────────────────────┐
│  BACKEND (Node.js + Express)          │
│  http://localhost:5000               │
├──────────────────────────────┤
│ Auth Endpoints:              │
│  ✅ POST /api/auth/register  │
│  ✅ POST /api/auth/login     │
│  ✅ GET /api/auth/me         │
│                              │
│ Analysis Endpoints (10):      │
│  ✅ POST /api/analysis/*     │
│                              │
│ Services:                    │
│  ✅ Google Gemini 2.5 Flash  │
│  ✅ OpenAI Integration       │
│  ✅ Rate Limiting            │
│  ✅ Error Handling           │
└──────────────────────────────┘
           ▼ Data Storage
┌──────────────────────────────┐
│    DATABASE LAYER             │
├──────────────────────────────┤
│ Primary: MongoDB (optional)   │
│ Fallback: JSON File Storage   │
│  └─ Backend/data/users.json  │
│                              │
│ Stores:                      │
│  ✅ User Accounts            │
│  ✅ Hashed Passwords         │
│  ✅ Startup Ideas            │
│  ✅ Analysis History         │
└──────────────────────────────┘
           ▼ AI Services
┌──────────────────────────────┐
│   AI & External APIs          │
├──────────────────────────────┤
│ ✅ Google Gemini 2.5 Flash   │
│ ✅ OpenAI API               │
│ ✅ Together AI              │
│                              │
│ Provides:                    │
│  • Market Analysis           │
│  • Competitor Analysis       │
│  • Business Model Generation │
│  • Pitch Deck Creation       │
│  • Financial Projections    │
│  • Risk Assessment           │
│  • Go-to-Market Strategy    │
│  • Tech Stack Recommendations
└──────────────────────────────┘
```

---

## Data Flow - User Registration & Login

```
User Registration Flow:
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Fills registration form
     ▼
┌──────────────────┐
│ Registration     │
│ Page (/register) │
└────┬─────────────┘
     │ 2. Submit: POST /api/auth/register
     ▼
┌──────────────────────────────┐
│ Backend Auth Route           │
│ ✅ Validates email          │
│ ✅ Hashes password          │
│ ✅ Creates user account     │
│ ✅ Generates JWT token      │
└────┬─────────────────────────┘
     │ 3. Response: {token, user}
     ▼
┌──────────────────────────────┐
│ Frontend Storage             │
│ ✅ localStorage.authToken    │
│ ✅ localStorage.currentUser  │
│ ✅ Context: useAuth hook     │
└────┬─────────────────────────┘
     │ 4. Auto-redirect
     ▼
┌──────────────────┐
│ Dashboard        │
│ (Protected)      │
│ ✅ Access granted│
└──────────────────┘

User Login Flow:
┌─────────┐
│  User   │
└────┬────┘
     │ 1. Enter credentials (email, password)
     ▼
┌──────────────┐
│ Login Page   │
│ (/login)     │
└────┬─────────┘
     │ 2. POST /api/auth/login
     ▼
┌────────────────────────────────┐
│ Backend Login Validation        │
│ ✅ Find user by email         │
│ ✅ Verify password            │
│ ✅ Generate JWT token         │
│ ✅ Return user data           │
└────┬───────────────────────────┘
     │ 3. Response: {token, user}
     ▼
┌────────────────────────────────┐
│ Frontend Session Setup          │
│ ✅ Save JWT token             │
│ ✅ Set user in context        │
│ ✅ Enable protected routes    │
└────┬───────────────────────────┘
     │ 4. Auto-redirect
     ▼
┌──────────────────┐
│ Dashboard        │
│ (Analysis Ready) │
└──────────────────┘
```

---

## Startup Analysis Flow

```
User's Startup Idea:
┌──────────────────────────┐
│ Input:                   │
│ • Idea description       │
│ • Industry               │
│ • Target Market          │
│ • Budget (optional)      │
└────┬─────────────────────┘
     │
     ▼ User selects analysis type
┌──────────────────────────────────────┐
│ 10 Available Analyses:                │
│ 1. Market Potential Analysis         │
│ 2. Competitor Intelligence           │
│ 3. Business Model Generation         │
│ 4. Product Roadmap                   │
│ 5. Startup Scoring                   │
│ 6. Investor Pitch Generation         │
│ 7. Tech Stack Recommendations        │
│ 8. Funding Requirements Analysis     │
│ 9. Risk Assessment & SWOT            │
│ 10. Go-to-Market Strategy            │
└────┬─────────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│ Backend Analysis Endpoint            │
│ • Validates input                    │
│ • Checks rate limits                │
│ • Calls appropriate AI service       │
│ • Formats response                   │
└────┬───────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│ AI Services (Gemini 2.5 Flash)      │
│ • Generates insights                │
│ • Provides recommendations          │
│ • Creates actionable strategies     │
└────┬───────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│ Response to Frontend                 │
│ • Analysis results                  │
│ • Metrics & data                    │
│ • Recommendations                   │
│ • Interactive visualizations        │
└────┬───────────────────────────────┘
     │
     ▼
┌────────────────────────────────────┐
│ Dashboard Display                    │
│ ✅ Show analysis in UI              │
│ ✅ Display charts & metrics         │
│ ✅ Allow export to PDF              │
│ ✅ Save to profile                  │
└────────────────────────────────────┘
```

---

## Deployment & Scaling

### Current Setup (Development)
- Frontend: npm run dev (Vite dev server)
- Backend: npm run start (Node.js server)
- Database: JSON file storage

### Production Ready
- Frontend: npm run build → deploy to Vercel/Netlify
- Backend: Docker container → deploy to AWS/Railway
- Database: MongoDB Atlas

---

## Security Features

✅ **Authentication**
- JWT tokens with 7-day expiration
- Password hashing with bcryptjs
- Secure token storage in localStorage

✅ **API Protection**
- Rate limiting: 50 requests per 15 minutes
- CORS enabled for frontend origin only
- Error handling without exposing internals

✅ **Data Protection**
- Passwords never stored in plain text
- Sensitive data excluded from API responses
- Validation on all endpoints

---

## Key Statistics

- **10+ AI Analysis Modules**
- **7 Authenticated Routes**
- **100% TypeScript Frontend**
- **Modern UI with 50+ Components**
- **Full Stack Integration**
- **Production Ready**

---

## Getting Started

1. **Frontend**: `npm run dev` on http://localhost:8081
2. **Backend**: `npm run start` in Backend/ on http://localhost:5000
3. **Register**: Create your first account
4. **Analyze**: Input your startup idea
5. **Get Insights**: Receive AI-powered analysis

---

**Your FounderGPT platform is ready to validate startup ideas! 🚀**
