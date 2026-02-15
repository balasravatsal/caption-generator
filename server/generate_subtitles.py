import os
import shutil
import whisper
from deep_translator import GoogleTranslator
from datetime import timedelta

UPLOAD_DIR = "upload"
SUBTITLE_DIR = "subtitle"

TARGET_LANGUAGES = {
    "en": "english",
    "es": "spanish",
    "hi": "hindi",
    "gu": "gujarati"
}

os.makedirs(SUBTITLE_DIR, exist_ok=True)


def format_timestamp(seconds):
    td = timedelta(seconds=seconds)
    total_seconds = int(td.total_seconds())
    millis = int((seconds - total_seconds) * 1000)

    hours = total_seconds // 3600
    minutes = (total_seconds % 3600) // 60
    seconds = total_seconds % 60

    return f"{hours:02}:{minutes:02}:{seconds:02},{millis:03}"


def write_srt(segments, filepath):
    with open(filepath, "w", encoding="utf-8") as f:
        for i, seg in enumerate(segments, start=1):
            f.write(f"{i}\n")
            f.write(
                f"{format_timestamp(seg['start'])} --> "
                f"{format_timestamp(seg['end'])}\n"
            )
            f.write(f"{seg['text'].strip()}\n\n")


def translate_segments(segments, target_lang):
    translator = GoogleTranslator(source="auto", target=target_lang)
    translated = []

    for seg in segments:
        translated_text = translator.translate(seg["text"])
        translated.append({
            "start": seg["start"],
            "end": seg["end"],
            "text": translated_text
        })

    return translated


def generate_subtitles(input_path):
    """
    Generates subtitles for the given input file path.
    Returns a dictionary of language code -> file path.
    """
    if not shutil.which("ffmpeg"):
        raise EnvironmentError("ffmpeg not found in PATH")

    if not os.path.exists(input_path):
        raise FileNotFoundError(f"Input file '{input_path}' not found")

    print(f"🔹 Loading Whisper model for {input_path}...")
    model = whisper.load_model("base")

    print("🔹 Transcribing & detecting language...")
    result = model.transcribe(input_path)

    detected_language = result["language"]
    segments = result["segments"]

    print(f"✅ Detected language: {detected_language}")

    generated_files = {}

    # Original language subtitles
    filename = os.path.basename(input_path)
    base_name = os.path.splitext(filename)[0]
    
    original_srt_name = f"{base_name}_original.srt"
    original_srt_path = os.path.join(SUBTITLE_DIR, original_srt_name)
    
    write_srt(segments, original_srt_path)
    generated_files["original"] = original_srt_name
    print("✅ Original subtitles generated")

    # Translated subtitles
    for lang_code, lang_name in TARGET_LANGUAGES.items():
        print(f"🌍 Generating {lang_name} subtitles...")
        # Note: In a real app, you might want to handle translation errors gracefully
        try:
             translated_segments = translate_segments(segments, lang_code)
             srt_name = f"{base_name}_{lang_name}.srt"
             srt_path = os.path.join(SUBTITLE_DIR, srt_name)
             write_srt(translated_segments, srt_path)
             generated_files[lang_name] = srt_name
        except Exception as e:
            print(f"⚠️ Failed to translate to {lang_name}: {e}")

    print("🎉 All subtitles generated successfully!")
    return generated_files
