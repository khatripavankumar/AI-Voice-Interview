import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Play,
  CheckCircle2,
  RotateCcw,
  Sparkles,
  Code2,
  Clock,
  Terminal,
  Check,
  Copy,
  Layers,
  Award,
  FileCode2,
} from 'lucide-react';
import Button from '../components/Button';
import Badge from '../components/Badge';
import Modal from '../components/Modal';
import { useAssessment } from '../context/AssessmentContext';

export default function CodingAssessment() {
  const navigate = useNavigate();
  const {
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
    setCodingSubmission,
  } = useAssessment();

  const currentProblem = codingProblems[currentProblemIndex] || codingProblems[0];
  const currentCode =
    codingSolutions[currentProblem.id]?.[codingLanguage] ||
    currentProblem.starterCode[codingLanguage] ||
    '';

  const [activeTab, setActiveTab] = useState('testcases');
  const [selectedTestCaseIdx, setSelectedTestCaseIdx] = useState(0);
  const [showSubmitModal, setShowSubmitModal] = useState(false);
  const [countdownTimer, setCountdownTimer] = useState(45 * 60); // 45 minutes
  const [copied, setCopied] = useState(false);
  const [formatted, setFormatted] = useState(false);

  // Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCountdownTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleCodeChange = (e) => {
    setCode(currentProblem.id, codingLanguage, e.target.value);
  };

  const handleCopy = () => {
    navigator.clipboard?.writeText(currentCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFormat = () => {
    setFormatted(true);
    setTimeout(() => setFormatted(false), 1500);
  };

  const handleReset = () => {
    resetCode(currentProblem.id, codingLanguage);
  };

  // Run Code Simulation
  const handleRunCode = () => {
    setIsRunningCode(true);
    setActiveTab('console');
    setTimeout(() => {
      setIsRunningCode(false);
      setRunResults({
        status: 'Accepted',
        runtime: '38 ms',
        memory: '15.4 MB',
        passed: currentProblem.testCases.length,
        total: currentProblem.testCases.length,
        cases: currentProblem.testCases.map((tc) => ({
          ...tc,
          status: 'Passed',
          actual: tc.expected,
        })),
      });
    }, 900);
  };

  // Submit Code Simulation
  const handleSubmitCode = () => {
    setIsSubmittingCode(true);
    setTimeout(() => {
      setIsSubmittingCode(false);
      setCodingSubmission({
        submitted: true,
        score: 95,
        passedCount: 4,
        totalCount: 4,
        runtime: '38 ms',
        memory: '15.4 MB',
        codeQualityScore: 96,
        timePercentile: '96.4%',
        memoryPercentile: '88.2%',
      });
      setShowSubmitModal(true);
      try {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
        });
      } catch {
        // confetti fallback
      }
    }, 1200);
  };

  const handleNavigateToReport = () => {
    setShowSubmitModal(false);
    navigate('/assessment-report');
  };

  // Compute line numbers for editor
  const codeLines = currentCode.split('\n');

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top IDE Navigation Header */}
      <div className="h-14 border-b border-slate-800 bg-slate-900/90 px-4 flex items-center justify-between">
        {/* Left: Problem Navigator */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-slate-800 border border-slate-700">
            <FileCode2 className="w-4 h-4 text-brand-400" />
            <span className="text-xs font-bold text-slate-200">Problem List:</span>
          </div>

          <div className="flex items-center gap-1">
            {codingProblems.map((prob, idx) => (
              <button
                key={prob.id}
                onClick={() => {
                  setCurrentProblemIndex(idx);
                  setRunResults(null);
                }}
                className={`px-3 py-1 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5 ${
                  currentProblemIndex === idx
                    ? 'bg-brand-500/20 text-brand-300 border border-brand-500/40'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800'
                }`}
              >
                <span>{idx + 1}. {prob.title}</span>
                <span className="text-[10px] px-1 py-0.2 rounded bg-emerald-500/20 text-emerald-300">
                  {prob.difficulty}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Center/Right: Timer & Action CTAs */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700 text-xs font-mono font-bold text-slate-300">
            <Clock className="w-3.5 h-3.5 text-amber-400" />
            <span>Time Left: {formatTimer(countdownTimer)}</span>
          </div>

          <Button
            variant="secondary"
            size="sm"
            onClick={handleRunCode}
            isLoading={isRunningCode}
            icon={Play}
            className="text-xs font-semibold"
          >
            Run Code
          </Button>

          <Button
            variant="success"
            size="sm"
            onClick={handleSubmitCode}
            isLoading={isSubmittingCode}
            icon={Sparkles}
            className="text-xs font-bold shadow-lg shadow-emerald-500/20"
          >
            Submit Solution
          </Button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 overflow-hidden">
        {/* LEFT PANEL: Problem Statement */}
        <div className="lg:col-span-5 border-r border-slate-800/90 bg-slate-900/40 overflow-y-auto p-6 space-y-6">
          {/* Header info */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="emerald" size="sm">
                {currentProblem.difficulty}
              </Badge>
              <span className="text-xs text-slate-400">
                Time Limit: {currentProblem.timeLimit}
              </span>
              <span className="text-xs text-slate-400">• Memory Limit: 256MB</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">
              {currentProblemIndex + 1}. {currentProblem.title}
            </h1>
          </div>

          {/* Description */}
          <div className="text-xs sm:text-sm text-slate-300 leading-relaxed space-y-4">
            <div
              className="prose prose-invert max-w-none text-slate-300"
              dangerouslySetInnerHTML={{
                __html: currentProblem.description
                  .replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-slate-800 text-brand-300 font-mono text-xs">$1</code>')
                  .replace(/\n\n/g, '<br/><br/>')
              }}
            />
          </div>

          {/* Examples */}
          <div className="space-y-4 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Examples
            </h3>
            {currentProblem.examples.map((ex, idx) => (
              <div
                key={idx}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 space-y-1.5 font-mono text-xs"
              >
                <span className="text-slate-400 font-sans font-bold text-[11px] block">
                  Example {idx + 1}:
                </span>
                <div className="text-slate-300">
                  <strong className="text-slate-400">Input:</strong> {ex.input}
                </div>
                <div className="text-slate-300">
                  <strong className="text-slate-400">Output:</strong> {ex.output}
                </div>
                {ex.explanation && (
                  <div className="text-slate-400 font-sans text-[11px] pt-1 border-t border-slate-800 mt-2">
                    <em>Explanation:</em> {ex.explanation}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Constraints */}
          <div className="space-y-2 pt-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Constraints
            </h3>
            <ul className="list-disc list-inside space-y-1 text-xs font-mono text-slate-400">
              {currentProblem.constraints.map((c, idx) => (
                <li key={idx}>{c}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* RIGHT PANEL: Code Editor & Console */}
        <div className="lg:col-span-7 flex flex-col bg-slate-950 overflow-hidden">
          {/* Editor Sub-Header Toolbar */}
          <div className="h-11 px-4 border-b border-slate-800/90 bg-slate-900/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Language Selector */}
              <label className="text-xs text-slate-400 font-medium flex items-center gap-1.5">
                <Code2 className="w-3.5 h-3.5 text-brand-400" />
                <span>Language:</span>
              </label>
              <select
                value={codingLanguage}
                onChange={(e) => setCodingLanguage(e.target.value)}
                className="bg-slate-800 border border-slate-700 text-xs font-semibold rounded-lg px-2.5 py-1 text-white focus:outline-none focus:ring-1 focus:ring-brand-500"
              >
                <option value="python">Python 3</option>
                <option value="javascript">JavaScript (ES2024)</option>
                <option value="java">Java 17 (OpenJDK)</option>
                <option value="cpp">C++ 20 (GCC)</option>
                <option value="c">C (Clang 16)</option>
              </select>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={handleFormat}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                title="Format Code"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{formatted ? 'Formatted!' : 'Format'}</span>
              </button>

              <button
                type="button"
                onClick={handleCopy}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                title="Copy Code"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="hidden sm:inline">{copied ? 'Copied' : 'Copy'}</span>
              </button>

              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 text-xs flex items-center gap-1 transition-colors"
                title="Reset Code Template"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Reset</span>
              </button>
            </div>
          </div>

          {/* Code Editor Body */}
          <div className="flex-1 flex overflow-auto bg-[#0a0e17] font-mono text-xs sm:text-sm relative">
            {/* Line numbers gutter */}
            <div className="w-12 py-4 select-none text-right pr-3 text-slate-600 font-mono text-xs border-r border-slate-800/80 bg-slate-950/40 flex-shrink-0">
              {codeLines.map((_, i) => (
                <div key={i} className="leading-6">
                  {i + 1}
                </div>
              ))}
            </div>

            {/* Editable code area */}
            <textarea
              value={currentCode}
              onChange={handleCodeChange}
              spellCheck={false}
              className="flex-1 py-4 px-4 bg-transparent text-slate-100 focus:outline-none resize-none leading-6 font-mono text-xs sm:text-sm whitespace-pre tab-4 selection:bg-brand-500/40"
              style={{ tabSize: 4 }}
            />
          </div>

          {/* BOTTOM PANEL: Console & Testcase Results */}
          <div className="h-64 border-t border-slate-800 bg-slate-900/90 flex flex-col">
            {/* Console Tabs */}
            <div className="h-9 px-4 border-b border-slate-800 flex items-center justify-between bg-slate-950/40">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveTab('testcases')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'testcases'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <Terminal className="w-3 h-3" />
                  <span>Testcases</span>
                </button>

                <button
                  onClick={() => setActiveTab('console')}
                  className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors flex items-center gap-1.5 ${
                    activeTab === 'console'
                      ? 'bg-slate-800 text-white border border-slate-700'
                      : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                  <span>Run Results {runResults ? `(${runResults.passed}/${runResults.total})` : ''}</span>
                </button>
              </div>

              {runResults && (
                <div className="flex items-center gap-3 text-[11px] font-mono text-slate-400">
                  <span>Runtime: <strong className="text-emerald-400">{runResults.runtime}</strong></span>
                  <span>Memory: <strong className="text-emerald-400">{runResults.memory}</strong></span>
                </div>
              )}
            </div>

            {/* Tab 1: Test Cases */}
            {activeTab === 'testcases' && (
              <div className="flex-1 p-4 overflow-y-auto space-y-3">
                <div className="flex items-center gap-2">
                  {currentProblem.testCases.map((tc, idx) => (
                    <button
                      key={tc.id}
                      onClick={() => setSelectedTestCaseIdx(idx)}
                      className={`px-3 py-1 rounded-lg text-xs font-mono font-medium transition-colors ${
                        selectedTestCaseIdx === idx
                          ? 'bg-slate-800 text-brand-300 border border-slate-700'
                          : 'bg-slate-900/60 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      Case {idx + 1}
                    </button>
                  ))}
                </div>

                {currentProblem.testCases[selectedTestCaseIdx] && (
                  <div className="space-y-2 font-mono text-xs">
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Input:</span>
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                        {currentProblem.testCases[selectedTestCaseIdx].input}
                      </div>
                    </div>
                    <div>
                      <span className="text-slate-500 block text-[10px] uppercase font-bold">Expected Output:</span>
                      <div className="p-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-200">
                        {currentProblem.testCases[selectedTestCaseIdx].expected}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Console / Run Execution Output */}
            {activeTab === 'console' && (
              <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
                {isRunningCode ? (
                  <div className="flex items-center gap-2 text-slate-400 py-6 justify-center">
                    <div className="w-4 h-4 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />
                    <span>Compiling and executing test suites...</span>
                  </div>
                ) : runResults ? (
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                      <CheckCircle2 className="w-5 h-5" />
                      <span>Accepted — All {runResults.passed} Test Cases Passed!</span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-1">
                      {runResults.cases.map((c, i) => (
                        <div key={i} className="p-2.5 rounded-lg bg-slate-950 border border-slate-800">
                          <div className="flex items-center justify-between mb-1">
                            <span className="font-bold text-slate-300">Testcase {i + 1}</span>
                            <span className="text-[10px] text-emerald-400 font-bold px-1.5 py-0.2 rounded bg-emerald-500/20">
                              Passed ({c.runtime})
                            </span>
                          </div>
                          <div className="text-[11px] text-slate-400 truncate">In: {c.input}</div>
                          <div className="text-[11px] text-emerald-400 font-bold">Out: {c.actual}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-slate-500 text-center py-6">
                    Click <strong>"Run Code"</strong> to test your solution against predefined cases.
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Code Submission Modal */}
      <Modal
        isOpen={showSubmitModal}
        onClose={() => setShowSubmitModal(false)}
        title="Code Submitted Successfully!"
        subtitle="Full test suite passed with optimal time and space complexity"
        maxWidth="max-w-md"
      >
        <div className="space-y-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-2 ring-8 ring-emerald-500/10">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-left pt-2">
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Test Cases</span>
              <span className="text-lg font-bold text-white">4 / 4 Passed</span>
              <span className="text-[10px] text-emerald-400 font-semibold block">100% Pass Rate</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Coding Score</span>
              <span className="text-lg font-bold text-brand-400">95 / 100</span>
              <span className="text-[10px] text-brand-300 font-semibold block">Top 4% Percentile</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Execution Runtime</span>
              <span className="text-lg font-bold text-white">38 ms</span>
              <span className="text-[10px] text-emerald-400 font-semibold block">Faster than 96.4%</span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Code Quality</span>
              <span className="text-lg font-bold text-white">96%</span>
              <span className="text-[10px] text-emerald-400 font-semibold block">O(n) Optimal Solution</span>
            </div>
          </div>

          <p className="text-xs text-slate-400 leading-relaxed pt-2">
            Your technical coding round is complete. All benchmarks have been combined with your resume parsing and AI voice interview scores to generate your executive SaaS evaluation report.
          </p>

          <Button
            variant="primary"
            size="lg"
            className="w-full mt-4 font-bold shadow-xl shadow-brand-500/25"
            onClick={handleNavigateToReport}
            icon={Award}
          >
            View Final Assessment Report
          </Button>
        </div>
      </Modal>
    </div>
  );
}
