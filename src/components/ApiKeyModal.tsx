import React, { useState } from 'react';
import { X, Key, ExternalLink, CheckCircle2, ShieldCheck, Sparkles, AlertCircle } from 'lucide-react';
import { ApiProvider } from '../types';

interface ApiKeyModalProps {
  isOpen: boolean;
  onClose: () => void;
  geminiKey: string;
  groqKey: string;
  provider: ApiProvider;
  onSave: (keys: { geminiKey: string; groqKey: string; provider: ApiProvider; model: string }) => void;
  selectedModel: string;
}

export const ApiKeyModal: React.FC<ApiKeyModalProps> = ({
  isOpen,
  onClose,
  geminiKey,
  groqKey,
  provider,
  onSave,
  selectedModel,
}) => {
  const [activeTab, setActiveTab] = useState<ApiProvider>(provider);
  const [currentGeminiKey, setCurrentGeminiKey] = useState(geminiKey);
  const [currentGroqKey, setCurrentGroqKey] = useState(groqKey);
  const [model, setModel] = useState(selectedModel);
  const [testStatus, setTestStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle');
  const [testMessage, setTestMessage] = useState('');

  if (!isOpen) return null;

  const handleSave = () => {
    onSave({
      geminiKey: currentGeminiKey.trim(),
      groqKey: currentGroqKey.trim(),
      provider: activeTab,
      model: model,
    });
    onClose();
  };

  const handleClear = () => {
    if (activeTab === 'gemini') {
      setCurrentGeminiKey('');
    } else {
      setCurrentGroqKey('');
    }
  };

  const testApiKey = async () => {
    setTestStatus('testing');
    setTestMessage('Verifying connection...');

    try {
      if (activeTab === 'gemini') {
        if (!currentGeminiKey.trim()) throw new Error('Please enter a Gemini API Key first.');
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${currentGeminiKey.trim()}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ role: 'user', parts: [{ text: 'Respond with: "OK"' }] }]
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error?.message || `HTTP ${res.status}`);
        }
        setTestStatus('success');
        setTestMessage('Google Gemini API Key is valid and active!');
      } else {
        if (!currentGroqKey.trim()) throw new Error('Please enter a Groq API Key first.');
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentGroqKey.trim()}`
          },
          body: JSON.stringify({
            model: 'llama-3.1-8b-instant',
            messages: [{ role: 'user', content: 'test' }],
            max_tokens: 2
          })
        });
        if (!res.ok) {
          const err = await res.json().catch(() => ({}));
          throw new Error(err?.error?.message || `HTTP ${res.status}`);
        }
        setTestStatus('success');
        setTestMessage('Groq Cloud API Key is valid and active!');
      }
    } catch (e: any) {
      setTestStatus('error');
      setTestMessage(e.message || 'Verification failed.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-750 rounded-2xl max-w-lg w-full shadow-2xl overflow-hidden text-slate-800 dark:text-slate-100">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 dark:border-studio-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-brand-500/10 text-brand-500 dark:text-brand-400 flex items-center justify-center">
              <Key className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base tracking-tight">API Key Configuration</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">Use 100% free online AI models (stored locally)</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-studio-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Provider Tabs */}
        <div className="px-6 pt-4 pb-2">
          <div className="flex p-1 bg-slate-100 dark:bg-studio-950 rounded-xl gap-1">
            <button
              onClick={() => {
                setActiveTab('gemini');
                setModel('gemini-1.5-flash');
                setTestStatus('idle');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'gemini'
                  ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Google Gemini (Free)
            </button>
            <button
              onClick={() => {
                setActiveTab('groq');
                setModel('llama-3.3-70b-versatile');
                setTestStatus('idle');
              }}
              className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-all flex items-center justify-center gap-1.5 ${
                activeTab === 'groq'
                  ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                  : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Groq Cloud (Free)
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="px-6 py-3 space-y-4">
          {activeTab === 'gemini' ? (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Gemini API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={currentGeminiKey}
                  onChange={(e) => {
                    setCurrentGeminiKey(e.target.value);
                    setTestStatus('idle');
                  }}
                  placeholder="AIzaSy..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
                {currentGeminiKey && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <a
                  href="https://aistudio.google.com/app/apikey"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 flex items-center gap-1 font-medium underline underline-offset-2"
                >
                  Get 100% Free Gemini API Key <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-400">No credit card required</span>
              </div>
            </div>
          ) : (
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
                Groq API Key
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={currentGroqKey}
                  onChange={(e) => {
                    setCurrentGroqKey(e.target.value);
                    setTestStatus('idle');
                  }}
                  placeholder="gsk_..."
                  className="w-full px-3.5 py-2.5 text-sm bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 font-mono"
                />
                {currentGroqKey && (
                  <button
                    onClick={handleClear}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
                  >
                    Clear
                  </button>
                )}
              </div>
              <div className="mt-2 flex items-center justify-between text-xs">
                <a
                  href="https://console.groq.com/keys"
                  target="_blank"
                  rel="noreferrer"
                  className="text-brand-500 hover:text-brand-600 dark:text-brand-400 flex items-center gap-1 font-medium underline underline-offset-2"
                >
                  Get 100% Free Groq Key <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-400">Ultra-fast free inference</span>
              </div>
            </div>
          )}

          {/* Model Selection */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5">
              Target Model
            </label>
            <select
              value={model}
              onChange={(e) => setModel(e.target.value)}
              className="w-full px-3.5 py-2 text-sm bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {activeTab === 'gemini' ? (
                <>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Fast, Recommended Free)</option>
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash (Next-gen)</option>
                  <option value="gemini-1.5-pro">Gemini 1.5 Pro (Deep reasoning)</option>
                </>
              ) : (
                <>
                  <option value="llama-3.3-70b-versatile">Llama 3.3 70B Versatile (Free)</option>
                  <option value="llama-3.1-8b-instant">Llama 3.1 8B Instant (Ultra-fast)</option>
                </>
              )}
            </select>
          </div>

          {/* Test connection alert */}
          {testStatus !== 'idle' && (
            <div className={`p-3 rounded-xl text-xs flex items-center gap-2 ${
              testStatus === 'testing' ? 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300' :
              testStatus === 'success' ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20' :
              'bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20'
            }`}>
              {testStatus === 'testing' && <div className="w-3 h-3 border-2 border-brand-500 border-t-transparent rounded-full animate-spin" />}
              {testStatus === 'success' && <CheckCircle2 className="w-4 h-4 flex-shrink-0" />}
              {testStatus === 'error' && <AlertCircle className="w-4 h-4 flex-shrink-0" />}
              <span>{testMessage}</span>
            </div>
          )}

          {/* Privacy Note */}
          <div className="p-3 bg-slate-50 dark:bg-studio-950/60 rounded-xl border border-slate-200/60 dark:border-studio-800 flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-emerald-500 flex-shrink-0 mt-0.5" />
            <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
              Your API key is stored <strong>only in your browser’s localStorage</strong> and sent directly to Google/Groq servers via secure HTTPS. If you don't use a key, DumSkuy seamlessly works in rich Offline Fallback Mode.
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-4 bg-slate-50 dark:bg-studio-950/50 border-t border-slate-100 dark:border-studio-800 flex items-center justify-between">
          <button
            type="button"
            onClick={testApiKey}
            disabled={testStatus === 'testing'}
            className="px-3 py-2 text-xs font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-studio-800 rounded-lg transition-colors"
          >
            {testStatus === 'testing' ? 'Testing...' : 'Test Connection'}
          </button>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-medium text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="px-5 py-2 text-xs font-semibold bg-brand-600 hover:bg-brand-500 text-white rounded-xl shadow-md shadow-brand-500/20 transition-all active:scale-95"
            >
              Save & Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
