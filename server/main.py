from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.staticfiles import StaticFiles
from fastapi.middleware.cors import CORSMiddleware
from generate_subtitles import generate_subtitles
import shutil
import os

app = FastAPI()

# Enable CORS for frontend communication
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, specify the frontend domain
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "upload"
SUBTITLE_DIR = "subtitle"

# Ensure directories exist
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(SUBTITLE_DIR, exist_ok=True)

# Mount the subtitle directory to serve static files
app.mount("/subtitles", StaticFiles(directory=SUBTITLE_DIR), name="subtitles")

@app.get("/")
def read_root():
    return {"message": "Caption Generator API is running"}

@app.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    try:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        
        # Save the uploaded file
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
            
        # Generate subtitles
        # This is a synchronous call, might block the event loop for a long time.
        # Ideally, this should be run in a background task, but for simplicity here we keep it direct.
        # If the file is large, the client will timeout. 
        # But this matches the user request "backend will generate... and send those file to frontend"
        generated_files = generate_subtitles(file_path)
        
        # Construct download URLs
        download_links = {}
        base_url = "http://localhost:8000/subtitles" # Assuming default port
        
        for lang_name, filename in generated_files.items():
            download_links[lang_name] = f"{base_url}/{filename}"
            
        return {
            "message": "Subtitles generated successfully",
            "filename": file.filename,
            "download_links": download_links
        }
        
    except Exception as e:
        import traceback
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=str(e))
