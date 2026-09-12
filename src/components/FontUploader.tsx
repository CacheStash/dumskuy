import React, { useRef, useState } from 'react';
import { Upload, Type, Sliders, RotateCcw, Check, Sparkles, AlertCircle } from 'lucide-react';
import { FontSettings } from '../types';

interface FontUploaderProps {
  fontSettings: FontSettings;
  onChangeSettings: (settings: Partial<FontSettings>) => void;
  onCustomFontLoaded: (fontFamilyName: string, fileName: string) => void;
}

const PRESET_FONTS = [
  { name: 'Default Display (Outfit)', value: "'Outfit', sans-serif" },
  { name: 'Editorial Serif (Playfair)', value: "'Playfair Display', serif" },
  { name: 'Classical Roman (Cinzel)', value: "'Cinzel', serif" },
  { name: 'Modern Swiss (Space Grotesk)', value: "'Space Grotesk', sans-serif" },
  { name: 'Vintage Heavy (Bebas Neue)', value: "'Bebas Neue', sans-serif" },
  { name: 'Experimental Brutal (Syne)', value: "'Syne', sans-serif" },
  { name: 'Monospace Code (JetBrains)', value: "'JetBrains Mono', monospace" },
];

export const FontUploader: React.FC<FontUploaderProps> = ({
  fontSettings,
  onChangeSettings,
  onCustomFontLoaded,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [dragOver, setDragOver] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFontFile = async (file: File) => {
    setUploadError(null);
    const validExtensions = ['.otf', '.ttf', '.woff', '.woff2'];
    const fileName = file.name;
    const ext = fileName.slice(fileName.lastIndexOf('.')).toLowerCase();

    if (!validExtensions.includes(ext)) {
      setUploadError('Please drop a valid .otf, .ttf, .woff, or .woff2 font file.');
      return;
    }

    try {
      const buffer = await file.arrayBuffer();
      // Generate unique family name
      const customFamily = `custom-font-${Date.now()}`;
      const fontFace = new FontFace(customFamily, buffer);
      
      const loadedFace = await fontFace.load();
      document.fonts.add(loadedFace);

      // Set CSS variable
      document.documentElement.style.setProperty('--specimen-font', `"${customFamily}", sans-serif`);

      onCustomFontLoaded(customFamily, fileName);
    } catch (err: any) {
      console.error('Font loading error:', err);
      setUploadError('Failed to load font file: ' + (err.message || 'Invalid format'));
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFontFile(e.dataTransfer.files[0]);
    }
  };

  const handleResetFont = () => {
    document.documentElement.style.setProperty('--specimen-font', "'Outfit', sans-serif");
    onChangeSettings({
      name: 'Outfit',
      isCustom: false,
      fontSize: 48,
      letterSpacing: 0,
      lineHeight: 1.15,
      textTransform: 'none',
      textAlign: 'left',
    });
  };

  return (
    <div className="bg-white dark:bg-studio-900 border border-slate-200 dark:border-studio-800 rounded-2xl p-4 sm:p-5 space-y-4 shadow-sm">
      
      {/* Title & Reset */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Type className="w-4 h-4 text-brand-500" />
          <h3 className="font-bold text-sm text-slate-800 dark:text-slate-100 tracking-tight">
            Live Font Preview & Specimen Controls
          </h3>
        </div>
        {fontSettings.isCustom && (
          <button
            onClick={handleResetFont}
            className="text-xs text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 flex items-center gap-1 transition-colors"
            title="Reset to default font"
          >
            <RotateCcw className="w-3 h-3" /> Reset
          </button>
        )}
      </div>

      {/* Drag and Drop Zone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-xl p-4 sm:p-5 text-center cursor-pointer transition-all ${
          dragOver
            ? 'border-brand-500 bg-brand-500/10'
            : fontSettings.isCustom
            ? 'border-emerald-500/40 bg-emerald-500/5'
            : 'border-slate-200 dark:border-studio-750 hover:border-brand-500/60 dark:hover:border-brand-500/60 bg-slate-50/50 dark:bg-studio-950/40'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".otf,.ttf,.woff,.woff2"
          className="hidden"
          onChange={(e) => {
            if (e.target.files && e.target.files[0]) {
              handleFontFile(e.target.files[0]);
            }
          }}
        />

        <div className="flex flex-col items-center justify-center gap-2">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
            fontSettings.isCustom
              ? 'bg-emerald-500/20 text-emerald-600 dark:text-emerald-400'
              : 'bg-brand-500/10 text-brand-500 dark:text-brand-400'
          }`}>
            {fontSettings.isCustom ? <Check className="w-5 h-5" /> : <Upload className="w-5 h-5" />}
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-700 dark:text-slate-200">
              {fontSettings.isCustom ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-mono">
                  Active Font: {fontSettings.name}
                </span>
              ) : (
                'Drop your custom font file here (.otf, .ttf, .woff2)'
              )}
            </p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">
              Instant in-browser rendering. No files are uploaded to any server.
            </p>
          </div>
        </div>
      </div>

      {uploadError && (
        <div className="flex items-center gap-2 text-xs text-rose-500 bg-rose-500/10 p-2.5 rounded-lg border border-rose-500/20">
          <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
          <span>{uploadError}</span>
        </div>
      )}

      {/* Preset Font Selector */}
      <div>
        <label className="block text-[11px] font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-1">
          Or Select Typeface Specimen Style
        </label>
        <select
          value={fontSettings.isCustom ? 'custom' : fontSettings.name}
          onChange={(e) => {
            const val = e.target.value;
            if (val === 'custom') return;
            const chosen = PRESET_FONTS.find(f => f.name === val);
            if (chosen) {
              document.documentElement.style.setProperty('--specimen-font', chosen.value);
              onChangeSettings({ name: chosen.name, isCustom: false });
            }
          }}
          className="w-full text-xs px-3 py-2 bg-slate-50 dark:bg-studio-950 border border-slate-200 dark:border-studio-750 rounded-xl focus:outline-none focus:ring-2 focus:ring-brand-500"
        >
          {fontSettings.isCustom && <option value="custom">Uploaded: {fontSettings.name}</option>}
          {PRESET_FONTS.map(font => (
            <option key={font.name} value={font.name}>{font.name}</option>
          ))}
        </select>
      </div>

      {/* Typography Controls (Sliders & Toggles) */}
      <div className="pt-2 border-t border-slate-100 dark:border-studio-800 space-y-3">
        
        {/* Font Size & Letter Spacing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Font Size (Headline)</span>
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">{fontSettings.fontSize}px</span>
            </div>
            <input
              type="range"
              min="20"
              max="96"
              value={fontSettings.fontSize}
              onChange={(e) => onChangeSettings({ fontSize: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 dark:bg-studio-750 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-400 mb-1">
              <span>Letter Spacing (Tracking)</span>
              <span className="font-mono font-semibold text-brand-600 dark:text-brand-400">{fontSettings.letterSpacing}px</span>
            </div>
            <input
              type="range"
              min="-2"
              max="16"
              step="0.5"
              value={fontSettings.letterSpacing}
              onChange={(e) => onChangeSettings({ letterSpacing: Number(e.target.value) })}
              className="w-full h-1.5 bg-slate-200 dark:bg-studio-750 rounded-lg appearance-none cursor-pointer accent-brand-500"
            />
          </div>
        </div>

        {/* Text Transform & Align */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex items-center gap-1 bg-slate-100 dark:bg-studio-950 p-1 rounded-lg">
            {(['none', 'uppercase', 'lowercase', 'capitalize'] as const).map((t) => (
              <button
                key={t}
                onClick={() => onChangeSettings({ textTransform: t })}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors ${
                  fontSettings.textTransform === t
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {t === 'none' ? 'Aa' : t === 'uppercase' ? 'AA' : t === 'lowercase' ? 'aa' : 'Ab'}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-1 bg-slate-100 dark:bg-studio-950 p-1 rounded-lg">
            {(['left', 'center', 'right'] as const).map((align) => (
              <button
                key={align}
                onClick={() => onChangeSettings({ textAlign: align })}
                className={`px-2.5 py-1 text-[11px] font-semibold rounded-md transition-colors capitalize ${
                  fontSettings.textAlign === align
                    ? 'bg-white dark:bg-studio-800 text-brand-600 dark:text-brand-400 shadow-sm'
                    : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
                }`}
              >
                {align}
              </button>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
