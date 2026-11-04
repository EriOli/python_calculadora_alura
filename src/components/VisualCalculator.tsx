import React, { useState } from 'react';
import { Calculator, ArrowRight, ShieldCheck, Terminal, Cpu } from 'lucide-react';

export const VisualCalculator: React.FC = () => {
  const [display, setDisplay] = useState('0');
  const [prevValue, setPrevValue] = useState<number | null>(null);
  const [operation, setOperation] = useState<'+' | '-' | '*' | '/' | null>(null);
  const [waitingForOperand, setWaitingForOperand] = useState(false);
  const [lastComputation, setLastComputation] = useState<{
    fnName: string;
    argA: number;
    argB: number;
    op: string;
    result: number | string;
    isZeroError?: boolean;
    explanation: string;
  } | null>({
    fnName: 'adicionar',
    argA: 10,
    argB: 5,
    op: '+',
    result: 15,
    isZeroError: false,
    explanation: 'A função adicionar(10, 5) recebeu a=10 e b=5 e retornou a + b = 15.'
  });

  const inputDigit = (digit: string) => {
    if (waitingForOperand) {
      setDisplay(digit);
      setWaitingForOperand(false);
    } else {
      setDisplay(display === '0' ? digit : display + digit);
    }
  };

  const inputDecimal = () => {
    if (waitingForOperand) {
      setDisplay('0.');
      setWaitingForOperand(false);
      return;
    }
    if (!display.includes('.')) {
      setDisplay(display + '.');
    }
  };

  const clear = () => {
    setDisplay('0');
    setPrevValue(null);
    setOperation(null);
    setWaitingForOperand(false);
  };

  const performOperation = (nextOp: '+' | '-' | '*' | '/') => {
    const inputValue = parseFloat(display);

    if (prevValue === null) {
      setPrevValue(inputValue);
    } else if (operation) {
      const current = prevValue;
      computeResult(current, inputValue, operation);
    }

    setWaitingForOperand(true);
    setOperation(nextOp);
  };

  const computeResult = (a: number, b: number, op: '+' | '-' | '*' | '/') => {
    let res: number | string = 0;
    let fn = '';
    let isZeroErr = false;
    let exp = '';

    if (op === '+') {
      res = a + b;
      fn = 'adicionar';
      exp = `def adicionar(${a}, ${b}): return ${a} + ${b} -> Retornou ${res}`;
    } else if (op === '-') {
      res = a - b;
      fn = 'subtrair';
      exp = `def subtrair(${a}, ${b}): return ${a} - ${b} -> Retornou ${res}`;
    } else if (op === '*') {
      res = a * b;
      fn = 'multiplicar';
      exp = `def multiplicar(${a}, ${b}): return ${a} * ${b} -> Retornou ${res}`;
    } else if (op === '/') {
      fn = 'dividir';
      if (b === 0) {
        res = 'Erro: Divisão por zero!';
        isZeroErr = true;
        exp = `def dividir(${a}, ${b}): Detectou b == 0 e ativou a proteção antes da divisão fatal!`;
      } else {
        res = a / b;
        exp = `def dividir(${a}, ${b}): return ${a} / ${b} -> Retornou ${res}`;
      }
    }

    setLastComputation({
      fnName: fn,
      argA: a,
      argB: b,
      op,
      result: res,
      isZeroError: isZeroErr,
      explanation: exp
    });

    if (isZeroErr) {
      setDisplay('Erro: / 0');
      setPrevValue(null);
    } else {
      setDisplay(String(res));
      setPrevValue(typeof res === 'number' ? res : null);
    }
  };

  const handleEquals = () => {
    if (!operation || prevValue === null) return;
    const inputValue = parseFloat(display);
    computeResult(prevValue, inputValue, operation);
    setOperation(null);
    setWaitingForOperand(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="pb-4 border-b border-slate-800">
        <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
          <span>Ponte Visual</span>
          <span aria-hidden="true">·</span>
          <span>Do Botão ao Código Python</span>
          <span aria-hidden="true">·</span>
          <span>Inspeção ao Vivo</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          Calculadora Visual com Inspetor Python
        </h2>
        <p className="text-sm text-slate-400 mt-1 max-w-2xl">
          Clique nos botões como em uma calculadora física e veja exatamente qual linha e função do Python é chamada nos bastidores.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left: Handheld Calculator UI (5 cols) */}
        <div className="lg:col-span-5 max-w-sm mx-auto w-full p-5 rounded-2xl bg-slate-900 border border-slate-800 shadow-2xl">
          {/* Display */}
          <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 text-right mb-4">
            <div className="h-5 text-xs text-slate-400 font-mono">
              {prevValue !== null && operation ? `${prevValue} ${operation}` : ''}
            </div>
            <div className="text-3xl font-mono font-bold text-white tracking-tight truncate tabular-nums">
              {display}
            </div>
          </div>

          {/* Keypad Grid */}
          <div className="grid grid-cols-4 gap-2.5">
            <button
              onClick={clear}
              className="col-span-2 p-3 text-xs font-semibold text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 rounded-xl transition-colors cursor-pointer"
            >
              Limpar (C)
            </button>
            <button
              onClick={() => {
                const current = parseFloat(display);
                setDisplay(String(-current));
              }}
              className="p-3 text-xs font-semibold text-slate-300 bg-slate-800 hover:bg-slate-700 rounded-xl transition-colors cursor-pointer font-mono"
            >
              ±
            </button>
            <button
              onClick={() => performOperation('/')}
              className={`p-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer font-mono ${
                operation === '/'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              ÷
            </button>

            {['7', '8', '9'].map(d => (
              <button
                key={d}
                onClick={() => inputDigit(d)}
                className="p-3 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer font-mono"
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => performOperation('*')}
              className={`p-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer font-mono ${
                operation === '*'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              ×
            </button>

            {['4', '5', '6'].map(d => (
              <button
                key={d}
                onClick={() => inputDigit(d)}
                className="p-3 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer font-mono"
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => performOperation('-')}
              className={`p-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer font-mono ${
                operation === '-'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              −
            </button>

            {['1', '2', '3'].map(d => (
              <button
                key={d}
                onClick={() => inputDigit(d)}
                className="p-3 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer font-mono"
              >
                {d}
              </button>
            ))}
            <button
              onClick={() => performOperation('+')}
              className={`p-3 text-sm font-semibold rounded-xl transition-colors cursor-pointer font-mono ${
                operation === '+'
                  ? 'bg-amber-400 text-slate-950 font-bold'
                  : 'bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30'
              }`}
            >
              +
            </button>

            <button
              onClick={() => inputDigit('0')}
              className="col-span-2 p-3 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer font-mono"
            >
              0
            </button>
            <button
              onClick={inputDecimal}
              className="p-3 text-base font-semibold text-white bg-slate-800/80 hover:bg-slate-700/80 rounded-xl transition-colors cursor-pointer font-mono"
            >
              .
            </button>
            <button
              onClick={handleEquals}
              className="p-3 text-base font-bold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-xl transition-colors cursor-pointer font-mono shadow-md"
            >
              =
            </button>
          </div>
        </div>

        {/* Right: The Python Code Mapping Inspector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-5">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Cpu className="w-5 h-5 text-amber-400" />
              <h3 className="text-base font-bold text-white tracking-tight">
                Como o Python processou esta ação:
              </h3>
            </div>

            {lastComputation ? (
              <div className="space-y-4">
                {/* 1. Invocação da Função */}
                <div>
                  <div className="text-xs text-slate-400 mb-1 font-semibold uppercase tracking-wider">
                    1. Chamada de Função em Python:
                  </div>
                  <div className="p-3.5 rounded-lg bg-slate-950 border border-slate-800 font-mono text-xs sm:text-sm text-cyan-300 flex items-center justify-between">
                    <span>
                      resultado = <span className="text-blue-400 font-bold">{lastComputation.fnName}</span>
                      ({lastComputation.argA}, {lastComputation.argB})
                    </span>
                    <span className="text-slate-400 text-xs">
                      retornou: <strong className={lastComputation.isZeroError ? 'text-rose-400' : 'text-emerald-400'}>{String(lastComputation.result)}</strong>
                    </span>
                  </div>
                </div>

                {/* 2. Parâmetros Recebidos */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs">
                    <span className="text-slate-400 block text-[11px]">Parâmetro a:</span>
                    <span className="text-amber-300 font-semibold">{lastComputation.argA}</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">(primeiro número)</span>
                  </div>
                  <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80 font-mono text-xs">
                    <span className="text-slate-400 block text-[11px]">Parâmetro b:</span>
                    <span className="text-amber-300 font-semibold">{lastComputation.argB}</span>
                    <span className="text-slate-400 text-[10px] block mt-0.5">(segundo número)</span>
                  </div>
                </div>

                {/* 3. Lógica Interna Executada */}
                <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800/80">
                  <div className="text-xs font-semibold text-slate-300 mb-2 flex items-center gap-2">
                    {lastComputation.isZeroError ? (
                      <ShieldCheck className="w-4 h-4 text-rose-400" />
                    ) : (
                      <Terminal className="w-4 h-4 text-emerald-400" />
                    )}
                    <span>{lastComputation.isZeroError ? 'Ramo de Proteção (if b == 0)' : 'Corpo da Função'}</span>
                  </div>
                  <pre className="font-mono text-xs sm:text-sm text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
{lastComputation.isZeroError
? `def dividir(a, b):
    if b == 0:  # <- ATIVADO! b vale 0
        return "Erro: Divisão por zero não permitida!"
    return a / b`
: `def ${lastComputation.fnName}(a, b):
    return a ${lastComputation.op} b  # -> ${lastComputation.argA} ${lastComputation.op} ${lastComputation.argB} = ${lastComputation.result}`}
                  </pre>
                </div>

                {/* 4. Resumo Didático */}
                <div className="p-3.5 rounded-lg bg-amber-500/5 border border-amber-500/20 text-xs text-slate-300 leading-relaxed">
                  <span className="font-semibold text-amber-300">Explicação: </span>
                  {lastComputation.explanation}
                </div>
              </div>
            ) : (
              <div className="text-center py-8 text-slate-400 text-xs">
                Faça uma conta na calculadora para inspecionar os passos do Python!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
