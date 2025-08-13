from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
import os

load_dotenv()
app = Flask(__name__)

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
# Access database
db = client["job_scraper"]
# Access a collection
saved_jobs_col = db["saved_jobs"]

# Route to save a job
@app.route("/save_job", methods=["POST"])
def save_job():
    data = request.json
    if not data.get("title") or not data.get("company") or not data.get("link") or not data.get("location"):
        return jsonify({"error": "Missing required fields"}), 400

    saved_jobs_col.insert_one(data)
    return jsonify({"message": "Job saved successfully"}), 201

# Route to fetch all saved jobs
@app.route("/get_saved_jobs", methods=["GET"])
def get_saved_jobs():
    jobs = list(saved_jobs_col.find({}, {"_id": 0}))
    return jsonify(jobs)

if __name__ == "__main__":
    app.run(debug=True)
