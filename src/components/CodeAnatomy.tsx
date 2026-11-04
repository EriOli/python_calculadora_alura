import React, { useState } from 'react';
import { CONCEPT_PILLARS, ConceptPillar } from '../data/pythonCode';
import { BookOpen, CheckCircle2, AlertOctagon, Code, Lightbulb } from 'lucide-react';

export const CodeAnatomy: React.FC = () => {
  const [selectedPillarId, setSelectedPillarId] = useState<string>(CONCEPT_PILLARS[0].id);

  const activePillar = CONCEPT_PILLARS.find(p => p.id === selectedPillarId) || CONCEPT_PILLARS[0];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
          <span>Fundamentos de Programação</span>
          <span aria-hidden="true">·</span>
          <span>Boas Práticas</span>
          <span aria-hidden="true">·</span>
          <span>Arquitetura Limpa</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Anatomia do Código & Componentes Principais
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl text-balance">
          Entenda a lógica por trás de cada linha do programa para dominar os conceitos e começar a criar seus próprios projetos em Python.
        </p>
      </div>

      {/* Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Navigation list of the 6 pillars (4 cols) */}
        <div className="lg:col-span-4 space-y-2">
          <div className="text-xs font-semibold uppercase tracking-wider text-slate-400 px-1 mb-2">
            Conceitos Essenciais
          </div>
          {CONCEPT_PILLARS.map((pillar) => {
            const isSelected = pillar.id === selectedPillarId;
            return (
              <button
                key={pillar.id}
                onClick={() => setSelectedPillarId(pillar.id)}
                className={`w-full text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-slate-900 border-amber-500/40 shadow-md'
                    : 'bg-slate-900/40 border-slate-800/80 hover:bg-slate-900/80 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-xs font-semibold ${isSelected ? 'text-amber-400' : 'text-slate-300'}`}>
                    {pillar.title}
                  </span>
                  <code className="text-[11px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                    {pillar.pythonKeyword}
                  </code>
                </div>
                <p className="text-xs text-slate-400 line-clamp-1">
                  {pillar.subtitle}
                </p>
              </button>
            );
          })}
        </div>

        {/* Detailed Concept Inspector (8 cols) */}
        <div className="lg:col-span-8 rounded-xl border border-slate-800 bg-slate-900/90 p-6 space-y-6 shadow-xl">
          {/* Header of Active Pillar */}
          <div className="border-b border-slate-800 pb-4">
            <div className="flex items-center justify-between gap-4">
              <span className="text-xs font-mono text-amber-400">
                Palavra-chave: <code className="bg-slate-950 px-2 py-0.5 rounded border border-slate-800 font-bold">{activePillar.pythonKeyword}</code>
              </span>
            </div>
            <h3 className="text-xl font-bold text-white mt-2">
              {activePillar.title}
            </h3>
            <p className="text-sm text-slate-300 mt-1">
              {activePillar.subtitle}
            </p>
          </div>

          {/* Explanation */}
          <div className="space-y-4">
            <div>
              <h4 className="text-xs font-semibold text-slate-300 mb-1.5 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-amber-400" />
                <span>O que é e como funciona no Python?</span>
              </h4>
              <p className="text-sm text-slate-300 leading-relaxed">
                {activePillar.explanation}
              </p>
            </div>

            <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20">
              <h4 className="text-xs font-semibold text-amber-300 mb-1 flex items-center gap-1.5">
                <Lightbulb className="w-4 h-4 text-amber-400" />
                <span>Por que isso é crucial para um iniciante?</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {activePillar.whyItMatters}
              </p>
            </div>
          </div>

          {/* Code Snippet Box */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
                <Code className="w-4 h-4 text-cyan-400" />
                <span>Exemplo Prático em Python:</span>
              </span>
            </div>
            <div className="p-4 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-slate-200 overflow-x-auto whitespace-pre leading-relaxed">
              {activePillar.codeSnippet}
            </div>
          </div>

          {/* Common Beginner Mistake */}
          <div className="p-4 rounded-lg bg-rose-500/5 border border-rose-500/20">
            <div className="flex items-start gap-2.5">
              <AlertOctagon className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
              <div>
                <h5 className="text-xs font-semibold text-rose-300 mb-1">
                  Erro Comum de Iniciantes a Evitar:
                </h5>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {activePillar.commonMistake}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
