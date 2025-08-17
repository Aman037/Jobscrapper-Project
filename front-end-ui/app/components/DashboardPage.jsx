import React, { useState } from 'react';
import { Briefcase, Bookmark, CheckSquare } from 'lucide-react';

const DashboardPage = ({ jobs, savedJobs, appliedJobs }) => {
  const [dashboardTab, setDashboardTab] = useState('all');

  const renderJobsList = (jobsToRender) => {
    if (jobsToRender.length === 0) {
      return <p className="text-center text-xl text-gray-500 p-10">No jobs to display in this category.</p>;
    }
    return (
      <div className="space-y-6 mt-6">
        {jobsToRender.map((job) => (
          <div key={job.id} className="bg-white p-6 rounded-3xl shadow-xl border-l-4 border-purple-500 hover:border-indigo-600 transition-all duration-300">
            <h3 className="text-xl font-bold text-gray-800">{job.title}</h3>
            <p className="text-gray-600 text-sm flex items-center gap-2 mt-1">
              <Briefcase className="w-4 h-4 text-gray-500"/>
              {job.company} | {job.location}
            </p>
          </div>
        ))}
      </div>
    );
  };

  const getTabIcon = (tab) => {
    switch(tab) {
      case 'all': return <Briefcase className="w-5 h-5"/>;
      case 'saved': return <Bookmark className="w-5 h-5"/>;
      case 'applied': return <CheckSquare className="w-5 h-5"/>;
      default: return null;
    }
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 bg-gray-100 rounded-3xl shadow-2xl border border-gray-200">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-center leading-tight">
        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Your Dashboard</span>
      </h2>
      
      <div className="flex justify-center flex-wrap gap-3 bg-white p-4 rounded-full shadow-inner">
        <button
          onClick={() => setDashboardTab('all')}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${dashboardTab === 'all' ? 'bg-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          {getTabIcon('all')} All Jobs
        </button>
        <button
          onClick={() => setDashboardTab('saved')}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${dashboardTab === 'saved' ? 'bg-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          {getTabIcon('saved')} Saved ({savedJobs.length})
        </button>
        <button
          onClick={() => setDashboardTab('applied')}
          className={`flex-1 min-w-[120px] py-3 px-4 rounded-full font-semibold transition-all duration-300 flex items-center justify-center gap-2 ${dashboardTab === 'applied' ? 'bg-indigo-600 text-white shadow-lg transform scale-105' : 'text-gray-700 hover:bg-gray-200'}`}
        >
          {getTabIcon('applied')} Applied ({appliedJobs.length})
        </button>
      </div>

      {dashboardTab === 'all' && renderJobsList(jobs)}
      {dashboardTab === 'saved' && renderJobsList(savedJobs)}
      {dashboardTab === 'applied' && renderJobsList(appliedJobs)}
    </div>
  );
};

export default DashboardPage;