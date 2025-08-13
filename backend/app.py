# app.py
from flask import Flask, request, jsonify
from flask_cors import CORS
import os
from scraper.indeed_scraper import scrape_indeed 
from resume_matcher import match_jobs

app = Flask(__name__)
CORS(app)  

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return {"status": "Backend running"}

if __name__ == "__main__":
    app.run(debug=True)
