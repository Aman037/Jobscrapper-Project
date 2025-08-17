'use client';

import React, { useState, useCallback } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ResultsPage from './components/ResultsPage';
import DashboardPage from './components/DashboardPage';

export default function Home() {
  const [currentPage, setCurrentPage] = useState('home');
  const [jobPreferences, setJobPreferences] = useState({
    title: '',
    location: 'Remote',
    jobType: 'Full-time',
    salary: 0,
  });
  const [resumeFile, setResumeFile] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [savedJobs, setSavedJobs] = useState([]);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resultsPage, setResultsPage] = useState(1);
  const jobsPerPage = 5;
  
  // All Firebase-related state has been removed.

  const simulateFetch = (data) => new Promise((resolve) => setTimeout(() => resolve(data), 1000));

  const fetchJobs = useCallback(async (preferences) => {
    setLoading(true);
    try {
      const mockJobs = [
        { id: 1, title: 'Frontend Developer', company: 'Tech Solutions Inc.', location: 'Remote', salary: '80k-100k', date: '2 days ago', link: '#', description: 'Build amazing user interfaces with modern frameworks. Collaborate with designers and backend developers.' },
        { id: 2, title: 'Full-Stack Engineer', company: 'Innovate Co.', location: 'On-Site', salary: '120k-150k', date: '5 days ago', link: '#', description: 'Develop and maintain full-stack web applications, from database to UI. Experience with Node.js and React required.' },
        { id: 3, title: 'Data Scientist', company: 'Data Insights LLC', location: 'Hybrid', salary: '100k-130k', date: '1 day ago', link: '#', description: 'Analyze large datasets and build predictive models. Strong Python and machine learning skills are essential.' },
        { id: 4, title: 'UX/UI Designer', company: 'Creative Agency', location: 'Remote', salary: '70k-90k', date: '3 days ago', link: '#', description: 'Design intuitive and beautiful user experiences. Create wireframes, prototypes, and user flows.' },
        { id: 5, title: 'DevOps Engineer', company: 'CloudWorks', location: 'On-Site', salary: '130k-160k', date: '1 week ago', link: '#', description: 'Automate deployment pipelines and manage cloud infrastructure. Experience with AWS and Kubernetes is a plus.' },
        { id: 6, title: 'Senior Software Engineer', company: 'Global Tech', location: 'Remote', salary: '150k-180k', date: '1 week ago', link: '#', description: 'Lead a team of engineers on a new project. Architect and implement complex software solutions.' },
        { id: 7, title: 'Mobile App Developer', company: 'AppFactory', location: 'Hybrid', salary: '90k-110k', date: '2 days ago', link: '#', description: 'Develop native mobile applications for iOS and Android using Swift/Kotlin or React Native.' },
        { id: 8, title: 'Product Manager', company: 'Productive Solutions', location: 'On-Site', salary: '110k-140k', date: '4 days ago', link: '#', description: 'Define product strategy and roadmap. Gather requirements, prioritize features, and work with engineering teams.' },
        { id: 9, title: 'Graphic Designer', company: 'Design Hub', location: 'Remote', salary: '60k-80k', date: '3 days ago', link: '#', description: 'Create visual concepts for various projects, including logos, branding, and marketing materials.' },
        { id: 10, title: 'Cloud Architect', company: 'Cloud Pioneers', location: 'On-Site', salary: '160k-200k', date: '6 days ago', link: '#', description: 'Design and implement scalable and secure cloud infrastructure solutions. Provide technical guidance to teams.' },
      ];
      const results = await simulateFetch(mockJobs);
      setJobs(results);
      setError(null);
      setCurrentPage('results');
    } catch (err) {
      setError('Failed to fetch jobs. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const uploadResume = useCallback(async (file) => {
    setLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      alert('Resume uploaded successfully!');
    } catch (err) {
      setError('Failed to upload resume. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  const saveJob = useCallback(async (job) => {
    // This is now a local-state function, not persistent.
    setSavedJobs((prev) => [...prev, job]);
    alert(`Saved job: ${job.title}`);
  }, []);

  const applyToJob = useCallback(async (job) => {
    // This is now a local-state function, not persistent.
    setAppliedJobs((prev) => [...prev, job]);
    alert(`Applied to job: ${job.title}`);
  }, []);
  
  const renderContent = () => {
    if (loading) {
      return (
        <div className="flex justify-center items-center h-screen">
          <div className="w-20 h-20 border-4 border-dashed rounded-full animate-spin border-purple-500"></div>
        </div>
      );
    }
    if (error) {
      return (
        <div className="text-center text-red-500 p-8 text-xl font-bold">
          <p>Error: {error}</p>
        </div>
      );
    }
    switch (currentPage) {
      case 'home':
        return (
          <HomePage
            jobPreferences={jobPreferences}
            setJobPreferences={setJobPreferences}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            fetchJobs={fetchJobs}
            uploadResume={uploadResume}
          />
        );
      case 'results':
        return (
          <ResultsPage
            jobs={jobs}
            jobsPerPage={jobsPerPage}
            resultsPage={resultsPage}
            setResultsPage={setResultsPage}
            saveJob={saveJob}
            applyToJob={applyToJob}
          />
        );
      case 'dashboard':
        return (
          <DashboardPage
            jobs={jobs}
            savedJobs={savedJobs}
            appliedJobs={appliedJobs}
          />
        );
      default:
        return (
          <HomePage
            jobPreferences={jobPreferences}
            setJobPreferences={setJobPreferences}
            resumeFile={resumeFile}
            setResumeFile={setResumeFile}
            fetchJobs={fetchJobs}
            uploadResume={uploadResume}
          />
        );
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen font-sans antialiased text-gray-800 pb-10">
      <Navbar currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <div className="container mx-auto p-4 pt-24">
        {renderContent()}
      </div>
    </div>
  );
}