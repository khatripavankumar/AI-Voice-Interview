import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircle2,
  Loader2,
  Sparkles,
  GraduationCap,
  Briefcase,
  Layers,
  Code2,
  Check,
  Zap,
  Target,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { useAssessment } from '../context/AssessmentContext';
import { analysisSteps } from '../data/mockData';

export default function ResumeAnalysis() {
  const navigate = useNavigate();
  const { resumeData, candidate, isAnalysisComplete, setIsAnalysisComplete } = useAssessment();

  // Step progression state
  const [currentStepIndex, setCurrentStepIndex] = useState(isAnalysisComplete ? analysisSteps.length - 1 : 0);
  const [completed, setCompleted] = useState(isAnalysisComplete);

  useEffect(() => {
    if (completed) return;

    const interval = setInterval(() => {
      setCurrentStepIndex((prev) => {
        if (prev < analysisSteps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(interval);
          setCompleted(true);
          setIsAnalysisComplete(true);
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(interval);
  }, [completed, setIsAnalysisComplete]);

  const handleSkipAnimation = () => {
    setCurrentStepIndex(analysisSteps.length - 1);
    setCompleted(true);
    setIsAnalysisComplete(true);
  };

  const handleStartInterview = () => {
    navigate('/voice-interview');
  };

  const progressPercentage = Math.round(((currentStepIndex + 1) / analysisSteps.length) * 100);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-10">
        <Badge variant="brand" size="md" dot className="mb-3">
          Step 3 of 7: AI Parsing & Question Synthesis
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          {completed ? 'Resume Analysis Complete' : 'AI Resume Analysis in Progress'}
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
          {completed
            ? 'Candidate credentials, skill graph, and customized interview curriculum have been assembled.'
            : 'Extracting technical competencies, validating project impact metrics, and compiling contextual interview questions.'}
        </p>
      </div>

      {/* Progress Pipeline Banner */}
      <Card className="mb-8 border-brand-500/20 bg-gradient-to-r from-slate-900/90 via-slate-900/60 to-slate-950/90">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-brand-500/20 text-brand-400 flex items-center justify-center">
              {completed ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              ) : (
                <Loader2 className="w-5 h-5 animate-spin text-brand-400" />
              )}
            </div>
            <div>
              <h3 className="text-sm font-bold text-white">
                {completed ? 'Analysis Pipeline Complete (100%)' : `Executing Step ${currentStepIndex + 1} of ${analysisSteps.length}`}
              </h3>
              <p className="text-xs text-slate-400">
                {analysisSteps[currentStepIndex].label}: {analysisSteps[currentStepIndex].description}
              </p>
            </div>
          </div>

          {!completed && (
            <button
              onClick={handleSkipAnimation}
              className="text-xs font-semibold text-brand-400 hover:text-brand-300 flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-brand-500/10 hover:bg-brand-500/20 border border-brand-500/30 transition-colors"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Complete Instantly</span>
            </button>
          )}
        </div>

        <ProgressBar progress={progressPercentage} color={completed ? 'emerald' : 'brand'} height="h-2.5" />

        {/* Step Indicator Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-2 mt-6 pt-6 border-t border-slate-800/80">
          {analysisSteps.map((step, idx) => {
            const isStepCompleted = idx < currentStepIndex || completed;
            const isStepActive = idx === currentStepIndex && !completed;

            return (
              <div
                key={step.id}
                className={`p-2.5 rounded-xl border text-left transition-all ${
                  isStepCompleted
                    ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
                    : isStepActive
                    ? 'bg-brand-500/15 border-brand-500/40 text-brand-300 ring-2 ring-brand-500/30'
                    : 'bg-slate-900/30 border-slate-800 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider">
                    0{step.id}
                  </span>
                  {isStepCompleted ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400 stroke-[3]" />
                  ) : isStepActive ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin text-brand-400" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>
                <p className="text-[11px] font-semibold truncate" title={step.label}>
                  {step.label}
                </p>
              </div>
            );
          })}
        </div>
      </Card>

      {/* Extracted Dossier (Appears with smooth animation once complete or if completed) */}
      {completed && (
        <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Top Dossier: Candidate Overview */}
          <Card className="p-6 sm:p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 pb-6 border-b border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-4">
                <img
                  src={candidate.avatar}
                  alt={resumeData.fullName}
                  className="w-16 h-16 rounded-2xl object-cover ring-4 ring-brand-500/20"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
                      {resumeData.fullName}
                    </h2>
                    <Badge variant="emerald" size="sm" dot>
                      Verified Profile
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-brand-600 dark:text-brand-400 mt-0.5">
                    {candidate.role}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    {resumeData.email} • {resumeData.phone}
                  </p>
                </div>
              </div>

              <Button
                variant="primary"
                size="lg"
                onClick={handleStartInterview}
                icon={Sparkles}
                className="w-full md:w-auto shadow-xl shadow-brand-500/25"
              >
                Start AI Voice Interview
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-4 leading-relaxed italic">
              "{resumeData.summary}"
            </p>
          </Card>

          {/* Grid of Extracted Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Extracted Skills */}
            <Card>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Code2 className="w-5 h-5 text-brand-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Extracted Technical Skills
                </h3>
              </div>

              <div className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Programming Languages
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.languages.map((skill) => (
                      <Badge key={skill} variant="brand" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Frameworks & Libraries
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.frameworks.map((skill) => (
                      <Badge key={skill} variant="purple" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Databases & Storage
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.databases.map((skill) => (
                      <Badge key={skill} variant="cyan" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    Cloud, DevOps & Streaming
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.cloud.map((skill) => (
                      <Badge key={skill} variant="emerald" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                    AI / ML & Vector Tools
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {resumeData.skills.ai_ml.map((skill) => (
                      <Badge key={skill} variant="amber" size="sm">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </Card>

            {/* Personalized Interview Strategy & Topics */}
            <Card>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Target className="w-5 h-5 text-emerald-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  AI Interview Focus Topics
                </h3>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400 mb-4">
                The AI voice interviewer will prioritize the following focus areas formulated from the candidate's resume:
              </p>

              <div className="space-y-3">
                {resumeData.interviewFocusTopics.map((topic, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 flex items-center gap-3"
                  >
                    <div className="w-6 h-6 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs font-bold flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                      {topic}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-3.5 rounded-xl bg-brand-500/10 border border-brand-500/20 text-xs text-brand-700 dark:text-brand-300 flex items-start gap-2">
                <Sparkles className="w-4 h-4 text-brand-400 mt-0.5 flex-shrink-0" />
                <span>
                  <strong>Question engine ready:</strong> 5 Behavioral, 5 Psychometric, and 8 Resume-Tailored Technical questions will be evaluated.
                </span>
              </div>
            </Card>

            {/* Experience Breakdown */}
            <Card>
              <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-200 dark:border-slate-800">
                <Briefcase className="w-5 h-5 text-indigo-400" />
                <h3 className="text-base font-bold text-slate-900 dark:text-white">
                  Work Experience
                </h3>
              </div>

              <div className="space-y-4">
                {resumeData.experience.map((exp, idx) => (
                  <div key={idx} className="relative pl-5 border-l-2 border-brand-500/40 pb-3">
                    <div className="absolute -left-[7px] top-1 w-3 h-3 rounded-full bg-brand-500 ring-4 ring-brand-500/20" />
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {exp.role}
                      </h4>
                      <span className="text-xs text-slate-500 font-medium">{exp.period}</span>
                    </div>
                    <p className="text-xs font-semibold text-brand-500 dark:text-brand-400">
                      {exp.company}
                    </p>
                    <p className="text-xs text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                      {exp.description}
                    </p>
                  </div>
                ))}
              </div>
            </Card>

            {/* Projects & Education */}
            <Card className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <Layers className="w-5 h-5 text-amber-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Highlighted Projects
                  </h3>
                </div>
                <div className="space-y-3">
                  {resumeData.projects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {proj.name}
                        </span>
                        <span className="text-[10px] text-brand-400 font-medium">{proj.tech}</span>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                        {proj.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center gap-2 mb-3 pb-2 border-b border-slate-200 dark:border-slate-800">
                  <GraduationCap className="w-5 h-5 text-emerald-400" />
                  <h3 className="text-base font-bold text-slate-900 dark:text-white">
                    Education & Credentials
                  </h3>
                </div>
                {resumeData.education.map((edu, idx) => (
                  <div key={idx} className="text-xs">
                    <p className="font-bold text-slate-900 dark:text-white">{edu.degree}</p>
                    <p className="text-slate-500 dark:text-slate-400 mt-0.5">
                      {edu.institution} • {edu.year}
                    </p>
                    <p className="text-emerald-500 font-semibold mt-0.5">GPA: {edu.gpa}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Bottom Action Card */}
          <Card className="text-center p-8 bg-gradient-to-tr from-brand-950/40 via-slate-900/60 to-violet-950/40 border-brand-500/30">
            <h3 className="text-xl font-bold text-white mb-2">
              Ready to begin your AI Voice Interview?
            </h3>
            <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto mb-6">
              Our AI interviewer will speak with you, ask questions from each category, and evaluate your responses in real time.
            </p>
            <Button
              variant="primary"
              size="xl"
              onClick={handleStartInterview}
              icon={Sparkles}
              className="shadow-2xl shadow-brand-500/30 font-bold"
            >
              Start AI Voice Interview Now
            </Button>
          </Card>
        </div>
      )}
    </div>
  );
}
