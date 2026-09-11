import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Mic,
  Volume2,
  VolumeX,
  Square,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  Clock,
  Radio,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import AudioVisualizer from '../components/AudioVisualizer';
import ProgressBar from '../components/ProgressBar';
import { useAssessment } from '../context/AssessmentContext';

export default function VoiceInterview() {
  const navigate = useNavigate();
  const {
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
    soundEnabled,
  } = useAssessment();

  const currentQ = interviewQuestions[currentQuestionIndex] || interviewQuestions[0];
  const existingAnswer = interviewAnswers[currentQ.id]?.transcript || '';

  // Local state
  const [candidateResponse, setCandidateResponse] = useState(existingAnswer);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [questionTimer, setQuestionTimer] = useState(120); // 2 minute countdown
  const transcriptTimerRef = useRef(null);

  // Simulate AI Speaking with Web Speech API or Fallback
  const speakQuestion = useCallback((text) => {
    setIsAiSpeaking(true);
    if (soundEnabled && 'speechSynthesis' in window && !isMuted) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 1.0;
      utterance.pitch = 1.0;
      utterance.onend = () => setIsAiSpeaking(false);
      utterance.onerror = () => setIsAiSpeaking(false);
      window.speechSynthesis.speak(utterance);
    } else {
      // Fallback simulated speaking duration
      setTimeout(() => {
        setIsAiSpeaking(false);
      }, 3500);
    }
  }, [soundEnabled, isMuted, setIsAiSpeaking]);

  // Sync candidate response when question changes
  useEffect(() => {
    const existing = interviewAnswers[currentQ.id]?.transcript || '';
    setCandidateResponse(existing);
    setRecordingSeconds(0);
    setQuestionTimer(120);
    setIsRecording(false);

    speakQuestion(currentQ.question);

    return () => {
      if (window.speechSynthesis) window.speechSynthesis.cancel();
      if (transcriptTimerRef.current) clearInterval(transcriptTimerRef.current);
    };
  }, [currentQuestionIndex, currentQ.id, currentQ.question, interviewAnswers, setIsRecording, speakQuestion]);

  // Question countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setQuestionTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Recording elapsed timer
  useEffect(() => {
    let interval;
    if (isRecording) {
      interval = setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  // Toggle candidate recording simulation
  const handleToggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      if (transcriptTimerRef.current) clearInterval(transcriptTimerRef.current);
      if (candidateResponse.trim()) {
        saveInterviewResponse(currentQ.id, candidateResponse);
      }
    } else {
      setIsRecording(true);
      setRecordingSeconds(0);

      const targetWords = (currentQ.suggestedResponse || "I approach this challenge by analyzing the core metrics...").split(" ");
      let wordIdx = 0;
      let currentText = candidateResponse ? candidateResponse + " " : "";

      transcriptTimerRef.current = setInterval(() => {
        if (wordIdx < targetWords.length) {
          currentText += (wordIdx === 0 ? "" : " ") + targetWords[wordIdx];
          setCandidateResponse(currentText);
          wordIdx++;
        } else {
          clearInterval(transcriptTimerRef.current);
        }
      }, 180);
    }
  };

  const handleUseSample = () => {
    setCandidateResponse(currentQ.suggestedResponse);
    saveInterviewResponse(currentQ.id, currentQ.suggestedResponse);
  };

  const handleClear = () => {
    setCandidateResponse('');
    if (isRecording) {
      setIsRecording(false);
      if (transcriptTimerRef.current) clearInterval(transcriptTimerRef.current);
    }
  };

  const handleSaveAndNext = () => {
    if (candidateResponse.trim()) {
      saveInterviewResponse(currentQ.id, candidateResponse);
    }
    if (currentQuestionIndex < interviewQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      navigate('/interview-complete');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      if (candidateResponse.trim()) {
        saveInterviewResponse(currentQ.id, candidateResponse);
      }
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleFinishEarly = () => {
    if (candidateResponse.trim()) {
      saveInterviewResponse(currentQ.id, candidateResponse);
    }
    navigate('/interview-complete');
  };

  // Category counts and calculations
  const totalQuestions = interviewQuestions.length;
  const answeredCount = Object.keys(interviewAnswers).length;
  const overallProgress = Math.round(((currentQuestionIndex + 1) / totalQuestions) * 100);

  // Category color theme
  const getCategoryColor = (cat) => {
    switch (cat) {
      case 'BEHAVIORAL':
        return 'purple';
      case 'PSYCHOMETRIC':
        return 'cyan';
      case 'TECHNICAL':
        return 'emerald';
      default:
        return 'brand';
    }
  };

  const formatTime = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
      {/* Top Header & Metrics Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Badge variant={getCategoryColor(currentQ.category)} size="md" dot>
              {currentQ.category}
            </Badge>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400">
              Question {currentQ.questionNumber} of {currentQ.categoryTotal}
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white">
            AI Voice Interview Dashboard
          </h1>
        </div>

        {/* Global Progress and Controls */}
        <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2 bg-slate-100 dark:bg-slate-800/80 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700">
            <Clock className="w-4 h-4 text-brand-500" />
            <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
              Remaining: {formatTime(questionTimer)}
            </span>
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={handleFinishEarly}
            className="text-xs"
          >
            Finish Interview
          </Button>
        </div>
      </div>

      {/* Category Tabs / Stepper */}
      <div className="mb-6 p-2 rounded-2xl bg-white/70 dark:bg-slate-900/70 border border-slate-200 dark:border-slate-800 backdrop-blur-md">
        <div className="flex items-center justify-between text-xs font-semibold px-2 mb-2 text-slate-500 dark:text-slate-400">
          <span>Overall Interview Progress: {answeredCount} of {totalQuestions} answered</span>
          <span className="text-brand-500 font-bold">{overallProgress}%</span>
        </div>
        <ProgressBar progress={overallProgress} color="brand" height="h-2" showValue={false} />

        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-100 dark:border-slate-800 text-center">
          <div
            className={`p-1.5 rounded-xl text-xs font-bold ${
              currentQ.category === 'BEHAVIORAL'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'text-slate-500'
            }`}
          >
            1. BEHAVIORAL (5)
          </div>
          <div
            className={`p-1.5 rounded-xl text-xs font-bold ${
              currentQ.category === 'PSYCHOMETRIC'
                ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30'
                : 'text-slate-500'
            }`}
          >
            2. PSYCHOMETRIC (5)
          </div>
          <div
            className={`p-1.5 rounded-xl text-xs font-bold ${
              currentQ.category === 'TECHNICAL'
                ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                : 'text-slate-500'
            }`}
          >
            3. TECHNICAL (8)
          </div>
        </div>
      </div>

      {/* Main Split Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: AI Interviewer Card */}
        <div className="lg:col-span-5 space-y-6">
          <Card className="text-center relative overflow-hidden p-6 sm:p-8">
            {/* Ambient Background Wave Glow */}
            <div className="absolute top-0 inset-x-0 h-32 bg-gradient-to-b from-brand-500/10 to-transparent pointer-events-none" />

            {/* AI Avatar */}
            <div className="relative inline-block mb-4">
              <div
                className={`w-28 h-28 rounded-3xl overflow-hidden mx-auto border-4 transition-all duration-300 shadow-2xl ${
                  isAiSpeaking
                    ? 'border-brand-400 ring-8 ring-brand-500/20 scale-105'
                    : 'border-slate-200 dark:border-slate-700'
                }`}
              >
                <img
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&auto=format&fit=crop&q=80"
                  alt="Dr. Elena Vance"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Status Badge */}
              <div className="absolute -bottom-2 inset-x-0 flex justify-center">
                <span
                  className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1 shadow-md ${
                    isAiSpeaking
                      ? 'bg-brand-500 text-white animate-pulse'
                      : 'bg-slate-800 text-slate-300 border border-slate-700'
                  }`}
                >
                  <Radio className="w-2.5 h-2.5 text-brand-200" />
                  {isAiSpeaking ? 'AI Speaking...' : 'AI Listening'}
                </span>
              </div>
            </div>

            <h3 className="text-lg font-bold text-slate-900 dark:text-white mt-3">
              Dr. Elena Vance
            </h3>
            <p className="text-xs text-brand-500 dark:text-brand-400 font-semibold">
              Principal AI Technical Interviewer
            </p>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Evaluating competencies: {currentQ.competencies?.join(', ')}
            </p>

            {/* AI Voice Waveform Activity */}
            <div className="my-6 p-4 rounded-2xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between text-xs text-slate-400 mb-2 font-medium">
                <span>AI Voice Waveform</span>
                <span className={isAiSpeaking ? 'text-brand-400 font-bold' : 'text-slate-500'}>
                  {isAiSpeaking ? 'Broadcasting audio' : 'Standby'}
                </span>
              </div>
              <AudioVisualizer isActive={isAiSpeaking} color="brand" height="h-12" />
            </div>

            {/* AI Controls */}
            <div className="flex items-center justify-center gap-3">
              <button
                type="button"
                onClick={() => speakQuestion(currentQ.question)}
                disabled={isAiSpeaking}
                className="px-3.5 py-2 rounded-xl text-xs font-semibold bg-brand-50 dark:bg-brand-950/50 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-800 hover:bg-brand-100 flex items-center gap-1.5 transition-colors"
              >
                <Volume2 className="w-4 h-4" />
                <span>Replay AI Audio</span>
              </button>

              <button
                type="button"
                onClick={() => setIsMuted(!isMuted)}
                className={`p-2 rounded-xl text-xs font-semibold border transition-colors ${
                  isMuted
                    ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-400 border-slate-200 dark:border-slate-700'
                }`}
                title={isMuted ? 'Unmute AI' : 'Mute AI'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
            </div>
          </Card>

          {/* Question Context Pill */}
          <Card className="p-4 bg-slate-50/50 dark:bg-slate-900/40">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-300 mb-1.5">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>Assessment Context</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              {currentQ.context}
            </p>
          </Card>
        </div>

        {/* Right Column: Active Question & Candidate Voice Response */}
        <div className="lg:col-span-7 space-y-6">
          {/* Question Display Card */}
          <Card className="border-l-4 border-l-brand-500 p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-bold tracking-wider uppercase text-brand-500 dark:text-brand-400">
                {currentQ.category} • QUESTION {currentQ.questionNumber} OF {currentQ.categoryTotal}
              </span>
              <Badge variant={getCategoryColor(currentQ.category)} size="sm">
                Active Question
              </Badge>
            </div>

            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug mb-3">
              "{currentQ.question}"
            </h2>

            <div className="flex flex-wrap gap-1.5 mt-2">
              {currentQ.competencies?.map((comp, idx) => (
                <span
                  key={idx}
                  className="text-[11px] font-medium px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700"
                >
                  {comp}
                </span>
              ))}
            </div>
          </Card>

          {/* Candidate Voice Input & Response Editor */}
          <Card className="p-6">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <div
                  className={`w-3 h-3 rounded-full ${
                    isRecording ? 'bg-rose-500 animate-ping' : 'bg-slate-400'
                  }`}
                />
                <span className="text-sm font-bold text-slate-900 dark:text-white">
                  {isRecording ? 'Simulating Audio Recording...' : 'Candidate Response (Speech-to-Text)'}
                </span>
              </div>

              {isRecording && (
                <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-rose-500 dark:text-rose-400 bg-rose-500/10 px-2.5 py-1 rounded-lg">
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                  <span>Recording: {formatTime(recordingSeconds)}</span>
                </div>
              )}
            </div>

            {/* Candidate Voice Equalizer (Active when candidate is recording) */}
            <div className="mb-4 p-3 rounded-xl bg-slate-950/60 border border-slate-800">
              <div className="flex items-center justify-between text-[11px] text-slate-400 mb-1">
                <span>Candidate Microphone Input</span>
                <span className={isRecording ? 'text-emerald-400 font-bold' : 'text-slate-500'}>
                  {isRecording ? 'Voice activity detected' : 'Microphone idle'}
                </span>
              </div>
              <AudioVisualizer isRecording={isRecording} height="h-10" />
            </div>

            {/* Transcript Textarea */}
            <div className="relative mb-4">
              <textarea
                value={candidateResponse}
                onChange={(e) => setCandidateResponse(e.target.value)}
                placeholder="Click 'Record Answer' to speak or type your answer here..."
                rows={6}
                className="w-full p-4 rounded-xl text-sm bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500 transition-colors leading-relaxed font-sans resize-y"
              />
              <div className="text-[11px] text-slate-400 flex items-center justify-between mt-1 px-1">
                <span>{candidateResponse.trim().split(/\s+/).filter(Boolean).length} words</span>
                <span>Press 'Record' to simulate real-time speech-to-text</span>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                {/* Main Record Button */}
                <Button
                  variant={isRecording ? 'danger' : 'success'}
                  size="md"
                  onClick={handleToggleRecording}
                  icon={isRecording ? Square : Mic}
                  className="shadow-md"
                >
                  {isRecording ? 'Stop Recording' : 'Start Speaking (Mic)'}
                </Button>

                {/* Helper Auto-fill Sample */}
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleUseSample}
                  icon={Sparkles}
                  title="Auto-fill recommended response for quick testing"
                >
                  Use Suggested Response
                </Button>

                {candidateResponse && (
                  <button
                    type="button"
                    onClick={handleClear}
                    className="p-2 text-slate-400 hover:text-slate-200 text-xs hover:underline"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Navigation Controls */}
              <div className="flex items-center gap-2">
                <Button
                  variant="secondary"
                  size="md"
                  disabled={currentQuestionIndex === 0}
                  onClick={handlePrev}
                  icon={ArrowLeft}
                >
                  Previous
                </Button>

                <Button
                  variant="primary"
                  size="md"
                  onClick={handleSaveAndNext}
                  icon={currentQuestionIndex === interviewQuestions.length - 1 ? CheckCircle2 : ArrowRight}
                >
                  {currentQuestionIndex === interviewQuestions.length - 1 ? 'Finish & Summary' : 'Next Question'}
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
