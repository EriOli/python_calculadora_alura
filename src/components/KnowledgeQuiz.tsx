import React, { useState } from 'react';
import { QUIZ_QUESTIONS } from '../data/pythonCode';
import { CheckCircle2, XCircle, HelpCircle, RotateCcw, Trophy, ArrowRight } from 'lucide-react';

export const KnowledgeQuiz: React.FC = () => {
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelectOption = (questionId: number, optionIdx: number) => {
    if (showResults) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [questionId]: optionIdx,
    }));
  };

  const calculateScore = () => {
    let score = 0;
    QUIZ_QUESTIONS.forEach(q => {
      if (selectedAnswers[q.id] === q.correctIndex) {
        score++;
      }
    });
    return score;
  };

  const handleReset = () => {
    setSelectedAnswers({});
    setShowResults(false);
  };

  const allAnswered = QUIZ_QUESTIONS.every(q => selectedAnswers[q.id] !== undefined);
  const score = calculateScore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
          <span>Fixação de Aprendizado</span>
          <span aria-hidden="true">·</span>
          <span>4 Perguntas Práticas</span>
          <span aria-hidden="true">·</span>
          <span>Feedback Imediato</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Quiz: Teste Seus Conhecimentos em Python
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Verifique se você compreendeu os pilares fundamentais da calculadora (funções, conversão de tipos, divisões e laços de repetição).
        </p>
      </div>

      {/* Score Banner if completed */}
      {showResults && (
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/30 flex items-center justify-center text-amber-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-white">
                Você acertou {score} de {QUIZ_QUESTIONS.length} perguntas!
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                {score === 4
                  ? 'Sensacional! Você já domina a lógica básica desta calculadora em Python.'
                  : 'Bom trabalho! Revise os pontos onde teve dúvida e tente novamente para fixar.'}
              </p>
            </div>
          </div>
          <button
            onClick={handleReset}
            className="flex items-center gap-2 px-4 py-2 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Refazer Quiz</span>
          </button>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6">
        {QUIZ_QUESTIONS.map((q, index) => {
          const userChoice = selectedAnswers[q.id];
          const isAnswered = userChoice !== undefined;
          const isCorrect = userChoice === q.correctIndex;

          return (
            <div
              key={q.id}
              className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-xs font-bold text-amber-400">
                    {index + 1}
                  </span>
                  <h4 className="text-sm font-semibold text-white leading-snug">
                    {q.question}
                  </h4>
                </div>
              </div>

              {/* Options */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userChoice === optIdx;
                  let buttonStyle = 'bg-slate-950 border-slate-800 text-slate-300 hover:border-slate-700';

                  if (showResults) {
                    if (optIdx === q.correctIndex) {
                      buttonStyle = 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300';
                    } else if (isSelected && !isCorrect) {
                      buttonStyle = 'bg-rose-500/10 border-rose-500/40 text-rose-300';
                    } else {
                      buttonStyle = 'bg-slate-950/40 border-slate-900 text-slate-400 opacity-60';
                    }
                  } else if (isSelected) {
                    buttonStyle = 'bg-amber-500/10 border-amber-500/40 text-amber-300 shadow-sm';
                  }

                  return (
                    <button
                      key={optIdx}
                      disabled={showResults}
                      onClick={() => handleSelectOption(q.id, optIdx)}
                      className={`text-left p-3.5 rounded-xl border text-xs leading-relaxed transition-all cursor-pointer ${buttonStyle}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <span className="font-mono text-[11px] font-bold text-slate-400 shrink-0 mt-0.5">
                          {String.fromCharCode(65 + optIdx)})
                        </span>
                        <span>{opt}</span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Explanation after submission */}
              {showResults && (
                <div className={`p-3.5 rounded-xl border text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-500/5 border-emerald-500/20 text-emerald-200'
                    : 'bg-rose-500/5 border-rose-500/20 text-rose-200'
                }`}>
                  <div className="flex items-center gap-1.5 font-semibold mb-1">
                    {isCorrect ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-300">Resposta Correta!</span>
                      </>
                    ) : (
                      <>
                        <XCircle className="w-3.5 h-3.5 text-rose-400" />
                        <span className="text-rose-300">Não foi dessa vez:</span>
                      </>
                    )}
                  </div>
                  <p>{q.explanation}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Bottom Submit Action */}
      {!showResults && (
        <div className="pt-2 flex justify-end">
          <button
            disabled={!allAnswered}
            onClick={() => setShowResults(true)}
            className={`px-6 py-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer flex items-center gap-2 ${
              allAnswered
                ? 'bg-amber-400 hover:bg-amber-300 text-slate-950 shadow-md'
                : 'bg-slate-800 text-slate-400 cursor-not-allowed border border-slate-700'
            }`}
          >
            <span>{allAnswered ? 'Verificar Respostas' : `Responda todas as ${QUIZ_QUESTIONS.length} perguntas`}</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
};
