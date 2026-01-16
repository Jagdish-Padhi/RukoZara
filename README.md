# 🎙️ RukoZara

![Node.js](https://img.shields.io/badge/Node.js-v18%2B-green) ![React](https://img.shields.io/badge/React-v19-blue) ![Groq](https://img.shields.io/badge/Groq-LLaMA--3.3--70B-purple) ![ElevenLabs](https://img.shields.io/badge/ElevenLabs-TTS-orange)

Voice-based AI mediation: capture two-mic input → analyze with Groq LLaMA 3.3 70B → respond with ElevenLabs TTS. Real-time conflict resolution with natural Indian English voice output.

---

## 🔗 Quick Links (For Real experience)


|                      🚀 Live Demo                      |              🎥 Video Walkthrough               |                                           📊 Presentation                                           |
| :---------------------------------------------------: | :--------------------------------------------: | :------------------------------------------------------------------------------------------------: |
| [**Launch App**](https://frontend-wvdt.onrender.com/) | [**Watch Demo**](https://youtu.be/JTfW0U44ak0) | [**View PPT**](https://drive.google.com/file/d/1zxytV0PYG64SY2SNxegDR8UhI3cJml9J/view?usp=sharing) |

---

## 🏗️ Architecture



---

## 🛠️ Tech Stack

| Layer        | Technology                                   |
| ------------ | -------------------------------------------- |
| **Frontend** | React 18, Vite, TailwindCSS, React Router v6 |
| **Backend**  | Node.js, Express.js, REST API                |
| **Database** | PostgreSQL, Plain SQL without ORM            |
| **Auth**     | JWT (Access + Refresh Tokens), bcrypt        |
| **State**    | React Context API                            |
| **Icons**    | Lucide React                                 |

## ⚡ Key Features

- Dual microphone voice capture with real-time transcription
- Groq Mixtral-8x7b for contextual mediation
- ElevenLabs TTS with en-IN locale
- Keyword-based emotion detection
- Avatar animation synced to audio
- MVC backend architecture

## 📁 Project Structure

```
RukoZara/
├── README.md
├── Backend/
│   ├── .env                    # API keys (GROQ_API_KEY, ELEVENLABS_API_KEY)
│   ├── package.json
│   └── src/
│       ├── index.js            # Entry point - loads env vars, starts server
│       ├── app.js              # Express setup - CORS, JSON, route mounting
│       ├── controllers/
│       │   └── ai.controller.js        # HTTP handlers: health, analyze, tts
│       ├── routes/
│       │   └── ai.route.js             # API endpoint definitions
│       ├── services/
│       │   ├── conversation.service.js # Core mediation logic
│       │   ├── groq.service.js         # Groq LLM API integration
│       │   └── tts.service.js          # ElevenLabs TTS integration
│       └── utils/
│           └── tone.js                 # Emotion detection via keywords
└── Frontend/
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx            # React entry point
        ├── App.jsx             # Main component with voice flow
        ├── index.css           # Global typography + gradients
        └── styles/
            └── global.css      # Component styles (cards, buttons, avatar)
```



---


## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js:** Version 18 or higher ([Download](https://nodejs.org/))
- **Groq API Key:** Free tier with ~9000 requests/minute ([Get key](https://console.groq.com))

- **ElevenLabs API key** (free tier: elevenlabs.io)
- Chrome/Edge browser (Web Speech API)
   ```bash
   git clone https://github.com/yourusername/RukoZara.git
   cd RukoZara
   ```

2. **Install backend dependencies:**
   ```bash
   cd Backend
   npm install
   ```

3. **Install frontend dependencies:**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Configure environment variables:**
   
   Create `Backend/.env` file:
   ```env
   PORT=5000
   GROQ_API_KEY=your_groq_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

  

### 🏃‍♂️ Running the Application

1. **Start the backend server:**
   ```bash
   cd Backend
   npm start
   # Server runs on http://localhost:5000
   ```

2. **Start the frontend development server:**
   ```bash
   cd Frontend
   npm run dev
   # Frontend runs on http://localhost:5174 (or 5173)
   ```

3. **Open in Chrome/Edge:**
   - Navigate to `http://localhost:5174`
   - Allow microphone permissions when prompted

---


## 🚧 Future Enhancements

### 🎯 Stage 2: Intelligence Upgrades
- **RAG Integration:** Upload psychology/mediation PDFs and query with context
- **HuggingFace Models:** Local sentiment analysis (no API calls)
- **Toxicity Detection:** Flag harmful language before mediation
- **Multi-language Support:** Hindi, Tamil, Telugu transcription + TTS

### 📊 Stage 3: Data & Analytics
- **MongoDB Integration:** Store conversation history and outcomes
- **User Accounts:** Track mediation sessions per user
- **Analytics Dashboard:** Visualize conflict patterns over time
- **Success Metrics:** Track resolution rate and user satisfaction

### 🎨 Stage 4: UX Improvements
- **Mobile App:** React Native version with offline mode
- **Video Input:** Analyze facial expressions + tone
- **Live Session Mode:** Real-time mediation during ongoing conversations
- **Export Transcripts:** Download conversation + mediation advice

---



### Tech Stack
- Frontend: React 19, Vite, Tailwind (CDN)
- Backend: Node.js 18, Express 5
- AI: Groq LLaMA 3.3 70B, ElevenLabs TTS



---

**Contact:** code369decode@gmail.com