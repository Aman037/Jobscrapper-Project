from flask import Flask, request, jsonify
from pymongo import MongoClient
from dotenv import load_dotenv
from pymongo.errors import DuplicateKeyError
import os

load_dotenv()
app = Flask(__name__)

uri = os.getenv("MONGO_URI")
client = MongoClient(uri)
# Access database
db = client["job_scraper"]
# Access a collection
saved_jobs_col = db["saved_jobs"]
users_col = db["users"]
jobs_col = db["jobs"]  # scraped jobs collection

# Test job insert (prevents duplicates)
@app.route("/add_job", methods=["POST"])
def add_job():
    job_data = request.json
    if not all(k in job_data for k in ("title", "company", "location", "link")):
        return jsonify({"error": "Missing required job fields"}), 400

    try:
        jobs_col.insert_one(job_data)
        return jsonify({"message": "Job added successfully"}), 201
    except DuplicateKeyError:
        return jsonify({"message": "Duplicate job skipped"}), 200

# Match jobs to user preferences
@app.route("/get_jobs", methods=["GET"])
def get_jobs():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email is required"}), 400

    # Fetch user preferences
    user = users_col.find_one({"email": email})
    if not user or "preferences" not in user:
        return jsonify({"error": "User preferences not found"}), 404

    prefs = user["preferences"]

    # Build MongoDB filter dynamically
    query = {}
    if "role" in prefs:
        query["title"] = {"$regex": prefs["role"], "$options": "i"}
    if "location" in prefs:
        query["location"] = {"$regex": prefs["location"], "$options": "i"}

    matched_jobs = list(jobs_col.find(query, {"_id": 0}))
    return jsonify(matched_jobs)

# Route to save a job
@app.route("/save_job", methods=["POST"])
def save_job():
    data = request.json
    email = data.get("email")
    title = data.get("title")
    company = data.get("company")
    link = data.get("link")
    location = data.get("location")
    
    if not email or not title or not company or not link or not location:
        return jsonify({"error": "Missing required fields"}), 400

    job_data = {
        "email": email,
        "title": data.get("title"),
        "company": data.get("company"),
        "link": data.get("link"),
        "location": data.get("location")
    }
    saved_jobs_col.insert_one(job_data)
    return jsonify({"message": "Job saved successfully"}), 201

# Route to fetch all saved jobs based on user email
@app.route("/get_saved_jobs", methods=["GET"])
def get_saved_jobs():
    email = request.args.get("email")
    if not email:
        return jsonify({"error": "Email query parameter is required"}), 400

    jobs = list(saved_jobs_col.find({"email": email}, {"_id": 0, "email": 0}))
    return jsonify(jobs) if jobs else jsonify({"message": "No jobs found"}), 200

# set_preferences route
@app.route("/set_preferences", methods=["POST"])
def set_preferences():
    data = request.json
    email = data.get("email")
    preferences = data.get("preferences")  # e.g. {"role": "Python Developer", "location": "Remote"}

    if not email or not preferences:
        return jsonify({"error": "Email and preferences are required"}), 400

    users_col.update_one(
        {"email": email},
        {"$set": {"preferences": preferences}},
        upsert=True  #Insert the document if it doesn't exist
    )

    return jsonify({"message": "Preferences saved successfully"}), 201

if __name__ == "__main__":
    jobs_col.create_index("link", unique=True)
    app.run(debug=True)
