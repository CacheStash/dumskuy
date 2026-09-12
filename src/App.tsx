import React, { useState, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { SidebarControls } from './components/SidebarControls';
import { FontUploader } from './components/FontUploader';
import { SpecimenPreview } from './components/SpecimenPreview';
import { ApiKeyModal } from './components/ApiKeyModal';
import { ToastContainer, ToastMessage } from './components/Toast';
import {
  GenerationConfig,
  GeneratedSpecimen,
  FontSettings,
  ApiProvider,
  DesignEra,
  AssetType
} from './types';
import { generateContent } from './services/generatorService';

export function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    const saved = localStorage.getItem('dumskuy_theme');
    if (saved) return saved === 'dark';
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // API credentials from localStorage
  const [geminiKey, setGeminiKey] = useState<string>(() => localStorage.getItem('dumskuy_gemini_key') || '');
  const [groqKey, setGroqKey] = useState<string>(() => localStorage.getItem('dumskuy_groq_key') || '');
  const [provider, setProvider] = useState<ApiProvider>(() => (localStorage.getItem('dumskuy_provider') as ApiProvider) || 'gemini');
  const [model, setModel] = useState<string>(() => localStorage.getItem('dumskuy_model') || 'gemini-1.5-flash');
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Configuration state
  const [config, setConfig] = useState<GenerationConfig>({
    era: 'retro-americana',
    assetType: 'badge-emblem',
    startingLetter: 'ANY',
    length: 'medium',
    language: 'en',
    provider: 'gemini',
    apiKey: '',
    model: 'gemini-1.5-flash',
  });

  // Font styling state
  const [fontSettings, setFontSettings] = useState<FontSettings>({
    name: 'Outfit',
    isCustom: false,
    fontSize: 44,
    letterSpacing: 1,
    lineHeight: 1.15,
    textTransform: 'uppercase',
    textAlign: 'center',
  });

  // Specimen result state
  const [specimen, setSpecimen] = useState<GeneratedSpecimen | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (type: 'success' | 'info' | 'warning', title: string, description?: string) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, type, title, description }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Sync theme with HTML class
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dumskuy_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dumskuy_theme', 'light');
    }
  }, [isDark]);

  // Keep config API key synced with credentials
  useEffect(() => {
    const activeKey = provider === 'gemini' ? geminiKey : groqKey;
    setConfig((prev) => ({
      ...prev,
      provider,
      apiKey: activeKey,
      model,
    }));
  }, [geminiKey, groqKey, provider, model]);

  // Handler to generate copy
  const handleGenerate = useCallback(async () => {
    setIsLoading(true);
    const activeKey = provider === 'gemini' ? geminiKey : groqKey;
    
    const activeConfig: GenerationConfig = {
      ...config,
      provider,
      apiKey: activeKey,
      model,
    };

    try {
      const result = await generateContent(activeConfig);
      setSpecimen(result.specimen);

      if (result.error) {
        addToast('warning', 'Using Offline Curated Presets', result.error);
      } else if (result.usedFallback) {
        addToast('info', 'Generated from Curated Dataset', 'Add a free Gemini or Groq key for unlimited real-time AI generation.');
      } else {
        addToast('success', 'Generated with AI', `Rendered using ${result.specimen.providerName}`);
      }
    } catch (e: any) {
      addToast('warning', 'Generation Note', e.message || 'Displaying preset specimen.');
    } finally {
      setIsLoading(false);
    }
  }, [config, provider, geminiKey, groqKey, model]);

  // Initial generation on first mount
  useEffect(() => {
    handleGenerate();
  }, []);

  // Keyboard shortcut Ctrl+Enter / Cmd+Enter
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
        e.preventDefault();
        handleGenerate();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleGenerate]);

  // Copy helpers
  const handleCopyText = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      addToast('success', 'Copied to Clipboard', `"${text.slice(0, 30)}${text.length > 30 ? '...' : ''}" (${label})`);
    } catch {
      addToast('warning', 'Clipboard Access Denied', 'Please copy manually.');
    }
  };

  const handleCopyAll = async () => {
    if (!specimen) return;
    const lines = [
      `=== ${specimen.category.toUpperCase()} // ${specimen.style.toUpperCase()} ===`,
      '',
      specimen.headline,
      specimen.sub_headline ? `--- ${specimen.sub_headline} ---` : '',
      specimen.tagline ? `"${specimen.tagline}"` : '',
      '',
      specimen.supporting_details?.length ? `[DETAILS]: ${specimen.supporting_details.join(' • ')}` : '',
      '',
      specimen.body_copy ? `[BODY]:\n${specimen.body_copy}` : '',
    ].filter(Boolean).join('\n');

    try {
      await navigator.clipboard.writeText(lines);
      addToast('success', 'All Specimen Text Copied!', 'Ready to paste directly into Figma, Illustrator, or InDesign.');
    } catch {
      addToast('warning', 'Failed to copy', 'Please check clipboard permissions.');
    }
  };

  const handleCopyJson = async () => {
    if (!specimen) return;
    try {
      await navigator.clipboard.writeText(JSON.stringify(specimen, null, 2));
      addToast('success', 'JSON Copied!', 'Formatted specimen JSON saved to clipboard.');
    } catch {
      addToast('warning', 'Failed to copy', 'Please check clipboard permissions.');
    }
  };

  const handleSaveApiKeys = (keys: { geminiKey: string; groqKey: string; provider: ApiProvider; model: string }) => {
    setGeminiKey(keys.geminiKey);
    setGroqKey(keys.groqKey);
    setProvider(keys.provider);
    setModel(keys.model);

    localStorage.setItem('dumskuy_gemini_key', keys.geminiKey);
    localStorage.setItem('dumskuy_groq_key', keys.groqKey);
    localStorage.setItem('dumskuy_provider', keys.provider);
    localStorage.setItem('dumskuy_model', keys.model);

    const hasKey = keys.provider === 'gemini' ? !!keys.geminiKey : !!keys.groqKey;
    addToast(
      'success',
      'Settings Updated',
      hasKey ? `Online mode enabled with ${keys.provider === 'gemini' ? 'Gemini' : 'Groq'}.` : 'Running in rich offline preset mode.'
    );
  };

  const currentApiKey = provider === 'gemini' ? geminiKey : groqKey;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-studio-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top Navigation */}
      <Header
        isDark={isDark}
        onToggleTheme={() => setIsDark(!isDark)}
        onOpenApiKeyModal={() => setIsApiKeyModalOpen(true)}
        hasApiKey={!!currentApiKey}
        provider={provider}
        model={model}
      />

      {/* Main Studio Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        
        {/* Intro Banner */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 dark:border-studio-800 pb-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-black tracking-tight text-slate-900 dark:text-white font-display">
              Contextual Type Specimen & Copy Generator
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
              Say goodbye to generic "Lorem Ipsum". Generate authentic era-accurate copywriting with live font preview.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400 dark:text-slate-500 font-mono">
              Shortcuts: <kbd className="px-1.5 py-0.5 bg-white dark:bg-studio-800 border border-slate-200 dark:border-studio-700 rounded text-[10px]">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-white dark:bg-studio-800 border border-slate-200 dark:border-studio-700 rounded text-[10px]">Enter</kbd>
            </span>
          </div>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* Left Column: Sidebar Controls (5 Cols on LG) */}
          <div className="lg:col-span-4 xl:col-span-4 space-y-6">
            <SidebarControls
              config={config}
              onChangeConfig={(newCfg) => setConfig((prev) => ({ ...prev, ...newCfg }))}
              onGenerate={handleGenerate}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Live Font Uploader & Specimen Preview (8 Cols on LG) */}
          <div className="lg:col-span-8 xl:col-span-8 space-y-6">
            {/* Live Custom Font Loader & Typography Sliders */}
            <FontUploader
              fontSettings={fontSettings}
              onChangeSettings={(newStg) => setFontSettings((prev) => ({ ...prev, ...newStg }))}
              onCustomFontLoaded={(familyName, fileName) => {
                setFontSettings((prev) => ({
                  ...prev,
                  name: fileName,
                  isCustom: true,
                }));
                addToast('success', 'Custom Font Loaded!', `Now previewing with: ${fileName}`);
              }}
            />

            {/* Specimen Wireframe Card Preview */}
            <SpecimenPreview
              specimen={specimen}
              fontSettings={fontSettings}
              assetType={config.assetType}
              onCopyText={handleCopyText}
              onCopyAll={handleCopyAll}
              onCopyJson={handleCopyJson}
            />
          </div>

        </div>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200/80 dark:border-studio-800 py-6 text-center text-xs text-slate-400 dark:text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>
            DumSkuy — Built for Type Designers, Lettering Artists & Brand Identity Creators.
          </p>
          <p className="font-mono text-[11px]">
            100% Free Client-Side AI & Offline Dataset
          </p>
        </div>
      </footer>

      {/* API Key Modal */}
      <ApiKeyModal
        isOpen={isApiKeyModalOpen}
        onClose={() => setIsApiKeyModalOpen(false)}
        geminiKey={geminiKey}
        groqKey={groqKey}
        provider={provider}
        selectedModel={model}
        onSave={handleSaveApiKeys}
      />

      {/* Toast Notification Container */}
      <ToastContainer toasts={toasts} onDismiss={removeToast} />

    </div>
  );
}
