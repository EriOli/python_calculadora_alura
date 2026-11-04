import React, { useState } from 'react';
import { FileText, Copy, Check, Download, BookOpen, ExternalLink, Terminal } from 'lucide-react';

interface ReadmeViewerProps {
  onGoToCode?: () => void;
  onGoToTerminal?: () => void;
}

export const ReadmeViewer: React.FC<ReadmeViewerProps> = ({ onGoToCode, onGoToTerminal }) => {
  const [copied, setCopied] = useState(false);

  const handleCopyReadme = async () => {
    try {
      const response = await fetch('/README.md');
      const text = await response.text();
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
            <span>Documentação Oficial</span>
            <span aria-hidden="true">·</span>
            <span>README.md</span>
            <span aria-hidden="true">·</span>
            <span>Guia Completo</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Documentação do Projeto (README.md)
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Manual completo com visão geral, arquitetura do código, instruções de instalação e desafios para praticar.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopyReadme}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer"
          >
            {copied ? (
              <>
                <Check className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-400 font-semibold">Copiado!</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5" />
                <span>Copiar README</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Styled Documentation Card */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 p-6 sm:p-8 space-y-8 shadow-xl text-slate-200">
        {/* Banner Section */}
        <div className="p-6 rounded-xl bg-slate-950 border border-slate-800/80">
          <div className="flex items-center gap-3 mb-2">
            <span className="text-2xl">🧮</span>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Calculadora Básica em Python
            </h1>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            Projeto prático e educativo desenvolvido para programadores iniciantes aprenderem lógica de programação, funções modulares, estruturas de decisão, laços de repetição e tratamento de erros em Python.
          </p>
        </div>

        {/* Index Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-3 flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Conteúdo Teórico & Prático</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono">01.</span>
                <span>As 4 Operações Básicas com Funções (<code className="text-amber-300 font-mono">def</code>)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono">02.</span>
                <span>Diferença entre <code className="text-cyan-300 font-mono">return</code> e <code className="text-cyan-300 font-mono">print()</code></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono">03.</span>
                <span>Proteção contra Divisão por Zero (<code className="text-rose-300 font-mono">ZeroDivisionError</code>)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-amber-400 font-mono">04.</span>
                <span>Conversão de Tipos com <code className="text-emerald-300 font-mono">float(input())</code></span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800/80">
            <h3 className="text-xs font-bold uppercase tracking-wider text-cyan-400 mb-3 flex items-center gap-2">
              <Terminal className="w-4 h-4" />
              <span>Fluxo e Execução</span>
            </h3>
            <ul className="text-xs text-slate-300 space-y-2">
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">05.</span>
                <span>Menu com laço contínuo (<code className="text-purple-300 font-mono">while True</code> e <code className="text-purple-300 font-mono">break</code>)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">06.</span>
                <span>Tratamento de exceções com <code className="text-amber-300 font-mono">try/except ValueError</code></span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">07.</span>
                <span>Como rodar no VS Code, Windows, Mac e Linux</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="text-cyan-400 font-mono">08.</span>
                <span>Desafios propostos para avançar nos estudos</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Section 1: Architecture */}
        <div className="space-y-3">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>Arquitetura do Projeto</span>
          </h2>
          <div className="p-4 rounded-xl bg-slate-950 font-mono text-xs text-slate-300 border border-slate-800 overflow-x-auto whitespace-pre leading-relaxed">
{`calculadora.py
│
├── 1. FUNÇÕES MATEMÁTICAS (Lógica de Negócio)
│   ├── adicionar(a, b)    -> a + b
│   ├── subtrair(a, b)     -> a - b
│   ├── multiplicar(a, b)  -> a * b
│   └── dividir(a, b)      -> a / b (com proteção if b == 0)
│
├── 2. INTERFACE COM O USUÁRIO (Apresentação)
│   └── exibir_menu()      -> Exibe opções de 1 a 5
│
└── 3. CONTROLE DE FLUXO (Programa Principal)
    └── calculadora()
        ├── while True     -> Mantém o programa rodando
        ├── try/except     -> Protege contra digitação de letras
        └── if/elif/else   -> Direciona para a operação correta`}
          </div>
        </div>

        {/* Section 2: Instructions */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-white">
            Como Rodar no seu Computador
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-semibold text-amber-400 block">1. Baixar Python</span>
              <p className="text-slate-400 leading-relaxed">
                Instale pelo site python.org. No Windows, ative "Add Python to PATH".
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-semibold text-amber-400 block">2. Criar calculadora.py</span>
              <p className="text-slate-400 leading-relaxed">
                Cole o código no seu editor (VS Code, PyCharm ou Bloco de Notas).
              </p>
            </div>
            <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <span className="font-semibold text-amber-400 block">3. Executar no Terminal</span>
              <code className="text-emerald-400 font-mono block mt-1">
                python calculadora.py
              </code>
            </div>
          </div>
        </div>

        {/* Action Footnotes */}
        <div className="pt-4 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span className="text-slate-400">
            Arquivo <code className="text-slate-300 font-mono">README.md</code> salvo com sucesso na raiz do projeto!
          </span>
          <div className="flex items-center gap-3">
            {onGoToCode && (
              <button
                onClick={onGoToCode}
                className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Ver Código-Fonte →
              </button>
            )}
            {onGoToTerminal && (
              <button
                onClick={onGoToTerminal}
                className="text-amber-400 hover:text-amber-300 font-medium cursor-pointer"
              >
                Abrir Terminal →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
