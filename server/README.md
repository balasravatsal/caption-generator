# FastAPI Backend

This is a simple FastAPI backend for the Video Caption App.

## Prerequisites

- Python 3.8+

## Setup

1. Create a virtual environment:
   ```bash
   python -m venv venv
   ```

2. Activate the virtual environment:
   - Windows: `venv\Scripts\activate`
   - Unix/MacOS: `source venv/bin/activate`

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

## Running the Server

Start the development server with auto-reload:

```bash
uvicorn main:app --reload
```

The server will be available at `http://127.0.0.1:8000`.
Visit `http://127.0.0.1:8000` to see the "Hello World" message.
Visit `http://127.0.0.1:8000/docs` for the interactive API documentation.
