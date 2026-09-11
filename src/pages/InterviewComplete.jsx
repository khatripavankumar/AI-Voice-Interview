import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Award,
  CheckCircle2,
  Code2,
  Clock,
  Sparkles,
  MessageSquare,
  ShieldCheck,
  Brain,
  Cpu,
  ArrowRight,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import CircularProgress from '../components/CircularProgress';
import { useAssessment } from '../context/AssessmentContext';

export default function InterviewComplete() {
  const navigate = useNavigate();
  const { interviewQuestions, interviewAnswers } = useAssessment();

  // Trigger celebration confetti on mount
  useEffect(() => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#10b981', '#a855f7', '#38bdf8'],
      });
    } catch (e) {
      // safe fallback
    }
  }, []);

  const totalQuestions = interviewQuestions.length;
  const answeredCount = Object.keys(interviewAnswers).length;

  const handleStartCoding = () => {
    navigate('/coding-assessment');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
      {/* Celebration Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-gradient-to-tr from-emerald-500 to-teal-400 text-white shadow-xl shadow-emerald-500/25 mb-4 ring-8 ring-emerald-500/10">
          <Award className="w-8 h-8" />
        </div>
        <Badge variant="emerald" size="md" dot className="mb-3">
          Step 5 of 7: Voice Interview Completed
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          AI Voice Interview Finished!
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-2">
          Your responses across all three competency domains have been processed and scored by our AI assessment model.
        </p>
      </div>

      {/* Primary Summary Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        <Card className="text-center p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Total Questions
          </span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            {answeredCount} / {totalQuestions}
          </span>
          <span className="text-[10px] text-emerald-500 font-semibold block mt-0.5">
            100% Completed
          </span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Interview Duration
          </span>
          <span className="text-2xl font-extrabold text-slate-900 dark:text-white">
            18m 42s
          </span>
          <span className="text-[10px] text-slate-400 font-semibold block mt-0.5">
            Pacing Optimal
          </span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Voice Audio Quality
          </span>
          <span className="text-2xl font-extrabold text-emerald-500">
            98.5%
          </span>
          <span className="text-[10px] text-emerald-400 font-semibold block mt-0.5">
            High Fidelity
          </span>
        </Card>

        <Card className="text-center p-4">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
            Overall Voice Rating
          </span>
          <span className="text-2xl font-extrabold text-brand-500 dark:text-brand-400">
            Strong Pass
          </span>
          <span className="text-[10px] text-brand-400 font-semibold block mt-0.5">
            Top Tier
          </span>
        </Card>
      </div>

      {/* Domain Scores Cards */}
      <Card className="p-6 sm:p-8 mb-8 border-brand-500/20 bg-gradient-to-br from-slate-900/90 via-slate-900/70 to-slate-950/90">
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" />
              Competency Domain Score Breakdown
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              Evaluated using semantic NLP and speech acoustics benchmarks
            </p>
          </div>
          <Badge variant="emerald" size="sm">
            AI Verified
          </Badge>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div className="flex flex-col items-center">
            <CircularProgress value={92} size={100} color="brand" sublabel="Score" />
            <span className="mt-3 text-sm font-bold text-white">Communication</span>
            <span className="text-[11px] text-slate-400 text-center">Clarity & Structure</span>
          </div>

          <div className="flex flex-col items-center">
            <CircularProgress value={88} size={100} color="purple" sublabel="Score" />
            <span className="mt-3 text-sm font-bold text-white">Behavioral</span>
            <span className="text-[11px] text-slate-400 text-center">Collaboration & Culture</span>
          </div>

          <div className="flex flex-col items-center">
            <CircularProgress value={90} size={100} color="cyan" sublabel="Score" />
            <span className="mt-3 text-sm font-bold text-white">Psychometric</span>
            <span className="text-[11px] text-slate-400 text-center">Situational Composure</span>
          </div>

          <div className="flex flex-col items-center">
            <CircularProgress value={94} size={100} color="emerald" sublabel="Score" />
            <span className="mt-3 text-sm font-bold text-white">Technical Depth</span>
            <span className="text-[11px] text-slate-400 text-center">Resume & System Design</span>
          </div>
        </div>
      </Card>

      {/* AI Evaluator Feedback Box */}
      <Card className="p-6 mb-8 bg-slate-50 dark:bg-slate-900/50">
        <div className="flex items-start gap-4">
          <img
            src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=120&auto=format&fit=crop&q=80"
            alt="Dr. Elena Vance"
            className="w-12 h-12 rounded-2xl object-cover ring-2 ring-brand-500/30 flex-shrink-0"
          />
          <div>
            <div className="flex items-center gap-2">
              <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                Dr. Elena Vance
              </h4>
              <span className="text-xs text-slate-400">• Principal AI Interviewer Assessment</span>
            </div>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              "The candidate demonstrated exceptional architectural clarity during the technical interview questions. Explanations regarding the Python GIL, PostgreSQL Bitmap Scans, and the Strangler Fig microservices migration were precise and rooted in production experience. Communication was composed, structured, and confident."
            </p>
          </div>
        </div>
      </Card>

      {/* Next Step Call to Action */}
      <Card className="text-center p-8 bg-gradient-to-r from-indigo-950/40 via-slate-900/80 to-brand-950/40 border-brand-500/30">
        <div className="max-w-xl mx-auto">
          <Badge variant="brand" size="sm" className="mb-3">
            Next Assessment Milestone
          </Badge>
          <h2 className="text-2xl font-bold text-white mb-2">
            Proceed to Live Coding Round
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mb-6 leading-relaxed">
            In this section, you will solve algorithmic programming challenges inside our professional LeetCode-style developer IDE. You can choose between Python, JavaScript, Java, C++, and C.
          </p>
          <Button
            variant="primary"
            size="xl"
            onClick={handleStartCoding}
            icon={Code2}
            className="shadow-2xl shadow-brand-500/30 font-bold"
          >
            Start Coding Round
          </Button>
        </div>
      </Card>
    </div>
  );
}
