import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  MapPin,
  Globe,
  ExternalLink,
  Copy,
  Check,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Filter,
  Layers,
  Wand2,
  RefreshCw,
  Star,
  Compass,
  Bookmark,
  Sliders,
  Type,
  ShieldCheck,
  ShieldAlert,
  HelpCircle,
  ScanSearch
} from 'lucide-react';
import {
  FontNameCandidate,
  FontNameFilterConfig,
  NamingCategory,
  WordCountOption,
  FontSettings,
  ApiProvider
} from '../types';
import { getRegistryCheckerUrls, deepScanFontWithAI, AiDeepCheckResult } from '../services/fontNameService';
import { detectLigatures } from '../data/fontNamePresets';
import { checkFontCollision } from '../data/existingFontsCatalog';

interface FontNameFinderProps {
  candidates: FontNameCandidate[];
  isLoading: boolean;
  onGenerate: (config: FontNameFilterConfig) => void;
  onSelectForSpecimen: (name: string) => void;
  onCopyText: (text: string, label: string) => void;
  fontSettings: FontSettings;
  provider: ApiProvider;
  apiKey?: string;
  model?: string;
}

const ALPHABET = [
  'ANY', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

const PRESET_LIGATURES = ['none', 'ss', 'tt', 'ff', 'fi', 'fl', 'll', 'oo', 'rr', 'st', 'th', 'ee', 'ch', 'ua'];

export const FontNameFinder: React.FC<FontNameFinderProps> = ({
  candidates,
  isLoading,
  onGenerate,
  onSelectForSpecimen,
  onCopyText,
  fontSettings,
  provider,
  apiKey,
  model,
}) => {
  // Filter settings
  const [wordCount, setWordCount] = useState<WordCountOption>('any');
  const [startingLetter, setStartingLetter] = useState<string>('ANY');
  const [targetLigature, setTargetLigature] = useState<string>('none');
  const [customLigature, setCustomLigature] = useState<string>('');
  const [category, setCategory] = useState<NamingCategory>('all');
  
  // Quick direct single checker
  const [manualCheckName, setManualCheckName] = useState<string>('');
  const [manualScanResult, setManualScanResult] = useState<AiDeepCheckResult | null>(null);
  const [isScanningManual, setIsScanningManual] = useState<boolean>(false);

  // Deep scan cache for candidates
  const [deepScanResults, setDeepScanResults] = useState<Record<string, AiDeepCheckResult>>({});
  const [scanningCardId, setScanningCardId] = useState<string | null>(null);

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    try {
      return JSON.parse(localStorage.getItem('dumskuy_font_favorites') || '[]');
    } catch {
      return [];
    }
  });

  const [copiedId, setCopiedId] = useState<string | null>(null);

  const activeLigature = customLigature.trim() ? customLigature.trim().toLowerCase() : targetLigature;

  const handleTriggerGenerate = () => {
    onGenerate({
      wordCount,
      startingLetter,
      targetLigature: activeLigature,
      category,
      count: 12
    });
  };

  const toggleFavorite = (name: string) => {
    setFavorites(prev => {
      const next = prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name];
      localStorage.setItem('dumskuy_font_favorites', JSON.stringify(next));
      return next;
    });
  };

  const handleCopy = (text: string, id: string) => {
    onCopyText(text, 'Font Name');
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 1800);
  };

  // Perform AI Deep Scan on Manual Query
  const handleDeepScanManual = async () => {
    if (!manualCheckName.trim()) return;
    setIsScanningManual(true);
    try {
      const result = await deepScanFontWithAI(manualCheckName, provider, apiKey, model);
      setManualScanResult(result);
    } finally {
      setIsScanningManual(false);
    }
  };

  // Perform AI Deep Scan on a Candidate Card
  const handleDeepScanCard = async (cand: FontNameCandidate) => {
    setScanningCardId(cand.id);
    try {
      const result = await deepScanFontWithAI(cand.name, provider, apiKey, model);
      setDeepScanResults(prev => ({ ...prev, [cand.name]: result }));
    } finally {
      setScanningCardId(null);
    }
  };

  // Manual query check result
  const manualQueryUpper = manualCheckName.trim();
  const localCollision = manualQueryUpper ? checkFontCollision(manualQueryUpper) : null;
  const manualLigs = manualQueryUpper ? detectLigatures(manualCheckName) : [];
  const manualUrls = manualQueryUpper ? getRegistryCheckerUrls(manualCheckName) : null;

  return (
    <div className="space-y-6">
      
      {/* SECTION 1: INSTANT MANUAL CHECKER & HERO */}
      <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-6 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-brand-500" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                Font Name Discovery & Multi-Registry Checker
              </h2>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Verifies names against <strong>1,600+ Google Fonts</strong>, Creative Market, DaFont, and Monotype catalog with 1-click Google search confirmation.
            </p>
          </div>

          {favorites.length > 0 && (
            <div className="flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
              <Star className="w-3.5 h-3.5 fill-amber-500" />
              <span>{favorites.length} Saved Ideas</span>
            </div>
          )}
        </div>

        {/* Instant Search / Check Input */}
        <div className="relative max-w-3xl">
          <div className="relative flex items-center">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              value={manualCheckName}
              onChange={(e) => {
                setManualCheckName(e.target.value);
                setManualScanResult(null);
              }}
              placeholder="Test any font name (e.g. 'Amalfi Coast', 'Santorini', 'Maratua')..."
              className="w-full pl-10 pr-32 py-3 text-sm bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500 text-slate-800 dark:text-slate-100"
            />
            {manualCheckName && (
              <div className="absolute right-2 flex items-center gap-1">
                <button
                  onClick={handleDeepScanManual}
                  disabled={isScanningManual}
                  className="px-2.5 py-1 text-xs font-bold rounded-lg bg-brand-600 hover:bg-brand-500 text-white flex items-center gap-1 shadow-sm transition-all"
                  title="Run AI Deep Scan across Creative Market, DaFont, and MyFonts history"
                >
                  {isScanningManual ? <RefreshCw className="w-3 h-3 animate-spin" /> : <ScanSearch className="w-3 h-3" />}
                  <span>{isScanningManual ? 'Scanning...' : 'AI Deep Scan'}</span>
                </button>
                <button
                  onClick={() => {
                    setManualCheckName('');
                    setManualScanResult(null);
                  }}
                  className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 px-2 py-1"
                >
                  Clear
                </button>
              </div>
            )}
          </div>

          {/* Instant checker results pop-down */}
          {manualQueryUpper && manualUrls && (
            <div className="mt-3 p-4 bg-slate-50 dark:bg-studio-950 rounded-xl border border-slate-200 dark:border-studio-800 space-y-3.5 animate-in fade-in">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div className="flex items-center gap-3">
                  <span
                    style={{ fontFamily: 'var(--specimen-font)' }}
                    className="text-xl sm:text-2xl font-black text-slate-900 dark:text-white"
                  >
                    {manualCheckName}
                  </span>

                  {/* Status Indicator */}
                  {localCollision?.isTaken ? (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>CONFIRMED TAKEN</span>
                    </span>
                  ) : manualScanResult?.isTaken ? (
                    <span className="px-3 py-1 text-xs font-bold rounded-full bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/30 flex items-center gap-1.5">
                      <ShieldAlert className="w-3.5 h-3.5" />
                      <span>TAKEN (AI VERIFIED)</span>
                    </span>
                  ) : (
                    <span className="px-3 py-1 text-xs font-semibold rounded-full bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/30 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      <span>CLEAR IN 1,600+ DATABASE</span>
                    </span>
                  )}
                </div>

                <button
                  onClick={() => onSelectForSpecimen(manualCheckName)}
                  className="text-xs font-semibold text-brand-600 dark:text-brand-400 hover:text-brand-500 flex items-center gap-1"
                >
                  Test in Specimen Sheet <ArrowRight className="w-3 h-3" />
                </button>
              </div>

              {/* Exact collision note */}
              {localCollision?.isTaken && (
                <div className="p-3 bg-rose-500/10 border border-rose-500/20 rounded-xl text-xs text-rose-700 dark:text-rose-300 flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>Existing Font Detected:</strong> {localCollision.sourceNote}
                    <p className="text-[11px] text-rose-600 dark:text-rose-400 mt-0.5">
                      We strongly advise choosing another name to avoid trademark infringement or marketplace rejection.
                    </p>
                  </div>
                </div>
              )}

              {/* AI Deep scan result */}
              {manualScanResult && !localCollision?.isTaken && (
                <div className={`p-3 rounded-xl text-xs border flex items-start gap-2 ${
                  manualScanResult.isTaken
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
                    : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                }`}>
                  <Sparkles className="w-4 h-4 flex-shrink-0 mt-0.5" />
                  <div>
                    <strong>AI Deep Scan Result:</strong> {manualScanResult.details}
                    {manualScanResult.foundryOrDesigner && (
                      <p className="text-[11px] font-mono mt-0.5">Foundry/Creator: {manualScanResult.foundryOrDesigner}</p>
                    )}
                  </div>
                </div>
              )}

              {/* Detected Ligatures */}
              {manualLigs.length > 0 && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  <span>Detected Ligatures:</span>
                  {manualLigs.map(l => (
                    <span key={l} className="px-1.5 py-0.5 rounded bg-brand-500/10 text-brand-600 dark:text-brand-400 font-mono font-bold text-[11px]">
                      [{l}]
                    </span>
                  ))}
                </div>
              )}

              {/* 1-Click Verification Links */}
              <div className="pt-2 border-t border-slate-200/60 dark:border-studio-850">
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">
                  Verify Live on Google & Marketplaces (1-Click Deep Links):
                </p>
                <div className="flex flex-wrap gap-2">
                  {/* Google Search Direct Button */}
                  <a
                    href={manualUrls.googleSearch}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3.5 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold shadow-sm flex items-center gap-1.5 transition-all"
                  >
                    <span>Google: "{manualCheckName}" font</span> <ExternalLink className="w-3 h-3" />
                  </a>

                  <a
                    href={manualUrls.creativeMarket}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-studio-850 border border-slate-200 dark:border-studio-700 text-xs font-medium hover:border-brand-500 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Creative Market</span> <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={manualUrls.dafont}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-studio-850 border border-slate-200 dark:border-studio-700 text-xs font-medium hover:border-brand-500 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>DaFont</span> <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={manualUrls.myfonts}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-studio-850 border border-slate-200 dark:border-studio-700 text-xs font-medium hover:border-brand-500 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>MyFonts</span> <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={manualUrls.googleFonts}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-studio-850 border border-slate-200 dark:border-studio-700 text-xs font-medium hover:border-brand-500 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>Google Fonts</span> <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                  <a
                    href={manualUrls.usptoTrademark}
                    target="_blank"
                    rel="noreferrer"
                    className="px-3 py-1.5 rounded-lg bg-white dark:bg-studio-850 border border-slate-200 dark:border-studio-700 text-xs font-medium hover:border-brand-500 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                  >
                    <span>USPTO Trademark</span> <ExternalLink className="w-3 h-3 text-slate-400" />
                  </a>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SECTION 2: GENERATION PARAMETERS */}
      <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-6 shadow-sm space-y-5">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-studio-800">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-brand-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Font Name Generator Controls (Un-Saturated Gems)
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Searches uncommercialized geographic places & custom ligatures
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          
          {/* CONTROL 1: WORD COUNT (1 Kata vs 2 Kata / 2 Baris) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Word Count (Jumlah Kata)
            </label>
            <div className="grid grid-cols-3 gap-1.5 p-1 bg-slate-100 dark:bg-studio-950 rounded-xl border border-slate-200/60 dark:border-studio-800">
              <button
                type="button"
                onClick={() => setWordCount('single')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  wordCount === 'single'
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                1 Kata
              </button>
              <button
                type="button"
                onClick={() => setWordCount('double')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  wordCount === 'double'
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                2 Kata (2 Baris)
              </button>
              <button
                type="button"
                onClick={() => setWordCount('any')}
                className={`py-2 text-xs font-semibold rounded-lg transition-all ${
                  wordCount === 'any'
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                Bebas (Any)
              </button>
            </div>
            <p className="text-[11px] text-slate-400 mt-1">
              {wordCount === 'single' ? 'Format 1 kata seperti "Maratua", "Passau"' : wordCount === 'double' ? 'Format 2 baris seperti "Maratua Reef", "Valldemossa Stone"' : 'Campuran 1 atau 2 kata'}
            </p>
          </div>

          {/* CONTROL 2: THEME / SOURCE (Inspirasi Nama) */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2">
              Naming Inspiration Source
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value as NamingCategory)}
              className="w-full py-2.5 px-3 text-xs bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">Semua Lokasi & Peta (Global & Nusantara)</option>
              <option value="islands">Pulau & Archipelago (Islands)</option>
              <option value="geography">Kota, Desa & Lembah (Cities, Towns, Maps)</option>
              <option value="nature">Alam, Monolit & Mineral (Nature & Red Rocks)</option>
              <option value="luxury">Atelier Mewah & Kastil (Luxury & Castles)</option>
            </select>
            <p className="text-[11px] text-slate-400 mt-1">
              Fokus pada nama tempat tersembunyi yang belum pernah dipakai font lain.
            </p>
          </div>

          {/* CONTROL 3: TARGET LIGATURE / DOUBLE-LETTER */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                Target Ligature / Double Letter
              </label>
              {activeLigature !== 'none' && (
                <span className="text-[10px] font-mono font-bold text-brand-600 dark:text-brand-400">
                  Target: [{activeLigature}]
                </span>
              )}
            </div>

            <div className="flex flex-wrap gap-1 mb-1.5">
              {PRESET_LIGATURES.map((lig) => (
                <button
                  key={lig}
                  type="button"
                  onClick={() => {
                    setTargetLigature(lig);
                    setCustomLigature('');
                  }}
                  className={`px-2 py-1 text-[11px] font-mono font-bold rounded-md border transition-all ${
                    targetLigature === lig && !customLigature
                      ? 'bg-brand-600 border-brand-600 text-white'
                      : 'bg-slate-50 dark:bg-studio-950 border-slate-200 dark:border-studio-800 text-slate-600 dark:text-slate-400 hover:border-slate-300'
                  }`}
                >
                  {lig === 'none' ? 'None' : lig}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Or custom ligature (misal: 'ck', 'qu', 'gg')..."
              value={customLigature}
              onChange={(e) => setCustomLigature(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs font-mono bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-lg focus:outline-none focus:ring-1 focus:ring-brand-500"
            />
          </div>

        </div>

        {/* STARTING LETTER FILTER */}
        <div className="pt-2 border-t border-slate-100 dark:border-studio-800">
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Filter className="w-3.5 h-3.5 text-brand-500" />
              Starting Letter Constraint
            </label>
            <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold">
              {startingLetter === 'ANY' ? 'Any Letter (Bebas)' : `Diawali Huruf "${startingLetter}"`}
            </span>
          </div>

          <div className="flex flex-wrap gap-1">
            {ALPHABET.map((letter) => {
              const isSelected = startingLetter === letter;
              return (
                <button
                  key={letter}
                  type="button"
                  onClick={() => setStartingLetter(letter)}
                  className={`h-7 px-2 text-[11px] font-mono font-bold rounded-lg border transition-all ${
                    isSelected
                      ? 'bg-brand-600 border-brand-600 text-white shadow-sm'
                      : 'bg-slate-50 dark:bg-studio-950 border-slate-200 dark:border-studio-800 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-studio-700'
                  }`}
                >
                  {letter}
                </button>
              );
            })}
          </div>
        </div>

        {/* GENERATE CTA BUTTON */}
        <div className="pt-2 flex justify-end">
          <button
            type="button"
            onClick={handleTriggerGenerate}
            disabled={isLoading}
            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-brand-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {isLoading ? (
              <>
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Searching Geographic Registries...</span>
              </>
            ) : (
              <>
                <Wand2 className="w-4 h-4" />
                <span>Generate Font Name Candidates</span>
              </>
            )}
          </button>
        </div>

      </div>

      {/* SECTION 3: CANDIDATE RESULTS GRID */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Type className="w-4 h-4 text-brand-500" />
            <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100">
              Font Name Candidates ({candidates.length})
            </h3>
          </div>
          <span className="text-xs text-slate-400">
            Rendered with active font: <strong className="text-slate-700 dark:text-slate-300">{fontSettings.name}</strong>
          </span>
        </div>

        {candidates.length === 0 ? (
          <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-12 text-center">
            <Compass className="w-10 h-10 text-brand-500/40 mx-auto mb-3 animate-pulse" />
            <h4 className="font-bold text-sm text-slate-700 dark:text-slate-200">No candidates generated yet</h4>
            <p className="text-xs text-slate-400 mt-1">
              Adjust your parameters above and click "Generate Font Name Candidates".
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {candidates.map((cand) => {
              const urls = getRegistryCheckerUrls(cand.name);
              const isFav = favorites.includes(cand.name);
              const deepResult = deepScanResults[cand.name];
              const isScanningThis = scanningCardId === cand.id;

              const isTaken = cand.isKnownTaken || deepResult?.isTaken;

              return (
                <div
                  key={cand.id}
                  className={`bg-white dark:bg-studio-900 border rounded-2xl p-5 space-y-3.5 shadow-sm transition-all hover:shadow-md ${
                    isTaken
                      ? 'border-rose-500/40 bg-rose-500/5'
                      : 'border-slate-200 dark:border-studio-800 hover:border-brand-500/40'
                  }`}
                >
                  {/* Card Top: Origin & Favorite */}
                  <div className="flex items-center justify-between text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 font-mono text-[11px] truncate max-w-[80%]">
                      <MapPin className="w-3.5 h-3.5 text-brand-500 flex-shrink-0" />
                      <span className="truncate">{cand.origin}</span>
                    </div>

                    <button
                      onClick={() => toggleFavorite(cand.name)}
                      className={`p-1 rounded-lg transition-colors ${
                        isFav ? 'text-amber-500' : 'text-slate-300 hover:text-slate-500 dark:text-slate-600 dark:hover:text-slate-400'
                      }`}
                      title={isFav ? 'Remove from favorites' : 'Save as favorite'}
                    >
                      <Star className={`w-4 h-4 ${isFav ? 'fill-amber-500' : ''}`} />
                    </button>
                  </div>

                  {/* DISPLAY FONT NAME PREVIEW (Rendered in current preview font!) */}
                  <div className="py-2 border-y border-dashed border-slate-100 dark:border-studio-800/80">
                    <h4
                      style={{
                        fontFamily: 'var(--specimen-font)',
                        letterSpacing: `${fontSettings.letterSpacing}px`,
                      }}
                      className={`text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white transition-all break-words select-all ${
                        cand.wordCount === 2 ? 'leading-tight' : ''
                      }`}
                    >
                      {cand.name}
                    </h4>
                  </div>

                  {/* Meaning & Story */}
                  <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed line-clamp-2">
                    {cand.meaning}
                  </p>

                  {/* Collision Notice */}
                  {cand.isKnownTaken && cand.knownFontNote && (
                    <div className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-500/20 text-[11px] text-rose-700 dark:text-rose-300">
                      <strong>Existing Font Match:</strong> {cand.knownFontNote}
                    </div>
                  )}

                  {/* Deep Scan Result note */}
                  {deepResult && !cand.isKnownTaken && (
                    <div className={`p-2 rounded-xl text-[11px] border ${
                      deepResult.isTaken
                        ? 'bg-rose-500/10 border-rose-500/20 text-rose-700 dark:text-rose-300'
                        : 'bg-emerald-500/10 border-emerald-500/20 text-emerald-700 dark:text-emerald-300'
                    }`}>
                      <strong>AI Scan:</strong> {deepResult.details}
                    </div>
                  )}

                  {/* Ligature & Word Count Badges */}
                  <div className="flex flex-wrap items-center gap-1.5">
                    <span className="px-2 py-0.5 rounded text-[10px] font-mono font-semibold bg-slate-100 dark:bg-studio-800 text-slate-600 dark:text-slate-300">
                      {cand.wordCount === 2 ? '2 Words' : '1 Word'}
                    </span>

                    {cand.matchedLigatures && cand.matchedLigatures.length > 0 && cand.matchedLigatures.map(lig => (
                      <span
                        key={lig}
                        className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20"
                        title={`Ligature opportunity for '${lig}'`}
                      >
                        ligature: {lig}
                      </span>
                    ))}

                    {isTaken ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20 flex items-center gap-1">
                        <AlertTriangle className="w-2.5 h-2.5" /> Taken / Existing Font
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                        <CheckCircle2 className="w-2.5 h-2.5" /> Clear in Catalog
                      </span>
                    )}
                  </div>

                  {/* PRIMARY GOOGLE SEARCH BUTTON (The definitive check for type designers) */}
                  <div className="pt-2 border-t border-slate-100 dark:border-studio-800/80 space-y-2">
                    <div className="flex items-center justify-between">
                      <a
                        href={urls.googleSearch}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-2 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 dark:bg-studio-750 dark:hover:bg-studio-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-xs transition-colors"
                        title="Search Google for existing font releases"
                      >
                        <Search className="w-3.5 h-3.5 text-indigo-400" />
                        <span>Google Check: "{cand.name}" font</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    </div>

                    {/* Secondary marketplace links */}
                    <div className="flex flex-wrap gap-1">
                      <a
                        href={urls.creativeMarket}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[10px] rounded-md bg-slate-50 dark:bg-studio-800 hover:bg-slate-100 dark:hover:bg-studio-750 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-studio-700 flex items-center gap-1"
                      >
                        <span>Creative Market</span> <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <a
                        href={urls.dafont}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[10px] rounded-md bg-slate-50 dark:bg-studio-800 hover:bg-slate-100 dark:hover:bg-studio-750 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-studio-700 flex items-center gap-1"
                      >
                        <span>DaFont</span> <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <a
                        href={urls.myfonts}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[10px] rounded-md bg-slate-50 dark:bg-studio-800 hover:bg-slate-100 dark:hover:bg-studio-750 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-studio-700 flex items-center gap-1"
                      >
                        <span>MyFonts</span> <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>
                      <a
                        href={urls.usptoTrademark}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 py-1 text-[10px] rounded-md bg-slate-50 dark:bg-studio-800 hover:bg-slate-100 dark:hover:bg-studio-750 text-slate-600 dark:text-slate-300 border border-slate-200/60 dark:border-studio-700 flex items-center gap-1"
                      >
                        <span>Trademark</span> <ExternalLink className="w-2.5 h-2.5 opacity-50" />
                      </a>

                      {/* AI Deep Scan per card button */}
                      <button
                        onClick={() => handleDeepScanCard(cand)}
                        disabled={isScanningThis}
                        className="px-2 py-1 text-[10px] rounded-md bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100 border border-brand-500/20 flex items-center gap-1 ml-auto"
                        title="Ask AI to cross-reference commercial font databases"
                      >
                        {isScanningThis ? <RefreshCw className="w-2.5 h-2.5 animate-spin" /> : <ScanSearch className="w-2.5 h-2.5" />}
                        <span>AI Scan</span>
                      </button>
                    </div>
                  </div>

                  {/* Actions Bar: Copy & Test in Specimen */}
                  <div className="pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-studio-800">
                    <button
                      onClick={() => handleCopy(cand.name, cand.id)}
                      className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-studio-800 hover:bg-slate-200 dark:hover:bg-studio-750 text-slate-700 dark:text-slate-200 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedId === cand.id ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-500" />
                          <span>Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          <span>Copy Name</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSelectForSpecimen(cand.name)}
                      className="px-3 py-1.5 text-xs font-bold rounded-lg bg-brand-50 dark:bg-brand-950/40 text-brand-600 dark:text-brand-400 hover:bg-brand-100 dark:hover:bg-brand-900/40 border border-brand-500/20 flex items-center gap-1.5 transition-all"
                    >
                      <span>Test in Specimen</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>

                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
