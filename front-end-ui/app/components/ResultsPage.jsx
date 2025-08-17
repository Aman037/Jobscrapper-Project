import React from 'react';
import { Briefcase, ChevronRight, ChevronLeft, CircleDollarSign, CalendarDays, MapPin, Building } from 'lucide-react';

const ResultsPage = ({ jobs, jobsPerPage, resultsPage, setResultsPage, saveJob, applyToJob }) => {
  const totalPages = Math.ceil(jobs.length / jobsPerPage);
  const startIndex = (resultsPage - 1) * jobsPerPage;
  const endIndex = startIndex + jobsPerPage;
  const currentJobs = jobs.slice(startIndex, endIndex);

  const handlePagination = (page) => {
    setResultsPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleApplyClick = (e, job) => {
    e.preventDefault();
    applyToJob(job);
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-100 rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500">Job Results</span>
      </h2>
      <div className="space-y-6">
        {currentJobs.length > 0 ? (
          currentJobs.map((job) => (
            <div key={job.id} className="bg-white p-6 rounded-3xl shadow-xl border border-gray-200 hover:shadow-2xl transition-all duration-500 transform hover:scale-[1.02]">
              <h3 className="text-2xl font-bold text-purple-600 mb-2">
                <a href={job.link} target="_blank" rel="noopener noreferrer" className="hover:underline transition-colors duration-300">{job.title}</a>
              </h3>
              <div className="flex flex-wrap items-center text-gray-600 text-sm mb-4 gap-x-4 gap-y-2">
                <span className="flex items-center gap-1 font-medium"><Building className="w-4 h-4 text-gray-500"/>{job.company}</span>
                <span className="flex items-center gap-1"><MapPin className="w-4 h-4 text-gray-500"/>{job.location}</span>
                <span className="flex items-center gap-1"><CircleDollarSign className="w-4 h-4 text-gray-500"/>{job.salary}</span>
                <span className="flex items-center gap-1"><CalendarDays className="w-4 h-4 text-gray-500"/>{job.date}</span>
              </div>
              <p className="text-gray-700 mb-6 leading-relaxed">{job.description}</p>
              <div className="mt-4 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <button
                  onClick={() => saveJob(job)}
                  className="flex-1 cursor-pointer py-3 px-6 bg-indigo-500 text-white font-bold rounded-full shadow-lg hover:bg-indigo-600 transition-all duration-300 transform hover:scale-105"
                >
                  Save Job
                </button>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => handleApplyClick(e, job)}
                  className="flex-1 py-3 px-6 bg-green-500 text-white font-bold rounded-full text-center shadow-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105"
                >
                  Apply Now
                </a>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-xl text-gray-500 p-10 font-medium">No jobs found. Try a different search!</p>
        )}
      </div>
      
      {totalPages > 1 && (
        <div className="flex justify-center items-center space-x-2 mt-8">
          <button
            onClick={() => handlePagination(resultsPage - 1)}
            disabled={resultsPage === 1}
            className={`p-3 rounded-full transition-colors duration-300 ${resultsPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 text-white cursor-pointer hover:bg-purple-600'}`}
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePagination(index + 1)}
              className={`py-2 px-4 rounded-full cursor-pointer font-bold transition-all duration-300 ${resultsPage === index + 1 ? 'bg-purple-600 text-white shadow-md' : 'bg-gray-300 hover:bg-purple-200 text-gray-700'}`}
            >
              {index + 1}
            </button>
          ))}
          <button
            onClick={() => handlePagination(resultsPage + 1)}
            disabled={resultsPage === totalPages}
            className={`p-3 rounded-full transition-colors duration-300 ${resultsPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-purple-500 cursor-pointer text-white hover:bg-purple-600'}`}
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default ResultsPage;