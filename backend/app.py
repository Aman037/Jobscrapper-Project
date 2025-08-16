from flask import Flask, request, jsonify
from flask_cors import CORS
from PyPDF2 import PdfReader
import docx2txt
import os
import re
import uuid
from datetime import datetime

app = Flask(__name__)
CORS(app)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# -------------------------------
# Helpers
# -------------------------------
STOPWORDS = {
    "and","the","for","with","from","that","this","your","you","are","was","were","will",
    "a","an","to","in","on","of","by","or","as","at","be","is","it","we","they","our",
    "their","i","me","my","mine","ours","theirs","but","if","so","than","then","there",
    "here","also","etc"
}

def extract_text_from_file(path: str) -> str:
    """Extract text from PDF or DOCX."""
    if path.lower().endswith(".pdf"):
        reader = PdfReader(path)
        text = []
        for page in reader.pages:
            t = page.extract_text() or ""
            text.append(t)
        return "\n".join(text)
    elif path.lower().endswith(".docx"):
        return docx2txt.process(path) or ""
    else:
        raise ValueError("Unsupported file format")

def extract_keywords(text: str):
    """Extract keywords from text (basic)."""
    words = re.findall(r"\b[\w\-]{3,}\b", (text or "").lower())
    return list(set([w for w in words if w not in STOPWORDS]))

def score_match(resume_keywords, job_text: str) -> float:
    """Compute simple keyword overlap percentage."""
    if not resume_keywords:
        return 0.0
    job_keywords = set(extract_keywords(job_text))
    resume_set = set(resume_keywords)
    inter = resume_set & job_keywords
    return round((len(inter) / max(len(resume_set), 1)) * 100, 2)

# -------------------------------
# Scraper Stub (Member 2 will replace this)
# -------------------------------
def scrape_jobs(query: str, location: str = ""):
    """Temporary static data until Member 2 provides real scraper."""
    now = datetime.utcnow().isoformat()
    return [
        {
            "title": f"{query} – Junior",
            "company": "ABC Tech",
            "location": location or "Remote",
            "salary": "₹4-6 LPA",
            "link": "https://example.com/job/1",
            "date_posted": "2 days ago",
            "description": "Looking for Python, Flask, MongoDB, REST APIs",
            "source": "demo",
            "created_at": now
        },
        {
            "title": f"{query} – Internship",
            "company": "XYZ Labs",
            "location": location or "Hybrid",
            "salary": "Stipend",
            "link": "https://example.com/job/2",
            "date_posted": "Today",
            "description": "Intern role with web scraping, BeautifulSoup, Selenium",
            "source": "demo",
            "created_at": now
        }
    ]

# -------------------------------
# Routes
# -------------------------------
@app.route("/health", methods=["GET"])
def health():
    return jsonify({"status": "Backend up", "time": datetime.utcnow().isoformat()})

@app.route("/upload_resume", methods=["POST"])
def upload_resume():
    if "resume" not in request.files:
        return jsonify({"error": "Missing 'resume' file"}), 400

    f = request.files["resume"]
    if f.filename == "":
        return jsonify({"error": "Empty filename"}), 400

    _, ext = os.path.splitext(f.filename)
    if ext.lower() not in [".pdf", ".docx"]:
        return jsonify({"error": "Only PDF and DOCX allowed"}), 400

    stored_name = f"{uuid.uuid4().hex}{ext}"
    path = os.path.join(UPLOAD_DIR, stored_name)
    f.save(path)

    try:
        text = extract_text_from_file(path)
        keywords = extract_keywords(text)
    except Exception as e:
        return jsonify({"error": str(e)}), 500

    return jsonify({
        "resume_id": uuid.uuid4().hex,
        "filename": f.filename,
        "keywords": keywords,
        "text_preview": (text or "").strip()[:500]
    })

@app.route("/get_jobs", methods=["POST"])
def get_jobs():
    data = request.json
    query = data.get("job_title", "Developer")
    location = data.get("location", "Remote")

    try:
        jobs = scrape_jobs(query, location)
    except Exception as e:
        return jsonify({"error": f"Scraper error: {e}"}), 500

    return jsonify({"jobs": jobs})

@app.route("/match_jobs", methods=["POST"])
def match_jobs():
    data = request.json
    resume_text = data.get("resume_text", "")
    resume_keywords = data.get("resume_keywords", extract_keywords(resume_text))
    jobs = data.get("jobs", [])

    matched = []
    for job in jobs:
        job_text = " ".join([
            job.get("title", ""), job.get("description", ""),
            job.get("company", ""), job.get("location", "")
        ])
        job["match_score"] = score_match(resume_keywords, job_text)
        matched.append(job)

    matched.sort(key=lambda x: x["match_score"], reverse=True)
    return jsonify({"resume_keywords": resume_keywords, "matched_jobs": matched})

# -------------------------------
# Run server
# -------------------------------
if __name__ == "__main__":
    app.run(debug=True, port=5000)
