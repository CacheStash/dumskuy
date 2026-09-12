import React from 'react';
import { Key, Moon, Sun, Sparkles, Cpu, Layers } from 'lucide-react';
import { ApiProvider } from '../types';

interface HeaderProps {
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenApiKeyModal: () => void;
  hasApiKey: boolean;
  provider: ApiProvider;
  model: string;
}

export const Header: React.FC<HeaderProps> = ({
  isDark,
  onToggleTheme,
  onOpenApiKeyModal,
  hasApiKey,
  provider,
  model,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-slate-200/80 dark:border-studio-800 bg-white/80 dark:bg-studio-950/80 backdrop-blur-md transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 via-brand-500 to-indigo-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/25">
            <span className="font-serif font-black text-xl tracking-tighter">D</span>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight text-slate-900 dark:text-white font-display">
                DumSkuy
              </span>
              <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20">
                Type Mockup Copy
              </span>
            </div>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block">
              Contextual dummy text & font preview for graphic & type designers
            </p>
          </div>
        </div>

        {/* Right action controls */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Online / Fallback status pill */}
          <button
            onClick={onOpenApiKeyModal}
            className={`px-3 py-1.5 rounded-full text-xs font-medium flex items-center gap-2 border transition-all ${
              hasApiKey
                ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                : 'bg-amber-500/10 border-amber-500/30 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
            }`}
            title="Configure Gemini or Groq API key"
          >
            <span className={`w-2 h-2 rounded-full ${hasApiKey ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'}`} />
            <span className="hidden md:inline">
              {hasApiKey ? `Online: ${provider === 'gemini' ? 'Gemini' : 'Groq'} (${model})` : 'Offline Mode (Curated Presets)'}
            </span>
            <span className="md:hidden">
              {hasApiKey ? 'Online' : 'Offline'}
            </span>
            <Key className="w-3.5 h-3.5 opacity-70" />
          </button>

          {/* Theme Toggle */}
          <button
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-studio-850 border border-slate-200/60 dark:border-studio-800 transition-colors"
          >
            {isDark ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
          </button>

          {/* GitHub Repo Link */}
          <a
            href="https://github.com/CacheStash/dumskuy"
            target="_blank"
            rel="noreferrer"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-slate-100 hover:bg-slate-100 dark:hover:bg-studio-850 border border-slate-200/60 dark:border-studio-800 transition-colors"
            title="GitHub Repository"
          >
            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          </a>
        </div>
      </div>
    </header>
  );
};
