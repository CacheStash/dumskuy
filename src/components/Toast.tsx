import React from 'react';
import { Check, Info, AlertTriangle } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'success' | 'info' | 'warning';
  title: string;
  description?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
}

export const ToastContainer: React.FC<ToastProps> = ({ toasts, onDismiss }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-2 pointer-events-none max-w-sm w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto flex items-start gap-3 p-3.5 bg-slate-900/95 dark:bg-studio-800/95 text-white border border-slate-700/60 rounded-xl shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2 fade-in duration-200"
          onClick={() => onDismiss(toast.id)}
        >
          <div className="p-1 rounded-lg bg-emerald-500/20 text-emerald-400 mt-0.5">
            {toast.type === 'success' ? (
              <Check className="w-3.5 h-3.5" />
            ) : toast.type === 'warning' ? (
              <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
            ) : (
              <Info className="w-3.5 h-3.5 text-sky-400" />
            )}
          </div>
          <div className="flex-1">
            <h4 className="text-xs font-semibold">{toast.title}</h4>
            {toast.description && (
              <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{toast.description}</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
