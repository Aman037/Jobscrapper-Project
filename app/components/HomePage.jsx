import React from 'react';
import { Search, UploadCloud, Briefcase, DollarSign, MapPin } from 'lucide-react';

const HomePage = ({ jobPreferences, setJobPreferences, resumeFile, setResumeFile, fetchJobs, uploadResume }) => {
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setJobPreferences((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setResumeFile(e.target.files[0]);
  };

  const handleSearch = () => {
    if (jobPreferences.title) {
      fetchJobs(jobPreferences);
    } else {
      alert("Please enter a job title or keywords to search.");
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-100 rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-800 text-center mb-6 leading-tight">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Find Your Next Great Opportunity</span>
      </h2>
      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-8 border-t-4 border-purple-500 transform hover:scale-[1.01] transition-transform duration-500">
        <h3 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
          <Search className="text-purple-500"/>
          Job Preferences
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="flex flex-col items-start space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400"/> Job Title / Keywords
            </label>
            <input
              type="text"
              name="title"
              value={jobPreferences.title}
              onChange={handleFormChange}
              placeholder="e.g., 'Software Engineer'"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-gray-700"
            />
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <MapPin className="w-4 h-4 text-purple-400"/> Location
            </label>
            <select
              name="location"
              value={jobPreferences.location}
              onChange={handleFormChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-gray-700"
            >
              <option value="Remote">Remote</option>
              <option value="On-Site">On-Site</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-purple-400"/> Job Type
            </label>
            <select
              name="jobType"
              value={jobPreferences.jobType}
              onChange={handleFormChange}
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-gray-700"
            >
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Internship">Internship</option>
            </select>
          </div>
          <div className="flex flex-col items-start space-y-2">
            <label className="text-sm font-semibold text-gray-600 flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-purple-400"/> Min. Salary
            </label>
            <input
              type="number"
              name="salary"
              value={jobPreferences.salary}
              onChange={handleFormChange}
              min="0"
              className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 focus:border-purple-500 transition-all duration-300 text-gray-700"
            />
          </div>
        </div>
        <button
          onClick={handleSearch}
          className="w-full cursor-pointer py-4 px-6 bg-gradient-to-r from-pink-500 to-red-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-500 transform hover:scale-105 hover:animate-pulse flex items-center justify-center gap-3"
        >
          <Search className="w-6 h-6" />
          Search Jobs
        </button>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl shadow-xl space-y-6 border-t-4 border-indigo-500 transform hover:scale-[1.01] transition-transform duration-500">
        <h3 className="text-2xl font-bold text-gray-700 flex items-center gap-3">
          <UploadCloud className="text-indigo-500"/>
          Upload Your Resume
        </h3>
        <div className="flex flex-col items-center p-8 border-4 border-dashed border-indigo-300 rounded-3xl transition-all duration-300 hover:border-indigo-500 hover:bg-indigo-50">
          <UploadCloud className="w-16 h-16 text-indigo-400 mb-4 animate-bounce-slow" />
          <p className="text-base text-gray-500 mb-4 text-center">Drag & drop your file or click to upload.</p>
          <input
            type="file"
            accept=".pdf,.doc,.docx"
            onChange={handleFileChange}
            className="hidden"
            id="resume-upload"
          />
          <label
            htmlFor="resume-upload"
            className="py-3 px-6 bg-indigo-500 text-white font-bold rounded-full hover:bg-indigo-600 transition-colors cursor-pointer shadow-md"
          >
            Choose File
          </label>
          {resumeFile && (
            <p className="mt-4 resume text-sm text-green-600 font-medium animate-fade-in-down">File selected: {resumeFile.name}</p>
          )}
          <button
            onClick={() => resumeFile && uploadResume(resumeFile)}
            disabled={!resumeFile}
            className={`mt-6 w-full cursor-pointer py-3 px-6 font-bold rounded-2xl shadow-lg transition-all duration-300 ${!resumeFile ? 'bg-gray-400 text-gray-600 cursor-not-allowed' : 'bg-green-500 text-white hover:bg-green-600 transform hover:scale-105'}`}
          >
            Upload
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;