import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Globe,
  ExternalLink,
  ShieldAlert,
  AlertTriangle,
  RefreshCw,
  Sliders,
  Sparkles,
  Layers,
  Info,
  CheckCircle2,
  X
} from 'lucide-react';
import {
  LiveGoogleSearchResponse,
  GoogleSearchConfig
} from '../types';
import {
  fetchLiveGoogleSearchResults
} from '../services/fontNameService';

interface GoogleSearchWidgetProps {
  initialQuery: string;
  googleConfig: GoogleSearchConfig;
  onSaveConfig: (config: GoogleSearchConfig) => void;
  onClose?: () => void;
}

export const DEFAULT_GOOGLE_CSE_ID = '62498ebe48da649c7';

export const GoogleSearchWidget: React.FC<GoogleSearchWidgetProps> = ({
  initialQuery,
  googleConfig,
  onSaveConfig,
  onClose
}) => {
  const effectiveCseId = (googleConfig.cseId && googleConfig.cseId.trim()) || DEFAULT_GOOGLE_CSE_ID;
  // Sanitize font name from raw quotes or special quote marks
  const cleanFontName = (raw: string) => {
    return (raw || '').replace(/["'“”«»`]/g, '').trim();
  };

  const [activeQuery, setActiveQuery] = useState(() => cleanFontName(initialQuery));
  const [searchSuffix, setSearchSuffix] = useState<'font' | 'broad' | 'dafont' | 'myfonts' | 'creativemarket' | 'all'>('font');
  const [activeTab, setActiveTab] = useState<'cse-embed' | 'serp' | 'quick-links'>('cse-embed');
  
  // Custom API configuration state
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [cseIdInput, setCseIdInput] = useState(effectiveCseId);
  const [apiKeyInput, setApiKeyInput] = useState(googleConfig.apiKey || '');

  // Live SERP Search State
  const [isSearching, setIsSearching] = useState(false);
  const [serpResult, setSerpResult] = useState<LiveGoogleSearchResponse | null>(null);

  const cleanQueryName = cleanFontName(activeQuery);

  // Computed query string based on suffix
  const getFullQuery = () => {
    if (!cleanQueryName) return '';
    if (searchSuffix === 'broad') return `${cleanQueryName} font`;
    if (searchSuffix === 'dafont') return `site:dafont.com "${cleanQueryName}"`;
    if (searchSuffix === 'myfonts') return `site:myfonts.com "${cleanQueryName}"`;
    if (searchSuffix === 'creativemarket') return `site:creativemarket.com "${cleanQueryName}" font`;
    if (searchSuffix === 'all') return `"${cleanQueryName}"`;
    return `"${cleanQueryName}" font`;
  };

  const fullQueryString = getFullQuery();

  // Execute query via official Google CSE JavaScript API
  const executeCseQuery = (queryText: string) => {
    if (!queryText.trim()) return;
    try {
      const gsearch = (window as any).google?.search?.cse?.element?.getElement('dumskuy-gsearch');
      if (gsearch) {
        gsearch.execute(queryText);
      } else {
        // Retry after element is attached
        setTimeout(() => {
          const retryGsearch = (window as any).google?.search?.cse?.element?.getElement('dumskuy-gsearch');
          if (retryGsearch) {
            retryGsearch.execute(queryText);
          }
        }, 400);
      }
    } catch (e) {
      console.warn('Google CSE execute notice:', e);
    }
  };

  // Trigger search when query or suffix changes
  const runLiveSearch = async (queryText = fullQueryString) => {
    if (!queryText.trim()) return;
    
    // Also execute query in official Google CSE element
    executeCseQuery(queryText);

    if (googleConfig.apiKey && effectiveCseId) {
      setIsSearching(true);
      try {
        const result = await fetchLiveGoogleSearchResults(
          queryText,
          googleConfig.apiKey,
          effectiveCseId
        );
        setSerpResult(result);
      } finally {
        setIsSearching(false);
      }
    }
  };

  // Perform search on mount or when initial query changes
  useEffect(() => {
    setActiveQuery(cleanFontName(initialQuery));
  }, [initialQuery]);

  useEffect(() => {
    if (cleanQueryName) {
      runLiveSearch();
    }
  }, [cleanQueryName, searchSuffix, effectiveCseId]);

  useEffect(() => {
    if (activeTab === 'cse-embed' && fullQueryString.trim()) {
      executeCseQuery(fullQueryString);
    }
  }, [activeTab]);

  // Load Google CSE script dynamically
  useEffect(() => {
    const scriptId = 'google-cse-script';
    let script = document.getElementById(scriptId) as HTMLScriptElement;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.async = true;
      script.src = `https://cse.google.com/cse.js?cx=${effectiveCseId}`;
      document.body.appendChild(script);
    }

    // Tell Google CSE to re-parse the DOM
    const timer = setTimeout(() => {
      if ((window as any).google?.search?.cse?.element) {
        (window as any).google.search.cse.element.go();
        if (fullQueryString.trim()) {
          executeCseQuery(fullQueryString);
        }
      }
    }, 350);

    return () => clearTimeout(timer);
  }, [effectiveCseId]);

  const handleSaveSettings = () => {
    onSaveConfig({
      cseId: cseIdInput.trim() || DEFAULT_GOOGLE_CSE_ID,
      apiKey: apiKeyInput.trim()
    });
    setIsConfigOpen(false);
  };

  const encodedFullQuery = encodeURIComponent(fullQueryString);
  const directGoogleSearchUrl = `https://www.google.com/search?q=${encodedFullQuery}`;

  return (
    <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-750 rounded-2xl overflow-hidden shadow-xl text-slate-800 dark:text-slate-100 transition-all">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 dark:border-studio-800 flex items-center justify-between bg-slate-50/50 dark:bg-studio-950/40">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center font-black">
            <Globe className="w-4 h-4" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-sm tracking-tight text-slate-900 dark:text-white">
                Live Google Search Inspector
              </h3>
              <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                In-App Live
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Inspect real-time Google search results & marketplace listings for font conflicts
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setIsConfigOpen(!isConfigOpen)}
            className={`p-2 rounded-xl text-xs border flex items-center gap-1.5 transition-colors cursor-pointer ${
              isConfigOpen
                ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-600 dark:text-indigo-400'
                : 'border-slate-200 dark:border-studio-750 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
            title="Configure Google Custom Search API & CSE"
          >
            <Sliders className="w-3.5 h-3.5" />
            <span className="hidden sm:inline font-medium">CSE Config</span>
          </button>
          {onClose && (
            <button
              onClick={onClose}
              className="p-2 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-studio-800 transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Optional Configuration Drawer */}
      {isConfigOpen && (
        <div className="p-4 bg-indigo-50/50 dark:bg-studio-950 border-b border-indigo-100 dark:border-studio-800 space-y-3 animate-in fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-indigo-900 dark:text-indigo-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-indigo-500" />
              Google Custom Search (CSE) Settings
            </h4>
            <a
              href="https://programmablesearchengine.google.com/about/"
              target="_blank"
              rel="noreferrer"
              className="text-[11px] text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
            >
              Get Free CSE ID (30s) <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Google Search Engine ID (cx)
              </label>
              <input
                type="text"
                value={cseIdInput}
                onChange={(e) => setCseIdInput(e.target.value)}
                placeholder="e.g. 0123456789abcdef:0123"
                className="w-full px-3 py-2 bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-600 dark:text-slate-300 mb-1">
                Google Search API Key (Optional)
              </label>
              <input
                type="password"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                placeholder="AIzaSy... (Same as Gemini key or CSE key)"
                className="w-full px-3 py-2 bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-1">
            <p className="text-[11px] text-slate-500 dark:text-slate-400">
              Entering your CSE ID enables automatic in-app JSON parsing and full embedded Google widget rendering.
            </p>
            <button
              onClick={handleSaveSettings}
              className="px-3.5 py-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
            >
              Save Configuration
            </button>
          </div>
        </div>
      )}

      {/* Query Bar & Filters */}
      <div className="p-4 border-b border-slate-100 dark:border-studio-800 space-y-3">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={activeQuery}
              onChange={(e) => setActiveQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && runLiveSearch()}
              placeholder="Search font name..."
              className="w-full pl-9 pr-24 py-2.5 bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm font-medium"
            />
            <button
              onClick={() => runLiveSearch()}
              disabled={isSearching}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1 shadow-xs transition-all cursor-pointer"
            >
              {isSearching ? <RefreshCw className="w-3 h-3 animate-spin" /> : <Search className="w-3 h-3" />}
              <span>Search</span>
            </button>
          </div>

          {/* Direct 1-Click Browser Tab */}
          <a
            href={directGoogleSearchUrl}
            target="_blank"
            rel="noreferrer"
            className="px-3.5 py-2.5 bg-slate-100 dark:bg-studio-800 hover:bg-slate-200 dark:hover:bg-studio-750 text-slate-700 dark:text-slate-200 rounded-xl text-xs font-bold flex items-center gap-1.5 border border-slate-200 dark:border-studio-700 transition-colors"
            title="Open query in Google Search tab"
          >
            <span>Open in Google</span>
            <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
          </a>
        </div>

        {/* Quick Query Filters / Scope Pills */}
        <div className="flex flex-wrap items-center gap-1.5 text-xs">
          <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mr-1">
            Query Mode:
          </span>
          <button
            onClick={() => setSearchSuffix('font')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'font'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            "{cleanQueryName}" font
          </button>
          <button
            onClick={() => setSearchSuffix('broad')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'broad'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            {cleanQueryName} font (Broad)
          </button>
          <button
            onClick={() => setSearchSuffix('dafont')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'dafont'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            site:dafont.com
          </button>
          <button
            onClick={() => setSearchSuffix('myfonts')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'myfonts'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            site:myfonts.com
          </button>
          <button
            onClick={() => setSearchSuffix('creativemarket')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'creativemarket'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            site:creativemarket.com
          </button>
          <button
            onClick={() => setSearchSuffix('all')}
            className={`px-2.5 py-1 rounded-lg font-medium transition-all cursor-pointer ${
              searchSuffix === 'all'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
            }`}
          >
            Exact Name Only
          </button>
        </div>
      </div>

      {/* Content View Modes Tabs */}
      <div className="flex border-b border-slate-100 dark:border-studio-800 bg-slate-50/50 dark:bg-studio-950/40 px-4 pt-2">
        <button
          onClick={() => setActiveTab('cse-embed')}
          className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'cse-embed'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Globe className="w-3.5 h-3.5" />
          <span>Official Google CSE Widget</span>
        </button>

        <button
          onClick={() => setActiveTab('serp')}
          className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'serp'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Live SERP Analysis</span>
          {serpResult && serpResult.items.length > 0 && (
            <span className="ml-1 px-1.5 py-0.2 rounded-full text-[10px] bg-slate-200 dark:bg-studio-750 text-slate-700 dark:text-slate-300">
              {serpResult.items.length}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('quick-links')}
          className={`pb-2.5 px-3 text-xs font-bold border-b-2 flex items-center gap-1.5 transition-all cursor-pointer ${
            activeTab === 'quick-links'
              ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
              : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
          }`}
        >
          <ExternalLink className="w-3.5 h-3.5" />
          <span>Marketplace Fast-Pass</span>
        </button>
      </div>

      {/* Main Tab Views */}
      <div className="p-5 max-h-[500px] overflow-y-auto space-y-4">
        {/* TAB 1: LIVE SERP RESULTS */}
        {activeTab === 'serp' && (
          <div>
            {/* If CSE credentials are not set */}
            {(!googleConfig.apiKey || !googleConfig.cseId) && !serpResult?.items.length ? (
              <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800/40 text-xs text-amber-800 dark:text-amber-200 space-y-3">
                <div className="flex items-start gap-2.5">
                  <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="font-bold text-sm block">Direct In-App Google Search Setup</strong>
                    <p className="mt-1 leading-relaxed text-slate-600 dark:text-slate-300">
                      To pull and parse live Google Search data directly into DumSkuy without CORS limitations, provide your free Google Custom Search Engine ID (CX) and Search API Key in the config above.
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    onClick={() => setIsConfigOpen(true)}
                    className="px-3.5 py-1.5 bg-amber-600 hover:bg-amber-500 text-white font-bold rounded-lg text-xs shadow-xs transition-colors cursor-pointer"
                  >
                    Open CSE Settings
                  </button>
                  <a
                    href={directGoogleSearchUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 bg-white dark:bg-studio-800 border border-slate-300 dark:border-studio-700 text-slate-700 dark:text-slate-200 font-medium rounded-lg text-xs hover:border-brand-500 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Instant Google Search: "{activeQuery}"</span>
                    <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            ) : null}

            {/* Collision Verdict Banner */}
            {serpResult && (
              <div>
                {serpResult.isCollisionDetected ? (
                  <div className="p-4 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-700 dark:text-rose-300 flex items-start gap-3 mb-4">
                    <ShieldAlert className="w-5 h-5 flex-shrink-0 mt-0.5 text-rose-500" />
                    <div>
                      <strong className="font-bold text-sm">
                        Existing Font Detected on Google Search!
                      </strong>
                      <p className="text-xs mt-1">
                        Active font releases or listings were found matching "{activeQuery}".
                        {serpResult.detectedMarketplaces.length > 0 && (
                          <span className="block mt-1 font-mono text-[11px]">
                            Found on: {serpResult.detectedMarketplaces.join(', ')}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                ) : serpResult.items.length > 0 ? (
                  <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-700 dark:text-emerald-300 flex items-start gap-3 mb-4">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-emerald-500" />
                    <div>
                      <strong className="font-bold text-sm">
                        No Font Marketplace Collisions in Top Results!
                      </strong>
                      <p className="text-xs mt-1">
                        None of the top Google search results matched known font distributors (DaFont, MyFonts, Creative Market, Fontspring, Behance).
                      </p>
                    </div>
                  </div>
                ) : null}

                {/* List of Live Results */}
                <div className="space-y-3">
                  <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                    Google Search Results ({serpResult.items.length} items):
                  </p>
                  {serpResult.items.map((item, idx) => (
                    <div
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        item.isFontMarketplace
                          ? 'bg-rose-50/50 dark:bg-rose-950/10 border-rose-200 dark:border-rose-900/30'
                          : 'bg-slate-50/70 dark:bg-studio-950/50 border-slate-200/80 dark:border-studio-800'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[11px] font-mono text-slate-400 dark:text-slate-500">
                              {item.displayLink}
                            </span>
                            {item.marketplaceName && (
                              <span className="px-1.5 py-0.2 rounded text-[10px] font-bold uppercase bg-rose-500/20 text-rose-700 dark:text-rose-400 font-mono">
                                {item.marketplaceName}
                              </span>
                            )}
                          </div>
                          <a
                            href={item.link}
                            target="_blank"
                            rel="noreferrer"
                            className="text-sm font-bold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                          >
                            <span>{item.title}</span>
                            <ExternalLink className="w-3 h-3 text-slate-400" />
                          </a>
                          <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-2 leading-relaxed">
                            {item.snippet}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 1: OFFICIAL GOOGLE CSE WIDGET */}
        {activeTab === 'cse-embed' && (
          <div className="space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 px-3.5 py-2.5 bg-indigo-50/70 dark:bg-studio-950 rounded-xl border border-indigo-100 dark:border-studio-800 text-xs">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="font-semibold text-slate-700 dark:text-slate-200">
                  CSE ID: <code className="font-mono text-indigo-600 dark:text-indigo-400 font-bold">{effectiveCseId}</code>
                </span>
                <span className="hidden sm:inline text-slate-400">|</span>
                <span className="hidden sm:inline text-slate-500 dark:text-slate-400 font-mono text-[11px]">
                  {fullQueryString}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <a
                  href={directGoogleSearchUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2.5 py-1 bg-white dark:bg-studio-800 hover:bg-slate-100 dark:hover:bg-studio-700 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg text-xs border border-slate-200 dark:border-studio-700 flex items-center gap-1 transition-colors"
                  title="Verify query directly on standard Google Search in a new tab"
                >
                  <span>Verify in Google Web</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Quick guidance banner */}
            <div className="px-3.5 py-2 rounded-xl bg-slate-50 dark:bg-studio-900/60 border border-slate-200/80 dark:border-studio-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2">
              <Info className="w-3.5 h-3.5 text-indigo-500 flex-shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Jika hasil CSE tidak menampilkan data, pastikan pengaturan <strong className="text-slate-700 dark:text-slate-200">"Search the entire web"</strong> aktif di konsol Google CSE Anda, atau klik <strong className="text-indigo-600 dark:text-indigo-400">Verify in Google Web</strong> di atas.
              </p>
            </div>

            {/* Official Google CSE Widget Element */}
            <div className="p-3 bg-white dark:bg-studio-950 rounded-2xl border border-slate-200 dark:border-studio-800 min-h-[380px] overflow-hidden google-cse-wrapper">
              <div
                className="gcse-search"
                data-gname="dumskuy-gsearch"
                data-overlayResults="false"
                data-autoSearchOnLoad="true"
                data-enableAutoComplete="true"
                data-enableHistory="false"
              ></div>
            </div>
          </div>
        )}

        {/* TAB 3: MARKETPLACE FAST-PASS LINKS */}
        {activeTab === 'quick-links' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <a
              href={`https://www.google.com/search?q=${encodeURIComponent(`"${activeQuery}" font`)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-indigo-200 dark:border-indigo-900/40 bg-indigo-50/50 dark:bg-indigo-950/20 hover:border-indigo-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-indigo-700 dark:text-indigo-300 block">Google Web Search</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">"{activeQuery}" font</span>
              </div>
              <ExternalLink className="w-4 h-4 text-indigo-500 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <a
              href={`https://www.dafont.com/search.php?q=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-studio-800 bg-slate-50 dark:bg-studio-950 hover:border-brand-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">DaFont Catalog</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Direct search on dafont.com</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            </a>

            <a
              href={`https://www.myfonts.com/search?query=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-studio-800 bg-slate-50 dark:bg-studio-950 hover:border-brand-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">MyFonts (Monotype)</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Search 100,000+ commercial fonts</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            </a>

            <a
              href={`https://creativemarket.com/search?q=${encodeURIComponent(activeQuery)}+font`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-studio-800 bg-slate-50 dark:bg-studio-950 hover:border-brand-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">Creative Market</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Indie font releases & display styles</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            </a>

            <a
              href={`https://fonts.google.com/?query=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-studio-800 bg-slate-50 dark:bg-studio-950 hover:border-brand-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">Google Fonts</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">Open source font directory</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            </a>

            <a
              href={`https://tmsearch.uspto.gov/search/search-results?searchType=basic&query=${encodeURIComponent(activeQuery)}`}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-xl border border-slate-200 dark:border-studio-800 bg-slate-50 dark:bg-studio-950 hover:border-brand-500 flex items-center justify-between group transition-all"
            >
              <div>
                <span className="font-bold text-xs text-slate-800 dark:text-slate-200 block">USPTO Trademark Registry</span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">United States Patent & Trademark</span>
              </div>
              <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-brand-500 transition-colors" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
