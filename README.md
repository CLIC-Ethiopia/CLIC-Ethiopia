# CLIC Ethiopia - Official Website

This is the official website for **CLIC Ethiopia** (Creative Learning in Community), an NGO founded by **Dr. Ir. Frehun Adefris (Prof.)** with the mission to train 1 million Ethiopians in STEAM-IE (Science, Technology, Engineering, Arts, Mathematics, Innovation, and Entrepreneurship) by 2025 EC.

## Features

-   **Interactive Sections**: Detailed information about STEAM-IE, Labs, and Projects with interactive modals.
-   **AI Chatbot (Prof. Fad)**: A "digital twin" of the founder powered by Gemini AI, capable of answering questions about the organization's mission and programs.
-   **Responsive Design**: Fully optimized for mobile, tablet, and desktop devices.
-   **News & Updates**: Integrated YouTube video feed for the latest news.
-   **Founder's Message**: A dedicated section for the founder's vision.

## Tech Stack

-   **Frontend Framework**: React 18+ with TypeScript
-   **Build Tool**: Vite
-   **Styling**: Tailwind CSS
-   **Icons**: Lucide React
-   **Animations**: Motion (Framer Motion)
-   **AI Integration**: Google GenAI SDK (Gemini 3.1 Pro Preview)

## Prerequisites

-   Node.js (v18 or higher)
-   npm (v9 or higher)

## Installation

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/clic-ethiopia.git
    cd clic-ethiopia
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

3.  Set up environment variables:
    -   Copy `.env.example` to `.env`:
        ```bash
        cp .env.example .env
        ```
    -   Add your Gemini API key to `.env`:
        ```env
        GEMINI_API_KEY=your_api_key_here
        ```

## Development

To start the development server:

```bash
npm run dev
```

The application will be available at `http://localhost:3000`.

## Building for Production

To build the application for production:

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Deployment on Netlify

This project is configured for easy deployment on Netlify.

1.  **Push to GitHub**: Ensure your code is pushed to a GitHub repository.
2.  **Connect to Netlify**:
    -   Log in to Netlify and click "Add new site" -> "Import an existing project".
    -   Select GitHub and choose your repository.
3.  **Configure Build Settings**:
    -   **Base directory**: `/` (leave empty)
    -   **Build command**: `npm run build`
    -   **Publish directory**: `dist`
4.  **Environment Variables**:
    -   In the Netlify dashboard for your site, go to **Site settings > Environment variables**.
    -   Add `GEMINI_API_KEY` with your API key value.
5.  **Deploy**: Click "Deploy site".

The `netlify.toml` file included in the repository will automatically handle the build configuration and redirects.

## License

[MIT License](LICENSE)
