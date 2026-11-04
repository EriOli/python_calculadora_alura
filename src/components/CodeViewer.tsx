import React, { useState } from 'react';
import { Copy, Check, Download, BookOpen, Sparkles, Layers, ArrowRight } from 'lucide-react';
import { MODULAR_PYTHON_CODE, SIMPLE_LINEAR_CODE } from '../data/pythonCode';

interface CodeViewerProps {
  onSelectConcept?: (conceptId: string) => void;
  onOpenSimulator?: () => void;
}

export const CodeViewer: React.FC<CodeViewerProps> = ({ onSelectConcept, onOpenSimulator }) => {
  const [version, setVersion] = useState<'modular' | 'linear'>('modular');
  const [copied, setCopied] = useState(false);
  const [highlightedSection, setHighlightedSection] = useState<string | null>(null);

  const activeCode = version === 'modular' ? MODULAR_PYTHON_CODE : SIMPLE_LINEAR_CODE;
  const lines = activeCode.split('\n');

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(activeCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handleDownload = () => {
    const filename = version === 'modular' ? 'calculadora_modular.py' : 'calculadora_simples.py';
    const blob = new Blob([activeCode], { type: 'text/x-python;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Helper to colorize Python code safely
  const formatCodeLine = (line: string) => {
    if (line.trim().startsWith('#')) {
      return <span className="text-slate-400 italic font-mono">{line}</span>;
    }

    // Split tokens for syntax highlighting
    const parts: React.ReactNode[] = [];
    let remaining = line;
    let keyIdx = 0;

    // Check for inline comment
    let inlineComment = '';
    const commentIndex = remaining.indexOf('  # ');
    if (commentIndex !== -1) {
      inlineComment = remaining.slice(commentIndex);
      remaining = remaining.slice(0, commentIndex);
    }

    // Replace strings
    const stringRegex = /(".*?"|'.*?'|f".*?"|f'.*?')/g;
    const tokens = remaining.split(stringRegex);

    tokens.forEach((token) => {
      if (token.startsWith('"') || token.startsWith("'") || token.startsWith('f"') || token.startsWith("f'")) {
        parts.push(
          <span key={`str-${keyIdx++}`} className="text-emerald-300">
            {token}
          </span>
        );
      } else {
        // Highlight keywords inside regular code
        const words = token.split(/(\b(?:def|return|if|elif|else|while|break|try|except|continue|in|isinstance|float|input|print|True|False)\b|[=+\-*/(),:])/g);
        words.forEach((w) => {
          if (['def', 'return', 'if', 'elif', 'else', 'while', 'break', 'try', 'except', 'continue', 'in'].includes(w)) {
            parts.push(<span key={`kw-${keyIdx++}`} className="text-purple-400 font-semibold">{w}</span>);
          } else if (['float', 'input', 'print', 'isinstance'].includes(w)) {
            parts.push(<span key={`fn-${keyIdx++}`} className="text-cyan-400">{w}</span>);
          } else if (['True', 'False'].includes(w)) {
            parts.push(<span key={`bool-${keyIdx++}`} className="text-amber-400 font-semibold">{w}</span>);
          } else if (/^\d+(\.\d+)?$/.test(w)) {
            parts.push(<span key={`num-${keyIdx++}`} className="text-amber-300">{w}</span>);
          } else if (['adicionar', 'subtrair', 'multiplicar', 'dividir', 'exibir_menu', 'calculadora'].includes(w)) {
            parts.push(<span key={`customfn-${keyIdx++}`} className="text-blue-400 font-medium">{w}</span>);
          } else {
            parts.push(<span key={`txt-${keyIdx++}`} className="text-slate-200">{w}</span>);
          }
        });
      }
    });

    if (inlineComment) {
      parts.push(<span key="inline-comment" className="text-slate-400 italic">{inlineComment}</span>);
    }

    return <span className="font-mono">{parts}</span>;
  };

  return (
    <div className="space-y-6">
      {/* Header and Version Selector */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
            <span>Python 3.10+</span>
            <span aria-hidden="true">·</span>
            <span>PEP 8 Compatível</span>
            <span aria-hidden="true">·</span>
            <span>100% Comentado</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Código-Fonte da Calculadora
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Projetado especialmente para quem está dando os primeiros passos na linguagem Python.
          </p>
        </div>

        {/* Level Switcher (Tabs) */}
        <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg self-start sm:self-auto">
          <button
            onClick={() => setVersion('modular')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              version === 'modular'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Modular (Recomendado)
          </button>
          <button
            onClick={() => setVersion('linear')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all cursor-pointer ${
              version === 'linear'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30 shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            Modo Linear (Nível Zero)
          </button>
        </div>
      </div>

      {/* Explanation Banner */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-amber-400 mb-1">Passo 1: As 4 Operações</div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Funções Dedicadas</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Cada conta possui sua própria função (<code className="text-amber-300 font-mono">def</code>). Isso ensina a modularizar o raciocínio e reaproveitar código.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">adicionar, subtrair...</span>
            <span className="text-emerald-400 font-medium">Reutilizável</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-amber-400 mb-1">Passo 2: Segurança Total</div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Divisão por Zero & Validações</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Evita o erro <code className="text-amber-300 font-mono">ZeroDivisionError</code> e protege com <code className="text-amber-300 font-mono">try/except</code> caso alguém digite letras.
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">if b == 0: return ...</span>
            <span className="text-cyan-400 font-medium">À prova de falhas</span>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 flex flex-col justify-between">
          <div>
            <div className="text-xs font-medium text-amber-400 mb-1">Passo 3: Ciclo Contínuo</div>
            <h3 className="text-sm font-semibold text-white mb-1.5">Laço com while True</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Mantém o menu aberto após cada cálculo, permitindo fazer quantas contas quiser até escolher a opção 5 (Sair).
            </p>
          </div>
          <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs">
            <span className="text-slate-400 font-mono">while True: ... break</span>
            <span className="text-purple-400 font-medium">Interativo</span>
          </div>
        </div>
      </div>

      {/* Code Box */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-2xl">
        {/* Terminal Title Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-slate-950/80 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-3 rounded-full bg-rose-500/80" />
              <div className="w-3 h-3 rounded-full bg-amber-500/80" />
              <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>
            <span className="text-xs font-mono text-slate-400">
              {version === 'modular' ? 'calculadora.py' : 'calculadora_simples.py'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-md transition-colors cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-400" />
                  <span className="text-emerald-400 font-semibold">Copiado!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copiar Código</span>
                </>
              )}
            </button>

            <button
              onClick={handleDownload}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-amber-300 bg-amber-500/10 hover:bg-amber-500/20 border border-amber-500/30 rounded-md transition-colors cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Baixar .py</span>
            </button>
          </div>
        </div>

        {/* Code Content */}
        <div className="p-4 overflow-x-auto text-xs sm:text-sm max-h-[580px] overflow-y-auto leading-relaxed">
          <table className="w-full border-collapse">
            <tbody>
              {lines.map((line, idx) => {
                const lineNum = idx + 1;
                return (
                  <tr key={idx} className="hover:bg-slate-800/30 transition-colors">
                    <td className="w-12 pr-4 text-right select-none text-slate-600 font-mono text-xs tabular-nums">
                      {lineNum}
                    </td>
                    <td className="whitespace-pre py-0.5">
                      {formatCodeLine(line)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer Bar inside Code Box */}
        <div className="px-4 py-3 bg-slate-950/60 border-t border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span>Dica: Experimente testar o código no simulador interativo!</span>
          </div>
          {onOpenSimulator && (
            <button
              onClick={onOpenSimulator}
              className="flex items-center gap-1.5 text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
            >
              <span>Abrir no Terminal Interativo</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
