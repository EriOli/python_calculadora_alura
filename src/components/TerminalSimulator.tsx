import React, { useState, useEffect, useRef } from 'react';
import { Terminal, Play, RotateCcw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react';

interface TerminalLine {
  id: string;
  type: 'output' | 'input' | 'error' | 'success' | 'system';
  text: string;
}

type StepState = 'MENU' | 'WAITING_NUM1' | 'WAITING_NUM2' | 'FINISHED_SESSION';

export const TerminalSimulator: React.FC = () => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const [stepState, setStepState] = useState<StepState>('MENU');
  const [selectedOpcao, setSelectedOpcao] = useState<string>('');
  const [num1, setNum1] = useState<number | null>(null);
  const [variables, setVariables] = useState<{
    opcao?: string;
    num1?: number | string;
    num2?: number | string;
    resultado?: number | string;
    funcaoChamada?: string;
  }>({});
  
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const printMenu = () => {
    return [
      { id: Math.random().toString(), type: 'system' as const, text: '==================================' },
      { id: Math.random().toString(), type: 'system' as const, text: '      CALCULADORA EM PYTHON       ' },
      { id: Math.random().toString(), type: 'system' as const, text: '==================================' },
      { id: Math.random().toString(), type: 'output' as const, text: '1 - Adição (+)' },
      { id: Math.random().toString(), type: 'output' as const, text: '2 - Subtração (-)' },
      { id: Math.random().toString(), type: 'output' as const, text: '3 - Multiplicação (*)' },
      { id: Math.random().toString(), type: 'output' as const, text: '4 - Divisão (/)' },
      { id: Math.random().toString(), type: 'output' as const, text: '5 - Sair do Programa' },
      { id: Math.random().toString(), type: 'system' as const, text: '==================================' },
    ];
  };

  const startProgram = () => {
    const initial: TerminalLine[] = [
      { id: '1', type: 'system', text: '$ python3 calculadora.py' },
      { id: '2', type: 'output', text: 'Bem-vindo à sua primeira calculadora em Python!' },
      ...printMenu(),
      { id: 'prompt-1', type: 'output', text: 'Escolha uma opção (1 a 5): ' }
    ];
    setLines(initial);
    setStepState('MENU');
    setSelectedOpcao('');
    setNum1(null);
    setVariables({});
  };

  useEffect(() => {
    startProgram();
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleUserInput = (val: string) => {
    const trimmed = val.trim();
    if (!trimmed && stepState !== 'FINISHED_SESSION') return;

    if (stepState === 'FINISHED_SESSION') {
      startProgram();
      return;
    }

    // Append user input line
    const userLine: TerminalLine = {
      id: Math.random().toString(),
      type: 'input',
      text: trimmed,
    };

    if (stepState === 'MENU') {
      if (trimmed === '5') {
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'success', text: '\nObrigado por usar a calculadora! Bons estudos em Python! 👋' },
          { id: Math.random().toString(), type: 'system', text: '[Processo finalizado com código de saída 0]' }
        ]);
        setStepState('FINISHED_SESSION');
        setVariables({ opcao: '5', funcaoChamada: 'break (encerrou o loop)' });
      } else if (['1', '2', '3', '4'].includes(trimmed)) {
        setSelectedOpcao(trimmed);
        setStepState('WAITING_NUM1');
        setVariables({ opcao: trimmed });
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'output', text: 'Digite o primeiro número: ' }
        ]);
      } else {
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'error', text: '\n[!] Opção inválida! Digite um número de 1 a 5.' },
          ...printMenu(),
          { id: Math.random().toString(), type: 'output', text: 'Escolha uma opção (1 a 5): ' }
        ]);
      }
    } else if (stepState === 'WAITING_NUM1') {
      const parsedNum = parseFloat(trimmed);
      if (isNaN(parsedNum)) {
        // Simulates ValueError in float(input())
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'error', text: '\n[!] ValueError: Você deve digitar apenas números (ex: 10 ou 4.5).' },
          { id: Math.random().toString(), type: 'system', text: '>>> O bloco except ValueError capturou a falha e impediu o programa de travar!' },
          ...printMenu(),
          { id: Math.random().toString(), type: 'output', text: 'Escolha uma opção (1 a 5): ' }
        ]);
        setStepState('MENU');
        setVariables(v => ({ ...v, num1: 'Erro: ' + trimmed, funcaoChamada: 'except ValueError' }));
      } else {
        setNum1(parsedNum);
        setStepState('WAITING_NUM2');
        setVariables(v => ({ ...v, num1: parsedNum }));
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'output', text: 'Digite o segundo número: ' }
        ]);
      }
    } else if (stepState === 'WAITING_NUM2') {
      const parsedNum2 = parseFloat(trimmed);
      if (isNaN(parsedNum2)) {
        // Simulates ValueError in float(input())
        setLines(prev => [
          ...prev,
          userLine,
          { id: Math.random().toString(), type: 'error', text: '\n[!] ValueError: Você deve digitar apenas números.' },
          ...printMenu(),
          { id: Math.random().toString(), type: 'output', text: 'Escolha uma opção (1 a 5): ' }
        ]);
        setStepState('MENU');
        setVariables(v => ({ ...v, num2: 'Erro: ' + trimmed, funcaoChamada: 'except ValueError' }));
      } else {
        const n1 = num1 ?? 0;
        const n2 = parsedNum2;
        let res: number | string = 0;
        let fnName = '';
        let opSym = '';

        if (selectedOpcao === '1') {
          res = n1 + n2;
          fnName = `adicionar(${n1}, ${n2})`;
          opSym = '+';
        } else if (selectedOpcao === '2') {
          res = n1 - n2;
          fnName = `subtrair(${n1}, ${n2})`;
          opSym = '-';
        } else if (selectedOpcao === '3') {
          res = n1 * n2;
          fnName = `multiplicar(${n1}, ${n2})`;
          opSym = '*';
        } else if (selectedOpcao === '4') {
          fnName = `dividir(${n1}, ${n2})`;
          opSym = '/';
          if (n2 === 0) {
            res = 'Erro: Divisão por zero não permitida!';
          } else {
            res = n1 / n2;
          }
        }

        const isErrorRes = typeof res === 'string';

        setVariables({
          opcao: selectedOpcao,
          num1: n1,
          num2: n2,
          resultado: res,
          funcaoChamada: fnName,
        });

        const resultLine: TerminalLine = {
          id: Math.random().toString(),
          type: isErrorRes ? 'error' : 'success',
          text: isErrorRes
            ? `\n>>> ${res} (if b == 0 impediu ZeroDivisionError!)`
            : `\n>>> Resultado: ${n1} ${opSym} ${n2} = ${res}`,
        };

        setLines(prev => [
          ...prev,
          userLine,
          resultLine,
          ...printMenu(),
          { id: Math.random().toString(), type: 'output', text: 'Escolha uma opção (1 a 5): ' }
        ]);

        setStepState('MENU');
        setSelectedOpcao('');
        setNum1(null);
      }
    }

    setCurrentInput('');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleUserInput(currentInput);
  };

  // Preset runner simulation helper
  const runPreset = (opcao: string, n1: string, n2?: string) => {
    startProgram();
    setTimeout(() => {
      handleUserInput(opcao);
      setTimeout(() => {
        handleUserInput(n1);
        if (n2 !== undefined) {
          setTimeout(() => {
            handleUserInput(n2);
          }, 300);
        }
      }, 300);
    }, 200);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div>
          <div className="flex items-center gap-2 text-xs text-amber-400 font-mono mb-1">
            <span>Simulador de Console</span>
            <span aria-hidden="true">·</span>
            <span>Entrada em Tempo Real</span>
            <span aria-hidden="true">·</span>
            <span>Inspetor de Variáveis</span>
          </div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Terminal Python Interativo
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Experimente o programa exatamente como ele roda no terminal do computador.
          </p>
        </div>

        <button
          onClick={startProgram}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-300 hover:text-white bg-slate-800 hover:bg-slate-700 rounded-lg transition-colors cursor-pointer self-start sm:self-auto"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reiniciar Execução</span>
        </button>
      </div>

      {/* Quick Test Preset Buttons */}
      <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800 space-y-2">
        <div className="text-xs font-semibold text-slate-300 flex items-center gap-1.5">
          <Zap className="w-3.5 h-3.5 text-amber-400" />
          <span>Cenários de Teste Rápido (clique para rodar automaticamente):</span>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
          <button
            onClick={() => runPreset('1', '25', '17')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Adição: 25 + 17
          </button>
          <button
            onClick={() => runPreset('2', '100', '35.5')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Subtração: 100 - 35.5
          </button>
          <button
            onClick={() => runPreset('3', '8', '9')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Multiplicação: 8 * 9
          </button>
          <button
            onClick={() => runPreset('4', '15', '0')}
            className="px-2.5 py-1 text-xs font-mono bg-amber-500/10 hover:bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-md transition-colors cursor-pointer flex items-center gap-1"
          >
            <ShieldCheck className="w-3 h-3 text-amber-400" />
            <span>Divisão por Zero: 15 / 0</span>
          </button>
          <button
            onClick={() => runPreset('1', 'palavra', '10')}
            className="px-2.5 py-1 text-xs font-mono bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 rounded-md transition-colors cursor-pointer flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3 text-rose-400" />
            <span>Entrada Inválida: 'palavra'</span>
          </button>
          <button
            onClick={() => runPreset('5', '')}
            className="px-2.5 py-1 text-xs font-mono bg-slate-800/80 hover:bg-slate-700 text-slate-400 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            Opção 5: Sair
          </button>
        </div>
      </div>

      {/* Main Terminal Window and Variable Inspector Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Terminal Screen (2 cols) */}
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-950 shadow-2xl flex flex-col h-[520px]">
          {/* Terminal Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-800 shrink-0">
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/70" />
                <div className="w-3 h-3 rounded-full bg-amber-500/70" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="text-xs font-mono text-slate-400 ml-2">bash - Python 3.12 (Interactive REPL)</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Em execução</span>
            </div>
          </div>

          {/* Terminal Logs Area */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs sm:text-sm leading-relaxed space-y-1">
            {lines.map((l) => {
              if (l.type === 'system') {
                return (
                  <div key={l.id} className="text-slate-400">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'input') {
                return (
                  <div key={l.id} className="text-amber-300 flex items-center gap-1 font-semibold">
                    <span className="text-slate-400">&gt;</span> {l.text}
                  </div>
                );
              }
              if (l.type === 'error') {
                return (
                  <div key={l.id} className="text-rose-400 font-medium">
                    {l.text}
                  </div>
                );
              }
              if (l.type === 'success') {
                return (
                  <div key={l.id} className="text-emerald-400 font-semibold">
                    {l.text}
                  </div>
                );
              }
              return (
                <div key={l.id} className="text-slate-200">
                  {l.text}
                </div>
              );
            })}
            <div ref={terminalEndRef} />
          </div>

          {/* Interactive Input Line */}
          <div className="p-3 bg-slate-900/90 border-t border-slate-800 shrink-0">
            <form onSubmit={handleFormSubmit} className="flex items-center gap-2">
              <div className="text-amber-400 font-mono text-sm select-none font-bold">
                {stepState === 'FINISHED_SESSION' ? '🔄' : '$'}
              </div>
              <input
                ref={inputRef}
                type="text"
                value={currentInput}
                onChange={(e) => setCurrentInput(e.target.value)}
                placeholder={
                  stepState === 'FINISHED_SESSION'
                    ? "Sessão finalizada. Pressione Enter para reiniciar..."
                    : stepState === 'MENU'
                    ? "Digite a opção desejada (1 a 5) e tecle Enter..."
                    : "Digite o número (ex: 12 ou 4.5) e tecle Enter..."
                }
                className="flex-1 bg-transparent font-mono text-xs sm:text-sm text-white placeholder:text-slate-400 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-3 py-1.5 text-xs font-semibold text-slate-900 bg-amber-400 hover:bg-amber-300 rounded-md transition-colors cursor-pointer shrink-0"
              >
                Enviar ↵
              </button>
            </form>
          </div>
        </div>

        {/* Python Internal State Inspector (1 col) */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/80 p-5 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 pb-3 border-b border-slate-800">
              <Terminal className="w-4 h-4 text-amber-400" />
              <h3 className="text-sm font-bold text-white tracking-tight">
                Memória do Python (Variáveis)
              </h3>
            </div>

            <p className="text-xs text-slate-400 mt-3 leading-relaxed">
              Veja em tempo real o que está guardado na memória RAM do Python durante a execução:
            </p>

            <div className="mt-4 space-y-3 font-mono text-xs">
              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] mb-1">opcao (str):</div>
                <div className="text-amber-300 font-semibold">
                  {variables.opcao ? `"${variables.opcao}"` : '<vazio>'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] mb-1">num1 (float):</div>
                <div className="text-cyan-300 font-semibold">
                  {variables.num1 !== undefined ? String(variables.num1) : '<aguardando>'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] mb-1">num2 (float):</div>
                <div className="text-cyan-300 font-semibold">
                  {variables.num2 !== undefined ? String(variables.num2) : '<aguardando>'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] mb-1">Função Invocada:</div>
                <div className="text-purple-300 font-semibold">
                  {variables.funcaoChamada || 'Nenhuma no momento'}
                </div>
              </div>

              <div className="p-3 rounded-lg bg-slate-950 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] mb-1">resultado retornado:</div>
                <div className="text-emerald-400 font-bold">
                  {variables.resultado !== undefined ? String(variables.resultado) : '<nenhum>'}
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800/80 text-xs text-slate-400">
            <span className="font-semibold text-slate-300">Como funciona o fluxo:</span>
            <p className="mt-1 leading-relaxed">
              O Python lê o teclado com <code className="text-amber-300">input()</code>, valida as regras lógicas e chama a função apropriada.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
