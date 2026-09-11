import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AssessmentProvider } from './context/AssessmentContext';
import Navbar from './components/Navbar';
import StageStepper from './components/StageStepper';

import Login from './pages/Login';
import ResumeUpload from './pages/ResumeUpload';
import ResumeAnalysis from './pages/ResumeAnalysis';
import VoiceInterview from './pages/VoiceInterview';
import InterviewComplete from './pages/InterviewComplete';
import CodingAssessment from './pages/CodingAssessment';
import AssessmentReport from './pages/AssessmentReport';

function AppLayout() {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login' || location.pathname === '/';

  return (
    <div className="min-h-screen bg-slate-100 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-col transition-colors">
      <Navbar />
      {!isLoginPage && <StageStepper />}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/resume-upload" element={<ResumeUpload />} />
          <Route path="/resume-analysis" element={<ResumeAnalysis />} />
          <Route path="/voice-interview" element={<VoiceInterview />} />
          <Route path="/interview-complete" element={<InterviewComplete />} />
          <Route path="/coding-assessment" element={<CodingAssessment />} />
          <Route path="/assessment-report" element={<AssessmentReport />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <AssessmentProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </AssessmentProvider>
  );
}
