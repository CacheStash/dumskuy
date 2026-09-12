import React from 'react';
import { GoogleSearchWidget } from './GoogleSearchWidget';
import { GoogleSearchConfig } from '../types';

interface GoogleSearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  fontName: string;
  googleConfig: GoogleSearchConfig;
  onSaveConfig: (config: GoogleSearchConfig) => void;
}

export const GoogleSearchModal: React.FC<GoogleSearchModalProps> = ({
  isOpen,
  onClose,
  fontName,
  googleConfig,
  onSaveConfig
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-hidden rounded-2xl shadow-2xl animate-in zoom-in-95 duration-150">
        <GoogleSearchWidget
          initialQuery={fontName}
          googleConfig={googleConfig}
          onSaveConfig={onSaveConfig}
          onClose={onClose}
        />
      </div>
    </div>
  );
};
