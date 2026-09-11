import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  UploadCloud,
  FileText,
  CheckCircle2,
  Trash2,
  RefreshCw,
  Sparkles,
  ArrowRight,
  AlertCircle,
  FileCheck,
  Shield,
  Cpu,
  Layers,
} from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';
import Badge from '../components/Badge';
import ProgressBar from '../components/ProgressBar';
import { useAssessment } from '../context/AssessmentContext';

export default function ResumeUpload() {
  const navigate = useNavigate();
  const { resumeFile, uploadFile, loadSampleResume, removeResume } = useAssessment();

  const [isDragging, setIsDragging] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(resumeFile ? 100 : 0);
  const [isUploading, setIsUploading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const processFile = (file) => {
    setErrorMessage('');
    const validTypes = [
      'application/pdf',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/msword'
    ];
    const isExtensionValid = file.name.endsWith('.pdf') || file.name.endsWith('.docx') || file.name.endsWith('.doc');

    if (!validTypes.includes(file.type) && !isExtensionValid) {
      setErrorMessage('Unsupported file format. Please upload a PDF or DOCX resume.');
      return;
    }

    if (file.size > 15 * 1024 * 1024) {
      setErrorMessage('File exceeds the 15MB size limit.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);

    // Simulate progress animation
    let current = 0;
    const interval = setInterval(() => {
      current += 20;
      if (current >= 100) {
        clearInterval(interval);
        setUploadProgress(100);
        setIsUploading(false);
        uploadFile(file);
      } else {
        setUploadProgress(current);
      }
    }, 120);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInput = (e) => {
    if (e.target.files && e.target.files.length > 0) {
      processFile(e.target.files[0]);
    }
  };

  const handleAnalyzeClick = () => {
    navigate('/resume-analysis');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header Banner */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <Badge variant="brand" size="md" dot className="mb-3">
          Step 2 of 7: Resume Verification
        </Badge>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Upload Your Professional Resume
        </h1>
        <p className="text-sm sm:text-base text-slate-500 dark:text-slate-400 mt-3">
          Our AI parser analyzes your technical stack, architecture depth, and domain experience to curate tailored interview and coding challenges.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Upload Column */}
        <div className="lg:col-span-8 space-y-6">
          <Card className="relative overflow-hidden">
            {/* Error banner */}
            {errorMessage && (
              <div className="mb-4 p-3.5 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900/50 flex items-center gap-2.5 text-xs text-rose-600 dark:text-rose-400 font-medium animate-in fade-in">
                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Dropzone */}
            <div
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center relative ${
                isDragging
                  ? 'border-brand-500 bg-brand-500/10 scale-[0.99]'
                  : 'border-slate-300 dark:border-slate-700/80 hover:border-brand-500/60 bg-slate-50/50 dark:bg-slate-950/40 hover:bg-brand-500/5'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf,.docx,.doc"
                className="hidden"
                onChange={handleFileInput}
              />

              <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4 ring-8 ring-brand-500/5 group-hover:scale-110 transition-transform">
                <UploadCloud className="w-8 h-8 animate-bounce" />
              </div>

              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                Drag and drop your resume file here
              </h3>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-sm">
                Supported formats: <strong>PDF</strong> and <strong>DOCX</strong> (Max 15MB)
              </p>

              <div className="mt-5 flex items-center gap-3">
                <Button
                  variant="secondary"
                  size="sm"
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    fileInputRef.current?.click();
                  }}
                >
                  Browse Local Files
                </Button>
                <span className="text-xs text-slate-400">or</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    loadSampleResume();
                  }}
                  className="text-xs font-semibold text-brand-500 dark:text-brand-400 hover:underline"
                >
                  Load Sample Candidate Resume
                </button>
              </div>
            </div>

            {/* Uploading progress bar */}
            {isUploading && (
              <div className="mt-6 pt-4 border-t border-slate-200 dark:border-slate-800">
                <div className="flex items-center justify-between text-xs mb-2">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5 font-medium">
                    <RefreshCw className="w-3.5 h-3.5 animate-spin text-brand-500" />
                    Uploading and scanning file for security...
                  </span>
                  <span className="text-brand-500 font-bold">{uploadProgress}%</span>
                </div>
                <ProgressBar progress={uploadProgress} color="brand" height="h-2" showValue={false} />
              </div>
            )}

            {/* Uploaded File Info Card */}
            {resumeFile && !isUploading && (
              <div className="mt-6 p-4 rounded-xl bg-slate-100 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-brand-500/15 text-brand-500 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white truncate max-w-[220px] sm:max-w-xs">
                        {resumeFile.name}
                      </span>
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      <span>{resumeFile.size}</span>
                      <span>•</span>
                      <span>{resumeFile.type}</span>
                      <span>•</span>
                      <span className="text-emerald-500 font-medium">Ready for AI Analysis</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-2 text-slate-500 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-700/60 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Replace file"
                  >
                    <RefreshCw className="w-3.5 h-3.5" />
                    <span>Replace</span>
                  </button>

                  <button
                    type="button"
                    onClick={removeResume}
                    className="p-2 text-rose-500 hover:text-rose-600 hover:bg-rose-500/10 rounded-lg text-xs font-semibold transition-colors flex items-center gap-1.5"
                    title="Remove file"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>Remove</span>
                  </button>
                </div>
              </div>
            )}

            {/* Analyze Action Footer */}
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
                <Shield className="w-4 h-4 text-brand-500" />
                <span>GDPR Compliant • Data stored strictly in memory for this session</span>
              </div>

              <Button
                variant="primary"
                size="lg"
                disabled={!resumeFile || isUploading}
                onClick={handleAnalyzeClick}
                icon={Sparkles}
                className="w-full sm:w-auto shadow-xl"
              >
                Analyze Resume with AI
              </Button>
            </div>
          </Card>
        </div>

        {/* Informational Column */}
        <div className="lg:col-span-4 space-y-4">
          <Card className="bg-gradient-to-br from-brand-950/20 via-slate-900/40 to-slate-950/40 border-brand-500/20">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
              <Cpu className="w-4 h-4 text-brand-400" />
              What AI Parser Analyzes
            </h4>
            <ul className="space-y-3 text-xs text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Core Stack:</strong> Synthesizes depth across frontend, backend, databases & DevOps tools.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Architecture Experience:</strong> Discovers concurrency patterns, scaling initiatives & bottlenecks solved.</span>
              </li>
              <li className="flex items-start gap-2.5">
                <FileCheck className="w-4 h-4 text-emerald-400 mt-0.5 flex-shrink-0" />
                <span><strong>Dynamic Question Engine:</strong> Formulates targeted technical questions matching your exact stack.</span>
              </li>
            </ul>
          </Card>

          <Card className="bg-slate-50 dark:bg-slate-900/50">
            <h4 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-2">
              <Layers className="w-4 h-4 text-indigo-400" />
              Assessment Pipeline
            </h4>
            <div className="space-y-2 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-semibold text-slate-700 dark:text-slate-200">1. Resume Analysis</span>
                <span className="text-[10px] text-brand-400 font-bold">~15 sec</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-semibold text-slate-700 dark:text-slate-200">2. AI Voice Interview</span>
                <span className="text-[10px] text-brand-400 font-bold">18 questions</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-semibold text-slate-700 dark:text-slate-200">3. Coding Round</span>
                <span className="text-[10px] text-brand-400 font-bold">LeetCode IDE</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-white dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
                <span className="font-semibold text-slate-700 dark:text-slate-200">4. Executive Report</span>
                <span className="text-[10px] text-emerald-400 font-bold">Comprehensive</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
