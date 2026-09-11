import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  Sun,
  Moon,
  Volume2,
  VolumeX,
  RotateCcw,
  User,
  LogOut,
  ChevronDown,
  LayoutDashboard,
  FileText,
  Mic,
  Code2,
  Award,
  Settings,
} from 'lucide-react';
import { useAssessment, STAGES } from '../context/AssessmentContext';

export default function Navbar() {
  const {
    theme,
    toggleTheme,
    soundEnabled,
    toggleSound,
    candidate,
    resetAssessment,
  } = useAssessment();

  const location = useLocation();
  const navigate = useNavigate();
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [isStageMenuOpen, setIsStageMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Resume', path: '/resume-upload', icon: FileText },
    { label: 'AI Interview', path: '/voice-interview', icon: Mic },
    { label: 'Coding Assessment', path: '/coding-assessment', icon: Code2 },
    { label: 'Assessment Report', path: '/assessment-report', icon: Award },
  ];

  const handleReset = () => {
    resetAssessment();
    navigate('/resume-upload');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-slate-800/80 bg-white/80 dark:bg-slate-950/80 backdrop-blur-xl transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand & Logo */}
        <div className="flex items-center gap-6">
          <Link to="/resume-upload" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-indigo-600 to-violet-500 flex items-center justify-center text-white shadow-lg shadow-brand-500/25 ring-1 ring-white/20 group-hover:scale-105 transition-transform">
              <Sparkles className="w-5 h-5 text-brand-100 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-lg text-slate-900 dark:text-white">
                  TalentPulse
                </span>
                <span className="text-xs px-1.5 py-0.5 rounded-md font-bold bg-brand-500/20 text-brand-500 dark:text-brand-400 uppercase tracking-wider border border-brand-500/30">
                  AI
                </span>
              </div>
              <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block -mt-0.5">
                Enterprise Candidate Assessment
              </span>
            </div>
          </Link>

          {/* Nav Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-500/15 text-brand-600 dark:text-brand-400 border border-brand-500/30'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Action Controls & Candidate Avatar */}
        <div className="flex items-center gap-2.5">
          {/* Quick Stage Switcher for Evaluators */}
          <div className="relative">
            <button
              onClick={() => setIsStageMenuOpen(!isStageMenuOpen)}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-slate-200 dark:border-slate-700"
              title="Jump to any stage for testing"
            >
              <LayoutDashboard className="w-3.5 h-3.5 text-brand-500" />
              <span className="hidden sm:inline">Jump Stage</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {isStageMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-56 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsStageMenuOpen(false)}
              >
                <div className="px-3 py-1.5 text-[11px] font-bold text-slate-400 uppercase tracking-wider border-b border-slate-100 dark:border-slate-800">
                  Select Assessment Stage
                </div>
                {STAGES.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => navigate(s.path)}
                    className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors ${
                      location.pathname === s.path
                        ? 'text-brand-500 font-bold bg-brand-500/10'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 flex items-center justify-center text-[10px] font-bold">
                      {s.step}
                    </span>
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Sound Toggle */}
          <button
            onClick={toggleSound}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={soundEnabled ? 'Mute AI Voice audio' : 'Enable AI Voice audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-emerald-500" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>

          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400 hover:rotate-45 transition-transform" />
            ) : (
              <Moon className="w-4 h-4 text-indigo-600 hover:-rotate-12 transition-transform" />
            )}
          </button>

          {/* Reset Demo button */}
          <button
            onClick={handleReset}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            title="Reset assessment session"
          >
            <RotateCcw className="w-4 h-4 text-slate-400 hover:text-brand-400" />
          </button>

          <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1" />

          {/* Candidate Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="flex items-center gap-2.5 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800/80 transition-colors"
            >
              <img
                src={candidate.avatar}
                alt={candidate.name}
                className="w-8 h-8 rounded-full object-cover ring-2 ring-brand-500/40"
              />
              <div className="hidden lg:block text-left pr-1">
                <span className="text-xs font-semibold text-slate-900 dark:text-white block leading-tight">
                  {candidate.name}
                </span>
                <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Candidate Session
                </span>
              </div>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400 hidden sm:block" />
            </button>

            {isProfileMenuOpen && (
              <div
                className="absolute right-0 mt-2 w-64 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl py-2 z-50 animate-in fade-in zoom-in-95 duration-150"
                onClick={() => setIsProfileMenuOpen(false)}
              >
                <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                  <p className="text-xs font-bold text-slate-900 dark:text-white">
                    {candidate.name}
                  </p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate">
                    {candidate.email}
                  </p>
                  <p className="text-[10px] font-medium text-brand-500 dark:text-brand-400 mt-1">
                    {candidate.role}
                  </p>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => navigate('/resume-upload')}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-slate-400" />
                    Candidate Profile
                  </button>
                  <button
                    onClick={() => navigate('/assessment-report')}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <Award className="w-3.5 h-3.5 text-slate-400" />
                    Assessment Report
                  </button>
                  <button
                    onClick={handleReset}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                  >
                    <RotateCcw className="w-3.5 h-3.5 text-slate-400" />
                    Restart Assessment
                  </button>
                </div>

                <div className="border-t border-slate-100 dark:border-slate-800 pt-1 mt-1">
                  <button
                    onClick={handleLogout}
                    className="w-full px-4 py-2 text-xs flex items-center gap-2 text-rose-600 dark:text-rose-400 hover:bg-rose-500/10 transition-colors"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
