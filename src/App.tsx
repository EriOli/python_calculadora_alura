/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CodeViewer } from './components/CodeViewer';
import { TerminalSimulator } from './components/TerminalSimulator';
import { CodeAnatomy } from './components/CodeAnatomy';
import { VisualCalculator } from './components/VisualCalculator';
import { KnowledgeQuiz } from './components/KnowledgeQuiz';
import { HowToRunModal } from './components/HowToRunModal';
import { Terminal, Code, Cpu, Sparkles, BookOpen, CheckCircle, ArrowRight } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<string>('codigo');
  const [isHowToRunOpen, setIsHowToRunOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* 3-Zone Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onOpenHowToRun={() => setIsHowToRunOpen(true)}
      />

      {/* Hero Presentation */}
      <section className="border-b border-slate-800 bg-gradient-to-b from-slate-900/60 to-slate-950 py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2 text-xs text-slate-400">
                <span>Tutorial para Iniciantes</span>
                <span aria-hidden="true">·</span>
                <span>Python 3.10+</span>
                <span aria-hidden="true">·</span>
                <span>As 4 Operações Básicas</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight text-balance">
                Calculadora em Python: Seu Primeiro Projeto Passo a Passo
              </h1>
              <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                Aprenda a estruturar um programa real com as quatro operações matemáticas (adição, subtração, multiplicação e divisão), funções reutilizáveis, prevenção de divisão por zero e tratamento de erros.
              </p>
            </div>

            {/* Quick Highlights Card */}
            <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 shrink-0 md:w-80 space-y-2.5">
              <div className="text-xs font-semibold text-amber-400 uppercase tracking-wider">
                O que você vai dominar:
              </div>
              <ul className="text-xs text-slate-300 space-y-1.5 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Funções com <code className="text-amber-300 font-mono">def</code> e <code className="text-amber-300 font-mono">return</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Entrada de dados com <code className="text-amber-300 font-mono">float(input())</code></span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Proteção contra divisão por zero</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Laço contínuo com <code className="text-amber-300 font-mono">while True</code></span>
                </li>
              </ul>
            </div>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-slate-800">
            <button
              onClick={() => setActiveTab('codigo')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'codigo'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Code className="w-4 h-4" />
              <span>Código Fonte Comentado</span>
            </button>

            <button
              onClick={() => setActiveTab('simulador')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'simulador'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Terminal className="w-4 h-4" />
              <span>Terminal Interativo</span>
            </button>

            <button
              onClick={() => setActiveTab('anatomia')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'anatomia'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Anatomia do Código</span>
            </button>

            <button
              onClick={() => setActiveTab('calculadora-visual')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'calculadora-visual'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Cpu className="w-4 h-4" />
              <span>Calculadora Visual</span>
            </button>

            <button
              onClick={() => setActiveTab('quiz')}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                activeTab === 'quiz'
                  ? 'bg-amber-400 text-slate-950 shadow-sm'
                  : 'bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Sparkles className="w-4 h-4" />
              <span>Quiz de Fixação</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Workspace Stage */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-6 py-8">
        {activeTab === 'codigo' && (
          <CodeViewer
            onSelectConcept={(conceptId) => {
              setActiveTab('anatomia');
            }}
            onOpenSimulator={() => setActiveTab('simulador')}
          />
        )}

        {activeTab === 'simulador' && <TerminalSimulator />}

        {activeTab === 'anatomia' && <CodeAnatomy />}

        {activeTab === 'calculadora-visual' && <VisualCalculator />}

        {activeTab === 'quiz' && <KnowledgeQuiz />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-8 px-6 mt-12 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-slate-400">
            <span className="font-semibold text-slate-300">Python CalcLab</span>
            <span aria-hidden="true">·</span>
            <span>Ambiente educacional interativo para iniciantes em programação</span>
          </div>

          <div className="flex items-center gap-4 text-slate-400">
            <button
              onClick={() => setIsHowToRunOpen(true)}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Como rodar no computador
            </button>
            <span aria-hidden="true">·</span>
            <button
              onClick={() => setActiveTab('codigo')}
              className="hover:text-white transition-colors cursor-pointer"
            >
              Código Python
            </button>
          </div>
        </div>
      </footer>

      {/* How To Run Modal */}
      <HowToRunModal
        isOpen={isHowToRunOpen}
        onClose={() => setIsHowToRunOpen(false)}
      />
    </div>
  );
}
