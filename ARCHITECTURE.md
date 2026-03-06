# CLIC Ethiopia - Architecture Overview

This document outlines the technical architecture of the CLIC Ethiopia website, a React-based single-page application (SPA) designed to educate and engage users about the organization's mission.

## Tech Stack

-   **Frontend Framework**: React 18+ (TypeScript)
    -   **State Management**: React Hooks (`useState`, `useEffect`, `useRef`)
    -   **Routing**: Client-side routing (via `react-router-dom` if needed, currently single-page scroll)
    -   **Animations**: `framer-motion` (Motion) for smooth transitions and interactive elements.
-   **Styling**: Tailwind CSS (Utility-first CSS framework)
    -   **Icons**: `lucide-react` for consistent iconography.
    -   **Typography**: Google Fonts (Inter, Playfair Display).
-   **AI Integration**: Google GenAI SDK (`@google/genai`)
    -   **Model**: Gemini 3.1 Pro Preview (`gemini-3.1-pro-preview`)
    -   **Functionality**: Chatbot ("Prof. Fad") with context-aware responses.
-   **Build Tool**: Vite (Fast development server and optimized production builds)
-   **Deployment**: Netlify (Static site hosting with serverless functions if needed)

## Project Structure

```
/
├── public/              # Static assets (images, favicon, etc.)
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ChatBot.tsx  # AI Chatbot component
│   │   └── ...          # Other components (Navbar, Hero, About, etc.)
│   ├── App.tsx          # Main application component (Routing & Layout)
│   ├── main.tsx         # Application entry point
│   ├── index.css        # Global styles & Tailwind directives
│   └── vite-env.d.ts    # Vite environment type definitions
├── .env                 # Environment variables (API keys)
├── .gitignore           # Git ignore rules
├── index.html           # HTML entry point
├── netlify.toml         # Netlify configuration
├── package.json         # Dependencies and scripts
├── postcss.config.js    # PostCSS configuration
├── tailwind.config.js   # Tailwind CSS configuration
├── tsconfig.json        # TypeScript configuration
└── vite.config.ts       # Vite configuration
```

## Key Components

### 1. App.tsx (Main Layout)
-   Orchestrates the overall layout, including the `Navbar`, `Footer`, and main content sections (`Hero`, `About`, `SteamSection`, `IESection`, `Labs`, `Projects`, `Donate`, `Register`).
-   Manages global state for modals and navigation.
-   Integrates the `ChatBot` component as a persistent floating element.

### 2. ChatBot.tsx (AI Integration)
-   **State**: Manages chat history, input value, loading state, and visibility (`isOpen`).
-   **AI Interaction**: Uses the Google GenAI SDK to communicate with the Gemini API.
    -   **System Instruction**: Defines the persona ("Prof. Fad") and knowledge base (CLIC mission, STEAM-IE, Labs, Projects).
    -   **History Management**: Maintains conversation context for coherent multi-turn dialogue.
-   **UI**: Features a collapsible chat window, suggestion chips, and mobile-friendly quick actions.

### 3. InfoModal (Reusable Modal)
-   Displays detailed information about specific cards (STEAM fields, Labs, Projects).
-   Uses `AnimatePresence` for smooth open/close animations.
-   Rendered conditionally based on user interaction.

## Data Flow

1.  **User Interaction**: Users interact with the UI (clicking cards, typing in chat).
2.  **State Updates**: React state updates trigger re-renders (e.g., opening a modal, updating chat messages).
3.  **API Calls (Chatbot)**:
    -   User sends a message.
    -   `ChatBot` component constructs a request with history and system instructions.
    -   Request is sent to Google Gemini API.
    -   Response is received and added to the chat history.
4.  **Rendering**: The UI updates to display the new state (modal content, chat response).

## Styling Strategy

-   **Tailwind CSS**: Used extensively for layout, spacing, typography, and colors.
-   **Custom Theme**: Defined in `tailwind.config.js` (or `index.css` via `@theme`) to match CLIC Ethiopia's brand colors (Red, Orange, Green, Blue, Purple).
-   **Responsiveness**: Mobile-first design principles ensure the site looks great on all devices.
-   **Animations**: `framer-motion` adds polish with entrance animations and interactive feedback.

## Deployment Architecture (Netlify)

-   **Source**: GitHub Repository.
-   **Build Process**: Netlify automatically detects changes, runs `npm install`, and then `npm run build`.
-   **Output**: The build process generates static files in the `dist/` directory.
-   **Hosting**: Netlify serves the static files from its global CDN.
-   **Configuration**: `netlify.toml` specifies build commands, publish directory, and redirect rules for SPA routing.
-   **Environment Variables**: Sensitive keys (like `GEMINI_API_KEY`) are stored securely in Netlify's environment variables settings, not in the codebase.
