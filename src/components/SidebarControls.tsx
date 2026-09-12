import React from 'react';
import {
  Sparkles,
  Layers,
  FileText,
  Shield,
  Package,
  Store,
  Compass,
  Globe,
  Sliders,
  Filter,
  Flame,
  Wand2,
  RefreshCw
} from 'lucide-react';
import { DesignEra, AssetType, DescriptionLength, Language, GenerationConfig } from '../types';
import { ERA_METADATA, ASSET_TYPES } from '../data/offlinePresets';

interface SidebarControlsProps {
  config: GenerationConfig;
  onChangeConfig: (newConfig: Partial<GenerationConfig>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const ALPHABET = [
  'ANY', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M',
  'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'
];

export const SidebarControls: React.FC<SidebarControlsProps> = ({
  config,
  onChangeConfig,
  onGenerate,
  isLoading,
}) => {
  const eraEntries = Object.values(ERA_METADATA);
  const assetEntries = Object.values(ASSET_TYPES);

  const getAssetIcon = (id: AssetType) => {
    switch (id) {
      case 'logo-wordmark': return Sparkles;
      case 'badge-emblem': return Shield;
      case 'packaging-label': return Package;
      case 'signboard-storefront': return Store;
      case 'editorial-poster': return FileText;
    }
  };

  return (
    <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-5 space-y-6 shadow-sm">
      
      {/* SECTION 1: DESIGN ERA / STYLE */}
      <div>
        <div className="flex items-center justify-between mb-2.5">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-brand-500" />
            1. Design Era / Style
          </label>
          <span className="text-[10px] font-mono text-slate-400">
            {ERA_METADATA[config.era].period}
          </span>
        </div>

        <div className="grid grid-cols-1 gap-1.5">
          {eraEntries.map((era) => {
            const isSelected = config.era === era.id;
            return (
              <button
                key={era.id}
                type="button"
                onClick={() => onChangeConfig({ era: era.id })}
                className={`w-full text-left px-3 py-2.5 rounded-xl border text-xs transition-all flex items-start justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold shadow-sm ring-1 ring-brand-500/20'
                    : 'border-slate-200/80 dark:border-studio-800 hover:border-slate-300 dark:hover:border-studio-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-studio-850'
                }`}
              >
                <div>
                  <div className="flex items-center gap-1.5">
                    <span>{era.label}</span>
                  </div>
                  <p className="text-[10px] font-normal text-slate-400 dark:text-slate-500 mt-0.5 line-clamp-1">
                    {era.vibe}
                  </p>
                </div>
                {isSelected && (
                  <span className="w-2 h-2 rounded-full bg-brand-500 mt-1 flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 2: ASSET TYPE / FORMAT */}
      <div>
        <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5 mb-2.5">
          <Layers className="w-3.5 h-3.5 text-brand-500" />
          2. Asset Type / Format
        </label>

        <div className="grid grid-cols-1 gap-1.5">
          {assetEntries.map((asset) => {
            const isSelected = config.assetType === asset.id;
            const Icon = getAssetIcon(asset.id);
            return (
              <button
                key={asset.id}
                type="button"
                onClick={() => onChangeConfig({ assetType: asset.id })}
                className={`w-full text-left px-3 py-2 rounded-xl border text-xs transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-brand-500 bg-brand-50/50 dark:bg-brand-950/40 text-brand-700 dark:text-brand-300 font-semibold ring-1 ring-brand-500/20'
                    : 'border-slate-200/80 dark:border-studio-800 hover:border-slate-300 dark:hover:border-studio-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-studio-850'
                }`}
              >
                <div className="flex items-center gap-2">
                  <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-brand-500' : 'text-slate-400'}`} />
                  <span>{asset.label}</span>
                </div>
                {isSelected && (
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-500" />
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* SECTION 3: STARTING LETTER FILTER */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-brand-500" />
            3. Starting Letter Filter
          </label>
          <span className="text-[10px] font-mono text-brand-600 dark:text-brand-400 font-bold">
            {config.startingLetter === 'ANY' ? 'Any Letter' : `Starts with "${config.startingLetter}"`}
          </span>
        </div>
        
        <p className="text-[11px] text-slate-400 dark:text-slate-500 mb-2">
          Forces the primary headline / title to start with this letter for targeted font glyph testing.
        </p>

        {/* Alphabet Chips */}
        <div className="flex flex-wrap gap-1">
          {ALPHABET.map((letter) => {
            const isSelected = config.startingLetter === letter;
            return (
              <button
                key={letter}
                type="button"
                onClick={() => onChangeConfig({ startingLetter: letter })}
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

      {/* SECTION 4: LENGTH & LANGUAGE */}
      <div className="grid grid-cols-2 gap-3">
        {/* Description Length */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Length
          </label>
          <div className="flex p-0.5 bg-slate-100 dark:bg-studio-950 rounded-xl border border-slate-200/60 dark:border-studio-800">
            {(['short', 'medium', 'long'] as const).map((len) => (
              <button
                key={len}
                type="button"
                onClick={() => onChangeConfig({ length: len })}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg capitalize transition-colors ${
                  config.length === len
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {len}
              </button>
            ))}
          </div>
        </div>

        {/* Language */}
        <div>
          <label className="block text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-400 mb-1.5">
            Language
          </label>
          <div className="flex p-0.5 bg-slate-100 dark:bg-studio-950 rounded-xl border border-slate-200/60 dark:border-studio-800">
            {(['en', 'id'] as const).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => onChangeConfig({ language: lang })}
                className={`flex-1 py-1.5 text-[11px] font-semibold rounded-lg uppercase transition-colors ${
                  config.language === lang
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {lang === 'en' ? 'EN 🇬🇧' : 'ID 🇮🇩'}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* GENERATE CTA BUTTON */}
      <div className="pt-2">
        <button
          type="button"
          onClick={onGenerate}
          disabled={isLoading}
          className="w-full py-3.5 px-4 bg-gradient-to-r from-brand-600 via-brand-500 to-indigo-600 hover:from-brand-500 hover:to-indigo-500 text-white font-bold text-sm rounded-xl shadow-lg shadow-brand-500/25 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
        >
          {isLoading ? (
            <>
              <RefreshCw className="w-4 h-4 animate-spin" />
              <span>Generating Authentic Copy...</span>
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4" />
              <span>Generate New Specimen</span>
            </>
          )}
        </button>
        <p className="text-[10px] text-center text-slate-400 dark:text-slate-500 mt-2">
          Press <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-studio-800 border border-slate-200 dark:border-studio-700 rounded text-[9px] font-mono">Ctrl</kbd> + <kbd className="px-1.5 py-0.5 bg-slate-100 dark:bg-studio-800 border border-slate-200 dark:border-studio-700 rounded text-[9px] font-mono">Enter</kbd> to quick generate
        </p>
      </div>

    </div>
  );
};
