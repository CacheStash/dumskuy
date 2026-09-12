import React, { useState } from 'react';
import {
  Copy,
  Check,
  Code2,
  Maximize2,
  Sparkles,
  Shield,
  Package,
  Store,
  FileText,
  Clock,
  Layers,
  CheckCheck,
  Grid,
  Eye
} from 'lucide-react';
import { GeneratedSpecimen, FontSettings, AssetType } from '../types';

interface SpecimenPreviewProps {
  specimen: GeneratedSpecimen | null;
  fontSettings: FontSettings;
  assetType: AssetType;
  onCopyText: (text: string, label: string) => void;
  onCopyAll: () => void;
  onCopyJson: () => void;
}

export const SpecimenPreview: React.FC<SpecimenPreviewProps> = ({
  specimen,
  fontSettings,
  assetType,
  onCopyText,
  onCopyAll,
  onCopyJson,
}) => {
  const [showRulers, setShowRulers] = useState(true);
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  if (!specimen) {
    return (
      <div className="h-full min-h-[450px] flex flex-col items-center justify-center p-8 bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl text-center">
        <div className="w-16 h-16 rounded-2xl bg-brand-500/10 text-brand-500 flex items-center justify-center mb-4">
          <Sparkles className="w-8 h-8 animate-pulse" />
        </div>
        <h3 className="text-lg font-bold text-slate-800 dark:text-slate-100">Ready to Generate</h3>
        <p className="text-xs text-slate-400 dark:text-slate-500 max-w-sm mt-1">
          Select your typography era, asset format, or starting letter on the left, then click "Generate New Specimen".
        </p>
      </div>
    );
  }

  const handleCopy = (text: string, key: string, label: string) => {
    onCopyText(text, label);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 1800);
  };

  // Dynamic style for the headline / primary display element
  const headlineStyle: React.CSSProperties = {
    fontFamily: 'var(--specimen-font)',
    fontSize: `${fontSettings.fontSize}px`,
    letterSpacing: `${fontSettings.letterSpacing}px`,
    lineHeight: fontSettings.lineHeight,
    textTransform: fontSettings.textTransform,
    textAlign: fontSettings.textAlign,
  };

  return (
    <div className="space-y-4">
      
      {/* Specimen Sheet Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl px-5 py-3 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono font-bold text-slate-700 dark:text-slate-200">
            {specimen.category}
          </span>
          <span className="text-slate-300 dark:text-studio-700">|</span>
          <span className="text-xs text-slate-500 dark:text-slate-400">
            {specimen.style}
          </span>
          {specimen.source === 'preset' ? (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-slate-100 dark:bg-studio-800 text-slate-500 dark:text-slate-400 border border-slate-200/60 dark:border-studio-750">
              Curated Preset
            </span>
          ) : (
            <span className="text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 rounded-full bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/30">
              AI {specimen.providerName || 'Online'}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Toggle Type Rulers */}
          <button
            onClick={() => setShowRulers(!showRulers)}
            className={`px-2.5 py-1.5 rounded-xl text-xs font-medium border flex items-center gap-1.5 transition-colors ${
              showRulers
                ? 'bg-brand-500/10 border-brand-500/30 text-brand-600 dark:text-brand-400'
                : 'border-slate-200 dark:border-studio-800 text-slate-500 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
            title="Toggle typography grid & metrics guides"
          >
            <Grid className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Grid Guides</span>
          </button>

          {/* Copy JSON */}
          <button
            onClick={onCopyJson}
            className="px-2.5 py-1.5 rounded-xl text-xs font-medium border border-slate-200 dark:border-studio-800 hover:border-slate-300 dark:hover:border-studio-700 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-studio-850 flex items-center gap-1.5 transition-colors"
            title="Copy as raw JSON data"
          >
            <Code2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">JSON</span>
          </button>

          {/* Copy All */}
          <button
            onClick={onCopyAll}
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-brand-600 hover:bg-brand-500 text-white shadow-sm shadow-brand-500/20 flex items-center gap-1.5 transition-all active:scale-95"
            title="Copy all specimen texts to clipboard"
          >
            <Copy className="w-3.5 h-3.5" />
            <span>Copy All</span>
          </button>
        </div>
      </div>

      {/* Main Specimen Sheet (Wireframe Layout) */}
      <div className={`relative bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-6 sm:p-10 shadow-lg overflow-hidden transition-all ${
        showRulers ? 'bg-grid-pattern-light dark:bg-grid-pattern-dark' : ''
      }`}>
        
        {/* Specimen Meta Tag Header */}
        <div className="flex items-center justify-between pb-6 mb-8 border-b border-dashed border-slate-200 dark:border-studio-800 font-mono text-[11px] text-slate-400 dark:text-slate-500">
          <div className="flex items-center gap-4">
            <span>DUMSKUY // SPECIMEN NO. #{Math.floor(Math.random() * 8999 + 1000)}</span>
            <span className="hidden sm:inline">PT: {fontSettings.fontSize}px</span>
            <span className="hidden sm:inline">TRACK: {fontSettings.letterSpacing}px</span>
          </div>
          <div className="flex items-center gap-2">
            <span>FONT: {fontSettings.name}</span>
          </div>
        </div>

        {/* Specimen Content Layouts */}
        <div className="space-y-8">
          
          {/* Supporting Details Badges (Arch Header or Meta Pills) */}
          {specimen.supporting_details && specimen.supporting_details.length > 0 && (
            <div className={`flex flex-wrap items-center gap-2 ${
              fontSettings.textAlign === 'center' ? 'justify-center' : fontSettings.textAlign === 'right' ? 'justify-end' : 'justify-start'
            }`}>
              {specimen.supporting_details.map((detail, idx) => (
                <div
                  key={idx}
                  className="group relative inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-slate-100 dark:bg-studio-800/80 border border-slate-200/80 dark:border-studio-750 text-xs font-mono font-semibold text-slate-600 dark:text-slate-300 transition-all hover:border-brand-500/40"
                >
                  <span>{detail}</span>
                  <button
                    onClick={() => handleCopy(detail, `detail-${idx}`, 'Detail item')}
                    className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-brand-500 transition-opacity ml-1"
                    title="Copy detail"
                  >
                    {copiedKey === `detail-${idx}` ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3" />}
                  </button>
                </div>
              ))}
            </div>
          )}

          {/* Sub-headline (Arch / Descriptor / Pre-title) */}
          {specimen.sub_headline && (
            <div className="group relative">
              <p
                className={`text-xs sm:text-sm font-mono tracking-widest uppercase font-bold text-slate-500 dark:text-slate-400 ${
                  fontSettings.textAlign === 'center' ? 'text-center' : fontSettings.textAlign === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                {specimen.sub_headline}
              </p>
              <button
                onClick={() => handleCopy(specimen.sub_headline, 'sub_headline', 'Sub-headline')}
                className="absolute -right-2 top-0 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-white dark:bg-studio-800 border border-slate-200 dark:border-studio-700 shadow-sm transition-opacity"
                title="Copy sub-headline"
              >
                {copiedKey === 'sub_headline' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400 hover:text-brand-500" />}
              </button>
            </div>
          )}

          {/* MAIN HEADLINE (HERO DISPLAY ELEMENT) */}
          <div className="group relative py-2">
            <h1
              style={headlineStyle}
              className="font-extrabold text-slate-900 dark:text-white transition-all break-words select-all"
            >
              {specimen.headline}
            </h1>

            {/* Quick floating copy button for headline */}
            <button
              onClick={() => handleCopy(specimen.headline, 'headline', 'Main headline')}
              className="absolute right-0 top-2 opacity-0 group-hover:opacity-100 p-2 rounded-xl bg-white/90 dark:bg-studio-800/90 backdrop-blur-sm border border-slate-200 dark:border-studio-700 shadow-md transition-all hover:scale-105"
              title="Copy main headline"
            >
              {copiedKey === 'headline' ? (
                <div className="flex items-center gap-1.5 text-xs text-emerald-600 dark:text-emerald-400 font-sans font-semibold">
                  <Check className="w-3.5 h-3.5" /> Copied
                </div>
              ) : (
                <div className="flex items-center gap-1.5 text-xs text-slate-600 dark:text-slate-300 font-sans">
                  <Copy className="w-3.5 h-3.5" /> Copy Headline
                </div>
              )}
            </button>
          </div>

          {/* Tagline / Motto */}
          {specimen.tagline && (
            <div className="group relative pt-1">
              <p
                className={`text-sm sm:text-base italic font-serif text-slate-600 dark:text-slate-300 ${
                  fontSettings.textAlign === 'center' ? 'text-center' : fontSettings.textAlign === 'right' ? 'text-right' : 'text-left'
                }`}
              >
                "{specimen.tagline}"
              </p>
              <button
                onClick={() => handleCopy(specimen.tagline, 'tagline', 'Tagline')}
                className="absolute -right-2 top-1 opacity-0 group-hover:opacity-100 p-1 rounded-md bg-white dark:bg-studio-800 border border-slate-200 dark:border-studio-700 shadow-sm transition-opacity"
                title="Copy tagline"
              >
                {copiedKey === 'tagline' ? <Check className="w-3 h-3 text-emerald-500" /> : <Copy className="w-3 h-3 text-slate-400 hover:text-brand-500" />}
              </button>
            </div>
          )}

          {/* Body Narrative Copy (if requested) */}
          {specimen.body_copy && (
            <div className="group relative pt-4 border-t border-slate-100 dark:border-studio-800/80">
              <p className={`text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed max-w-3xl ${
                fontSettings.textAlign === 'center' ? 'mx-auto text-center' : fontSettings.textAlign === 'right' ? 'ml-auto text-right' : 'text-left'
              }`}>
                {specimen.body_copy}
              </p>
              <button
                onClick={() => handleCopy(specimen.body_copy!, 'body_copy', 'Body copy')}
                className="absolute right-0 top-4 opacity-0 group-hover:opacity-100 p-1.5 rounded-lg bg-white dark:bg-studio-800 border border-slate-200 dark:border-studio-700 shadow-sm transition-opacity"
                title="Copy body narrative"
              >
                {copiedKey === 'body_copy' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5 text-slate-400 hover:text-brand-500" />
                )}
              </button>
            </div>
          )}

        </div>

        {/* Specimen Sheet Footer Colophon */}
        <div className="mt-12 pt-4 border-t border-slate-100 dark:border-studio-800 flex flex-wrap items-center justify-between text-[10px] font-mono text-slate-400 dark:text-slate-500">
          <div>
            <span>GLYPH SAMPLE: ABCDEFGHIJKLMNOPQRSTUVWXYZ 0123456789 &?!@#$</span>
          </div>
          <div>
            <span>DUMSKUY TYPE SPECIMEN ENGINE // ZERO LOREM IPSUM</span>
          </div>
        </div>

      </div>

    </div>
  );
};
