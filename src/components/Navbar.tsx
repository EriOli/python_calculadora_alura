import React from 'react';
import { Download, Code2, Terminal } from 'lucide-react';
import { MODULAR_PYTHON_CODE } from '../data/pythonCode';

interface NavbarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenHowToRun: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeTab,
  setActiveTab,
  onOpenHowToRun,
}) => {
  const handleDownload = () => {
    const blob = new Blob([MODULAR_PYTHON_CODE], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'calculadora.py');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-8 px-6 py-4">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            setActiveTab('codigo');
          }}
          className="flex items-center gap-2.5 text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 group"
        >
          <div className="w-8 h-8 rounded-lg bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400 group-hover:border-amber-400 transition-colors">
            <Terminal className="w-4 h-4" />
          </div>
          <span>Python CalcLab</span>
        </a>

        {/* Zone 2: 4-5 clean single-line text navigation links */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => setActiveTab('codigo')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'codigo' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Código Fonte
          </button>
          <button
            onClick={() => setActiveTab('simulador')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'simulador' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Terminal Interativo
          </button>
          <button
            onClick={() => setActiveTab('anatomia')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'anatomia' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Anatomia do Código
          </button>
          <button
            onClick={() => setActiveTab('calculadora-visual')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'calculadora-visual' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Calculadora Visual
          </button>
          <button
            onClick={() => setActiveTab('quiz')}
            className={`whitespace-nowrap shrink-0 transition-colors cursor-pointer ${
              activeTab === 'quiz' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Quiz de Fixação
          </button>
          <button
            onClick={onOpenHowToRun}
            className="text-slate-400 hover:text-white whitespace-nowrap shrink-0 transition-colors cursor-pointer"
          >
            Como Rodar
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleDownload}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer shadow-sm"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Baixar calculadora.py</span>
          </button>
        </div>
      </div>
    </header>
  );
};
