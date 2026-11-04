import React, { useState } from 'react';
import { X, Copy, Check, Terminal, ExternalLink, Laptop, Sparkles } from 'lucide-react';
import { STEP_BY_STEP_GUIDE } from '../data/pythonCode';

interface HowToRunModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HowToRunModal: React.FC<HowToRunModalProps> = ({ isOpen, onClose }) => {
  const [copiedCmd, setCopiedCmd] = useState<string | null>(null);

  if (!isOpen) return null;

  const copyToClipboard = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopiedCmd(cmd);
    setTimeout(() => setCopiedCmd(null), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
      <div className="relative w-full max-w-2xl rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-950/60 shrink-0">
          <div className="flex items-center gap-2.5">
            <Laptop className="w-5 h-5 text-amber-400" />
            <div>
              <h3 className="text-base font-bold text-white">
                Como Rodar a Calculadora no seu Computador
              </h3>
              <p className="text-xs text-slate-400">
                Guia simples passo a passo para iniciantes
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 text-sm">
          {/* Step 1 to 4 */}
          <div className="space-y-4">
            {STEP_BY_STEP_GUIDE.map((s, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-amber-400">
                    {s.step}
                  </span>
                  <h4 className="text-sm font-semibold text-white">
                    {s.title}
                  </h4>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Terminal Commands */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-xs font-semibold text-slate-300">
              <Terminal className="w-4 h-4 text-emerald-400" />
              <span>Comandos do Terminal:</span>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                <span>python calculadora.py</span>
                <button
                  onClick={() => copyToClipboard('python calculadora.py')}
                  className="text-slate-400 hover:text-amber-300 cursor-pointer p-1"
                  title="Copiar comando"
                >
                  {copiedCmd === 'python calculadora.py' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>

              <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-900 border border-slate-800 font-mono text-xs text-slate-200">
                <span>python3 calculadora.py  (Mac / Linux)</span>
                <button
                  onClick={() => copyToClipboard('python3 calculadora.py')}
                  className="text-slate-400 hover:text-amber-300 cursor-pointer p-1"
                  title="Copiar comando"
                >
                  {copiedCmd === 'python3 calculadora.py' ? (
                    <Check className="w-3.5 h-3.5 text-emerald-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Online Alternatives */}
          <div className="p-4 rounded-xl bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 space-y-1">
            <div className="font-semibold text-amber-300 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Não quer instalar nada agora?</span>
            </div>
            <p className="leading-relaxed">
              Você pode testar esse mesmo código diretamente no navegador usando sites como o <strong>Google Colab</strong> (colab.research.google.com) ou <strong>Replit</strong> (replit.com). Basta criar um novo notebook/projeto Python e colar o código!
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 bg-slate-950/80 border-t border-slate-800 flex justify-end shrink-0">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            Entendido, fechar
          </button>
        </div>
      </div>
    </div>
  );
};
