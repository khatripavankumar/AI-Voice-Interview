import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Award,
  Sparkles,
  CheckCircle2,
  Brain,
  Code2,
  MessageSquare,
  ShieldCheck,
  Share2,
  Printer,
  RotateCcw,
  Check,
  AlertTriangle,
  User,
  Calendar,
  Clock,
  Layers,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import CircularProgress from '../components/CircularProgress';
import ProgressBar from '../components/ProgressBar';
import { useAssessment } from '../context/AssessmentContext';

export default function AssessmentReport() {
  const navigate = useNavigate();
  const { assessmentReportData, candidate, resetAssessment } = useAssessment();
  const [copied, setCopied] = useState(false);

  const { scores, recommendation, technicalSkillsBreakdown, communicationMetrics, behavioralMetrics, codingMetrics, strengths, areasForImprovement } = assessmentReportData;

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  const handleRestart = () => {
    resetAssessment();
    navigate('/resume-upload');
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-8 print:p-0 print:m-0 print:max-w-none">
      {/* Top Action Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 border-b border-slate-200 dark:border-slate-800 print:hidden">
        <div>
          <Badge variant="emerald" size="md" dot className="mb-1">
            Enterprise Assessment Dossier
          </Badge>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Final Candidate Evaluation Report
          </h1>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleShare}
            icon={Share2}
            className="text-xs"
          >
            {copied ? 'Link Copied!' : 'Share Dossier'}
          </Button>

          <Button
            variant="secondary"
            size="sm"
            onClick={handlePrint}
            icon={Printer}
            className="text-xs"
          >
            Export / Print PDF
          </Button>

          <Button
            variant="primary"
            size="sm"
            onClick={handleRestart}
            icon={RotateCcw}
            className="text-xs"
          >
            Restart Assessment
          </Button>
        </div>
      </div>

      {/* Candidate Overview Header Card */}
      <Card className="p-6 sm:p-8 bg-gradient-to-r from-slate-900/90 via-slate-900/70 to-slate-950/90 border-brand-500/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div className="flex items-center gap-5">
            <img
              src={candidate.avatar}
              alt={candidate.name}
              className="w-20 h-20 rounded-2xl object-cover ring-4 ring-brand-500/30"
            />
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                  {candidate.name}
                </h2>
                <Badge variant="emerald" size="sm" dot>
                  {recommendation.status}
                </Badge>
              </div>
              <p className="text-sm font-semibold text-brand-400 mt-1">
                {candidate.role}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2.5">
                <span className="flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-slate-500" />
                  {candidate.email}
                </span>
                <span className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-slate-500" />
                  September 10, 2026
                </span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-slate-500" />
                  Assessment Duration: 48 mins
                </span>
              </div>
            </div>
          </div>

          {/* Large Overall Recommendation Pill */}
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-center w-full md:w-auto min-w-[200px]">
            <span className="text-[10px] uppercase font-extrabold tracking-wider text-emerald-400 block">
              Hiring Recommendation
            </span>
            <span className="text-xl sm:text-2xl font-black text-emerald-400 block my-0.5">
              Strongly Recommended
            </span>
            <span className="text-xs font-semibold text-emerald-300">
              {recommendation.percentile}
            </span>
          </div>
        </div>
      </Card>

      {/* SCORE CARDS: 6 Pillars */}
      <div>
        <h3 className="text-base font-bold text-slate-900 dark:text-white mb-4 flex items-center gap-2">
          <Award className="w-5 h-5 text-brand-500" />
          Comprehensive Assessment Scorecards
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          <Card className="text-center p-4 border-brand-500/40 bg-brand-500/5">
            <CircularProgress value={scores.overall} size={84} color="brand" sublabel="Overall" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Overall Score</h4>
            <span className="text-[10px] font-semibold text-brand-400">Exceptional</span>
          </Card>

          <Card className="text-center p-4 border-emerald-500/30">
            <CircularProgress value={scores.technical} size={84} color="emerald" sublabel="Tech" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Technical Score</h4>
            <span className="text-[10px] font-semibold text-emerald-400">96th Percentile</span>
          </Card>

          <Card className="text-center p-4 border-indigo-500/30">
            <CircularProgress value={scores.coding} size={84} color="brand" sublabel="Coding" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Coding Score</h4>
            <span className="text-[10px] font-semibold text-indigo-400">100% Tests Passed</span>
          </Card>

          <Card className="text-center p-4 border-purple-500/30">
            <CircularProgress value={scores.communication} size={84} color="purple" sublabel="Comm" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Communication</h4>
            <span className="text-[10px] font-semibold text-purple-400">High Fluency</span>
          </Card>

          <Card className="text-center p-4 border-amber-500/30">
            <CircularProgress value={scores.behavioral} size={84} color="amber" sublabel="Beh" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Behavioral Score</h4>
            <span className="text-[10px] font-semibold text-amber-400">Collaborative</span>
          </Card>

          <Card className="text-center p-4 border-cyan-500/30">
            <CircularProgress value={scores.psychometric} size={84} color="cyan" sublabel="Psy" />
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-2">Psychometric</h4>
            <span className="text-[10px] font-semibold text-cyan-400">High Composure</span>
          </Card>
        </div>
      </div>

      {/* PERFORMANCE ANALYTICS: 4 Detailed Quadrants */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Technical Skills Matrix */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Code2 className="w-5 h-5 text-brand-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Technical Skills Proficiency
              </h3>
            </div>
            <Badge variant="brand" size="sm">Resume & Interview</Badge>
          </div>

          <div className="space-y-4">
            {technicalSkillsBreakdown.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.skill}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-slate-400">
                      {item.level}
                    </span>
                    <span className="font-bold text-slate-900 dark:text-white">{item.score}%</span>
                  </div>
                </div>
                <ProgressBar progress={item.score} color="brand" height="h-2" showValue={false} />
                <p className="text-[11px] text-slate-500 dark:text-slate-400 italic">
                  {item.notes}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 2. Coding Assessment Metrics */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Layers className="w-5 h-5 text-emerald-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Coding Benchmarks & Performance
              </h3>
            </div>
            <Badge variant="emerald" size="sm">LeetCode Suite</Badge>
          </div>

          <div className="space-y-4">
            {codingMetrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.metric}</span>
                  <span className="font-bold text-emerald-500">{item.score}%</span>
                </div>
                <ProgressBar progress={item.score} color="emerald" height="h-2" showValue={false} />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 3. Communication Competencies */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-purple-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Communication & Voice Metrics
              </h3>
            </div>
            <Badge variant="purple" size="sm">Acoustic & NLP</Badge>
          </div>

          <div className="space-y-4">
            {communicationMetrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.metric}</span>
                  <span className="font-bold text-purple-400">{item.score}%</span>
                </div>
                <ProgressBar progress={item.score} color="brand" height="h-2" showValue={false} />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>

        {/* 4. Behavioral & Psychometric Evaluation */}
        <Card className="p-6">
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-2">
              <Brain className="w-5 h-5 text-amber-500" />
              <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                Behavioral & Workplace Dynamics
              </h3>
            </div>
            <Badge variant="amber" size="sm">Situational Judgment</Badge>
          </div>

          <div className="space-y-4">
            {behavioralMetrics.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-800 dark:text-slate-200">{item.metric}</span>
                  <span className="font-bold text-amber-400">{item.score}%</span>
                </div>
                <ProgressBar progress={item.score} color="amber" height="h-2" showValue={false} />
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* AI RECOMMENDATION SECTION: Strengths & Growth Areas */}
      <Card className="p-6 sm:p-8 border-brand-500/30 bg-gradient-to-br from-slate-900 via-slate-900/80 to-slate-950">
        <div className="flex items-center justify-between pb-4 mb-6 border-b border-slate-800">
          <div>
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-brand-400" />
              AI Evaluator Synthesis & Final Recommendation
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Synthesized by TalentPulse AI Core Engine • Model v4.2
            </p>
          </div>

          <div className="flex items-center gap-2">
            <Badge variant="emerald" size="lg" dot>
              {recommendation.status}
            </Badge>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic mb-8 p-4 rounded-xl bg-slate-800/40 border border-slate-700/60">
          "{recommendation.summary}"
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Key Strengths */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-emerald-400 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              Candidate Key Strengths
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {strengths.map((str, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span>{str}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Areas for Improvement */}
          <div className="space-y-3">
            <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" />
              Targeted Growth & Development Areas
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-300">
              {areasForImprovement.map((area, idx) => (
                <li key={idx} className="flex items-start gap-2.5">
                  <div className="w-4 h-4 rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                  </div>
                  <span>{area}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final Decision Matrix */}
        <div className="mt-8 pt-6 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs text-slate-400">
            <ShieldCheck className="w-4 h-4 text-emerald-500" />
            <span>Digital Certification ID: <strong>TP-2026-9104-X4A</strong></span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs text-slate-400">Candidate Recommendation:</span>
            <div className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-lg text-xs font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                Strongly Recommended
              </span>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}
