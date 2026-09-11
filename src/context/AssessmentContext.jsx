import React, { createContext, useContext, useState, useEffect } from 'react';
import { initialCandidate, sampleResumeData, interviewQuestions, codingProblems, assessmentReportData } from '../data/mockData';

const AssessmentContext = createContext(null);

export const STAGES = [
  { id: 'login', path: '/login', label: 'Candidate Login', step: 1 },
  { id: 'resume-upload', path: '/resume-upload', label: 'Resume Upload', step: 2 },
  { id: 'resume-analysis', path: '/resume-analysis', label: 'AI Resume Analysis', step: 3 },
  { id: 'voice-interview', path: '/voice-interview', label: 'AI Voice Interview', step: 4 },
  { id: 'interview-complete', path: '/interview-complete', label: 'Interview Summary', step: 5 },
  { id: 'coding-assessment', path: '/coding-assessment', label: 'Coding Assessment', step: 6 },
  { id: 'assessment-report', path: '/assessment-report', label: 'Final Assessment Report', step: 7 },
];

export function AssessmentProvider({ children }) {
  // Theme state
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('talentpulse_theme') || 'dark';
  });

  // Sound effects / TTS toggle
  const [soundEnabled, setSoundEnabled] = useState(true);

  // Authentication state
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [candidate, setCandidate] = useState(initialCandidate);

  // Resume state
  const [resumeFile, setResumeFile] = useState({
    name: sampleResumeData.fileName,
    size: sampleResumeData.fileSize,
    type: sampleResumeData.fileType,
    uploadDate: sampleResumeData.uploadDate,
    isUploaded: true,
    progress: 100,
  });
  const [resumeData, setResumeData] = useState(sampleResumeData.extractedInfo);
  const [isAnalysisComplete, setIsAnalysisComplete] = useState(true);

  // Interview state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [interviewAnswers, setInterviewAnswers] = useState(() => {
    // Pre-populate some answers so evaluators see rich data, but let them edit/record
    const answers = {};
    interviewQuestions.forEach((q, idx) => {
      // First 3 answered by default, others ready to answer
      if (idx < 2) {
        answers[q.id] = {
          transcript: q.suggestedResponse,
          recordedAt: "Just now",
          duration: "45s",
          score: 92,
        };
      }
    });
    return answers;
  });
  const [isRecording, setIsRecording] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [interviewComplete, setInterviewComplete] = useState(false);

  // Coding state
  const [currentProblemIndex, setCurrentProblemIndex] = useState(0);
  const [codingLanguage, setCodingLanguage] = useState('python');
  const [codingSolutions, setCodingSolutions] = useState(() => {
    const map = {};
    codingProblems.forEach(p => {
      map[p.id] = { ...p.starterCode };
    });
    return map;
  });
  const [runResults, setRunResults] = useState(null);
  const [isRunningCode, setIsRunningCode] = useState(false);
  const [isSubmittingCode, setIsSubmittingCode] = useState(false);
  const [codingSubmission, setCodingSubmission] = useState({
    submitted: false,
    score: 95,
    passedCount: 4,
    totalCount: 4,
    runtime: "38 ms",
    memory: "15.4 MB",
    timePercentile: "96.4%",
    memoryPercentile: "88.2%",
  });

  // Sync theme with html root class
  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('talentpulse_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    setSoundEnabled(prev => !prev);
  };

  const login = (email, password) => {
    setIsAuthenticated(true);
    setCandidate(prev => ({
      ...prev,
      email: email || prev.email,
    }));
  };

  const loadSampleResume = () => {
    setResumeFile({
      name: sampleResumeData.fileName,
      size: sampleResumeData.fileSize,
      type: sampleResumeData.fileType,
      uploadDate: "Just now",
      isUploaded: true,
      progress: 100,
    });
    setResumeData(sampleResumeData.extractedInfo);
    setIsAnalysisComplete(false);
  };

  const uploadFile = (file) => {
    setResumeFile({
      name: file.name,
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      type: file.type.includes('pdf') ? 'PDF Document' : 'DOCX Document',
      uploadDate: "Just now",
      isUploaded: true,
      progress: 100,
    });
    setResumeData(sampleResumeData.extractedInfo);
    setIsAnalysisComplete(false);
  };

  const removeResume = () => {
    setResumeFile(null);
    setIsAnalysisComplete(false);
  };

  const saveInterviewResponse = (questionId, responseText) => {
    setInterviewAnswers(prev => ({
      ...prev,
      [questionId]: {
        transcript: responseText,
        recordedAt: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: "38s",
        score: Math.floor(Math.random() * 8) + 90, // 90 - 98
      }
    }));
  };

  const setCode = (problemId, lang, code) => {
    setCodingSolutions(prev => ({
      ...prev,
      [problemId]: {
        ...prev[problemId],
        [lang]: code,
      }
    }));
  };

  const resetCode = (problemId, lang) => {
    const problem = codingProblems.find(p => p.id === problemId) || codingProblems[0];
    setCode(problemId, lang, problem.starterCode[lang]);
  };

  const resetAssessment = () => {
    setCurrentQuestionIndex(0);
    setInterviewComplete(false);
    setCodingSubmission({
      submitted: false,
      score: 95,
      passedCount: 4,
      totalCount: 4,
      runtime: "38 ms",
      memory: "15.4 MB",
      timePercentile: "96.4%",
      memoryPercentile: "88.2%",
    });
    setRunResults(null);
  };

  return (
    <AssessmentContext.Provider
      value={{
        theme,
        toggleTheme,
        soundEnabled,
        toggleSound,
        isAuthenticated,
        login,
        candidate,
        resumeFile,
        resumeData,
        isAnalysisComplete,
        setIsAnalysisComplete,
        loadSampleResume,
        uploadFile,
        removeResume,
        // Interview
        interviewQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        interviewAnswers,
        saveInterviewResponse,
        isRecording,
        setIsRecording,
        isAiSpeaking,
        setIsAiSpeaking,
        isMuted,
        setIsMuted,
        interviewComplete,
        setInterviewComplete,
        // Coding
        codingProblems,
        currentProblemIndex,
        setCurrentProblemIndex,
        codingLanguage,
        setCodingLanguage,
        codingSolutions,
        setCode,
        resetCode,
        runResults,
        setRunResults,
        isRunningCode,
        setIsRunningCode,
        isSubmittingCode,
        setIsSubmittingCode,
        codingSubmission,
        setCodingSubmission,
        // Report
        assessmentReportData,
        resetAssessment,
      }}
    >
      {children}
    </AssessmentContext.Provider>
  );
}

export function useAssessment() {
  const context = useContext(AssessmentContext);
  if (!context) {
    throw new Error('useAssessment must be used within an AssessmentProvider');
  }
  return context;
}
