# Caption Generator 🎥📝

A powerful, modular web application for automatically generating and translating subtitles for video and audio files.

This application accepts media uploads, uses OpenAI's Whisper model for accurate speech-to-text transcription, and then translates the content into multiple languages, providing downloadable SRT files for each.

## 🌟 Features

*   **Easy Uploads**: Drag and drop support for video (`.mp4`, `.avi`, etc.) and audio (`.mp3`, `.wav`) files.
*   **Automatic Transcription**: Powered by OpenAI's Whisper AI for high-accuracy speech recognition.
*   **Multi-Language Translation**: Automatically translates generated subtitles into:
    *   🇺🇸 **English**
    *   🇪🇸 **Spanish**
    *   🇮🇳 **Hindi**
    *   🇮🇳 **Gujarati**
*   **Downloadable Subtitles**: Generates industry-standard `.srt` files ready for use with any media player or YouTube.
*   **Modern UI**: Sleek, dark-themed interface built with React and Tailwind-like styling.

## 🛠️ Tech Stack

### Frontend (Client)
*   **React**: modern UI library for building interactive interfaces.
*   **Vite**: Next-generation frontend tooling for fast builds.
*   **TypeScript**: Ensures type safety and better developer experience.
*   **Lucide React**: Beautiful, consistent icons.

### Backend (Server)
*   **FastAPI**: High-performance web framework for building APIs with Python.
*   **OpenAI Whisper**: Robust speech recognition model.
*   **Deep Translator**: Google Translate integration for multi-language support.
*   **FFmpeg**: Handling media processing.

## 🚀 Getting Started

### Prerequisites
*   **Python 3.8+**
*   **Node.js 16+**
*   **FFmpeg**: Must be installed and available in your system's PATH.

### Installation & Running

#### 1. Backend Setup
Navigate to the `server` directory:

```bash
cd server
```

Install dependencies:
```bash
pip install -r requirements.txt
```

Run the server:
```bash
# Windows
run_server.bat
# Or manually:
uvicorn main:app --reload
```
The server runs on `http://localhost:8000`.

#### 2. Frontend Setup
Navigate to the `client` directory:

```bash
cd client
```

Install dependencies:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```
The client runs on `http://localhost:5173`.

## 📦 How to Use

1.  Open the web application in your browser.
2.  File the upload area or click to select a video/audio file.
3.  Click "Generate Subtitles".
4.  Wait for the processing to complete (upload -> transcode -> transcribe -> translate).
5.  Download the generated SRT files for your desired languages.

## 📝 License
This project is open-source and available for educational purposes.
