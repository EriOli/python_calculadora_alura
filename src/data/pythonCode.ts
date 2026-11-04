export interface CodeSnippet {
  id: string;
  title: string;
  badge: string;
  description: string;
  code: string;
}

export const MODULAR_PYTHON_CODE = `# ============================================================
# PROJETO: CALCULADORA BÁSICA EM PYTHON
# Nível: Iniciante / Passo a Passo
# ============================================================

# ------------------------------------------------------------
# 1. FUNÇÕES MATEMÁTICAS
# Cada operação tem sua própria função responsável.
# 'a' e 'b' são os parâmetros (os dois números que você envia).
# 'return' devolve o resultado da conta para quem chamou.
# ------------------------------------------------------------

def adicionar(a, b):
    """Soma dois números."""
    return a + b

def subtrair(a, b):
    """Subtrai o segundo número do primeiro."""
    return a - b

def multiplicar(a, b):
    """Multiplica dois números."""
    return a * b

def dividir(a, b):
    """
    Divide o primeiro número pelo segundo.
    ATENÇÃO: Na matemática, divisão por zero não existe!
    Se 'b' for zero, retornamos uma mensagem amigável de erro.
    """
    if b == 0:
        return "Erro: Divisão por zero não permitida!"
    return a / b


# ------------------------------------------------------------
# 2. FUNÇÃO DO MENU
# Mostra as opções disponíveis para o usuário no terminal.
# ------------------------------------------------------------
def exibir_menu():
    print("\\n" + "=" * 34)
    print("      CALCULADORA EM PYTHON")
    print("=" * 34)
    print("1 - Adição (+)")
    print("2 - Subtração (-)")
    print("3 - Multiplicação (*)")
    print("4 - Divisão (/)")
    print("5 - Sair do Programa")
    print("=" * 34)


# ------------------------------------------------------------
# 3. PROGRAMA PRINCIPAL
# Controla o fluxo, lê os dados do teclado e exibe os resultados.
# ------------------------------------------------------------
def calculadora():
    print("Bem-vindo à sua primeira calculadora em Python!")
    
    # 'while True' cria um loop infinito para a calculadora
    # continuar funcionando até que o usuário escolha '5' (Sair).
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1 a 5): ")

        # Se o usuário escolheu 5, encerra o loop com 'break'
        if opcao == '5':
            print("\\nObrigado por usar a calculadora! Bons estudos em Python! 👋")
            break

        # Verifica se a opção digitada é válida (1, 2, 3 ou 4)
        if opcao in ('1', '2', '3', '4'):
            
            # O bloco 'try...except' protege o programa contra travamentos:
            # Se alguém digitar letras no lugar de números, capturamos o erro!
            try:
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("\\n[!] Erro: Você deve digitar apenas números (ex: 10 ou 4.5).")
                continue  # Volta para o início do while

            # Executa a função correspondente à opção escolhida
            if opcao == '1':
                resultado = adicionar(num1, num2)
                print(f"\\n>>> Resultado: {num1} + {num2} = {resultado}")
                
            elif opcao == '2':
                resultado = subtrair(num1, num2)
                print(f"\\n>>> Resultado: {num1} - {num2} = {resultado}")
                
            elif opcao == '3':
                resultado = multiplicar(num1, num2)
                print(f"\\n>>> Resultado: {num1} * {num2} = {resultado}")
                
            elif opcao == '4':
                resultado = dividir(num1, num2)
                if isinstance(resultado, str):
                    print(f"\\n>>> {resultado}")
                else:
                    print(f"\\n>>> Resultado: {num1} / {num2} = {resultado}")
                    
        else:
            # Caso a opção não seja nenhum número de 1 a 5
            print("\\n[!] Opção inválida! Digite um número de 1 a 5.")


# Esse comando garante que o programa só rode quando executado diretamente
if __name__ == "__main__":
    calculadora()
`;

export const SIMPLE_LINEAR_CODE = `# ============================================================
# VERSÃO ULTRA SIMPLES (NÍVEL ZERO)
# Excelente para o primeiro dia aprendendo Python:
# Executa de cima para baixo uma única vez, sem laços ou funções complexas.
# ============================================================

print("--- CALCULADORA BÁSICA ---")

# 1. Pede os dois números ao usuário
# 'input()' lê o que foi digitado como texto
# 'float()' converte o texto para número decimal
num1 = float(input("Digite o primeiro número: "))
num2 = float(input("Digite o segundo número: "))

# 2. Pede para escolher a operação
print("Escolha a operação: +, -, *, /")
operacao = input("Operação: ")

# 3. Toma a decisão usando 'if', 'elif' e 'else'
if operacao == "+":
    resultado = num1 + num2
    print(f"Resultado: {num1} + {num2} = {resultado}")

elif operacao == "-":
    resultado = num1 - num2
    print(f"Resultado: {num1} - {num2} = {resultado}")

elif operacao == "*":
    resultado = num1 * num2
    print(f"Resultado: {num1} * {num2} = {resultado}")

elif operacao == "/":
    if num2 == 0:
        print("Erro: Não é possível dividir por zero!")
    else:
        resultado = num1 / num2
        print(f"Resultado: {num1} / {num2} = {resultado}")

else:
    print("Operação inválida! Escolha +, -, * ou /")
`;

export interface ConceptPillar {
  id: string;
  title: string;
  subtitle: string;
  pythonKeyword: string;
  explanation: string;
  whyItMatters: string;
  codeSnippet: string;
  commonMistake: string;
}

export const CONCEPT_PILLARS: ConceptPillar[] = [
  {
    id: "funcoes",
    title: "1. Funções Modulares",
    subtitle: "Evitando repetição de código e organizando seu projeto",
    pythonKeyword: "def / return",
    explanation: "Uma função é um bloco de código reutilizável com um nome. Em vez de escrever o cálculo várias vezes, criamos 'def adicionar(a, b): return a + b'. Os valores dentro dos parênteses ('a' e 'b') são parâmetros que a função recebe.",
    whyItMatters: "Em projetos reais, funções permitem testar cada operação isoladamente e manter o código limpo e elegante.",
    codeSnippet: `def adicionar(a, b):
    # 'a' e 'b' são variáveis que recebem os valores
    # 'return' devolve o resultado para onde foi chamada
    return a + b

# Como usar:
resultado = adicionar(10, 5)  # resultado será 15`,
    commonMistake: "Confundir 'print()' com 'return'. O 'print()' apenas exibe algo na tela, enquanto 'return' realmente entrega o valor calculado para ser salvo em uma variável."
  },
  {
    id: "tipos",
    title: "2. Conversão de Tipos",
    subtitle: "Por que input() precisa vir acompanhado de float()",
    pythonKeyword: "float(input(...))",
    explanation: "Por padrão, tudo o que o usuário digita na função 'input()' chega no Python como texto (string). Se você somar '10' + '5' sem converter, o Python fará uma concatenação de textos e o resultado será '105' em vez de 15!",
    whyItMatters: "Usar 'float()' converte o texto para número decimal (com ponto), permitindo contas com números inteiros (10) ou quebrados (3.14).",
    codeSnippet: `# ❌ ERRADO (concatena texto):
# n1 = input("Num 1: ")  # "10"
# n2 = input("Num 2: ")  # "5"
# total = n1 + n2        # "105"

# ✅ CORRETO (soma matemática real):
n1 = float(input("Num 1: "))  # 10.0
n2 = float(input("Num 2: "))  # 5.0
total = n1 + n2               # 15.0`,
    commonMistake: "Esquecer de converter a entrada do usuário ou esquecer que números decimais em Python usam ponto (ex: 7.5) e não vírgula."
  },
  {
    id: "divisao-zero",
    title: "3. Proteção contra Divisão por Zero",
    subtitle: "O clássico erro que derruba programas despreparados",
    pythonKeyword: "if b == 0:",
    explanation: "Na matemática elementar, a divisão por zero é indefinida. Se você pedir ao Python para executar 10 / 0, ele dispara uma exceção fatal chamada 'ZeroDivisionError' e encerra o programa imediatamente com uma tela vermelha.",
    whyItMatters: "Bons programadores sempre antecipam cenários inesperados. Verificar 'if b == 0:' antes de tentar dividir garante que o programa continue rodando com uma mensagem amigável.",
    codeSnippet: `def dividir(a, b):
    # Verificação preventiva:
    if b == 0:
        return "Erro: Divisão por zero não permitida!"
    return a / b`,
    commonMistake: "Tentar fazer 'a / b' antes de checar se 'b' é zero."
  },
  {
    id: "lacos",
    title: "4. Menu Contínuo com Laço de Repetição",
    subtitle: "Mantendo a calculadora viva até que você peça para sair",
    pythonKeyword: "while True / break",
    explanation: "Um script simples de terminal termina logo após a primeira conta. Usando 'while True:', criamos um ciclo contínuo: o menu aparece, o cálculo acontece, e o menu reaparece. Quando o usuário digita a opção 5 ('Sair'), usamos a palavra-chave 'break' para quebrar o laço.",
    whyItMatters: "Ninguém gosta de um aplicativo que fecha na cara após fazer uma única soma. O loop proporciona uma experiência interativa real.",
    codeSnippet: `while True:
    opcao = input("Opção (1-5): ")
    if opcao == '5':
        print("Até logo!")
        break  # Interrompe o while imediatamente
    # ... executa as contas ...`,
    commonMistake: "Criar um 'while True' sem nenhuma condição de 'break', gerando um loop infinito que trava o terminal."
  },
  {
    id: "tratamento-erros",
    title: "5. Tratamento de Exceções",
    subtitle: "O que acontece se o usuário digitar 'banana' no lugar de um número?",
    pythonKeyword: "try / except ValueError",
    explanation: "Se a função 'float()' tentar converter a palavra 'oi' em número, o Python gera um erro 'ValueError'. O bloco 'try / except' diz: 'tente rodar esse código perigoso; se der erro do tipo ValueError, não trave o programa, apenas execute o bloco de aviso'.",
    whyItMatters: "Torna seu código robusto contra usuários que erram a digitação ou tentam quebrar o sistema.",
    codeSnippet: `try:
    num1 = float(input("Digite o 1º número: "))
    num2 = float(input("Digite o 2º número: "))
except ValueError:
    print("Ops! Digite apenas números válidos.")
    continue  # Pula o restante e volta ao início do menu`,
    commonMistake: "Não usar 'try/except' e deixar o programa fechar sozinho com traceback feio no terminal do usuário."
  },
  {
    id: "f-strings",
    title: "6. Formatação Moderna com f-strings",
    subtitle: "Exibindo textos e variáveis com elegância",
    pythonKeyword: 'f"Resultado: {resultado}"',
    explanation: "A partir do Python 3.6, a melhor forma de juntar texto com variáveis é usando f-strings. Basta colocar a letra 'f' antes das aspas e envolver suas variáveis ou expressões entre chaves '{}'.",
    whyItMatters: "É muito mais legível que a forma antiga de concatenar com '+' ('Resultado: ' + str(resultado)) e previne erros de tipo.",
    codeSnippet: `a = 8
b = 4
res = a + b

# Elegante e fácil de ler:
print(f"A soma de {a} e {b} é igual a {res}")
# Imprime: A soma de 8 e 4 é igual a 12`,
    commonMistake: "Esquecer da letra 'f' antes das aspas, fazendo com que o Python imprima o texto literal '{resultado}' em vez do valor da variável."
  }
];

export interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    question: "O que acontece se você somar o retorno de dois input() sem usar int() ou float()?",
    options: [
      "O Python dá um erro de sintaxe imediatamente.",
      "Os valores são concatenados como texto (ex: '5' + '5' vira '55').",
      "O Python converte automaticamente para números e calcula 10.",
      "O computador reinicia."
    ],
    correctIndex: 1,
    explanation: "Correto! A função input() sempre devolve uma string (texto). Sem converter com float() ou int(), o operador '+' apenas junta os textos lado a lado."
  },
  {
    id: 2,
    question: "Qual é a principal diferença entre 'return' e 'print()' dentro de uma função?",
    options: [
      "Não há diferença, ambos fazem a mesma coisa.",
      "'print()' devolve um valor utilizável, enquanto 'return' só mostra na tela.",
      "'return' devolve o valor para quem chamou a função guardar em uma variável; 'print()' apenas exibe texto no console.",
      "'return' só funciona com números inteiros."
    ],
    correctIndex: 2,
    explanation: "Exato! 'return' entrega o resultado calculado de volta ao programa principal para que você possa armazená-lo ou usá-lo em outros cálculos."
  },
  {
    id: 3,
    question: "Por que devemos checar 'if b == 0:' antes de realizar uma divisão?",
    options: [
      "Porque dividir por zero dispara a exceção fatal ZeroDivisionError no Python.",
      "Porque o resultado de qualquer divisão por zero é sempre 1.",
      "Porque o Python não aceita números menores que 1.",
      "É apenas uma regra estética sem impacto prático."
    ],
    correctIndex: 0,
    explanation: "Muito bem! Dividir por zero é matematicamente impossível. Se o código tentar executar a / 0, o Python interrompe o programa bruscamente com ZeroDivisionError."
  },
  {
    id: 4,
    question: "Para que serve a instrução 'break' dentro de um loop 'while True'?",
    options: [
      "Para pausar o computador por 5 segundos.",
      "Para reiniciar o loop do primeiro comando.",
      "Para sair imediatamente do laço de repetição.",
      "Para apagar a memória da calculadora."
    ],
    correctIndex: 2,
    explanation: "Perfeito! 'break' quebra o loop infinito, permitindo encerrar a execução do programa de forma limpa e intencional quando o usuário seleciona 'Sair'."
  }
];

export const STEP_BY_STEP_GUIDE = [
  {
    step: "Passo 1",
    title: "Instalar o Python no Computador",
    desc: "Acesse python.org e baixe a versão recomendada (Python 3.10+). No instalador do Windows, certifique-se de marcar a caixinha 'Add Python to PATH'."
  },
  {
    step: "Passo 2",
    title: "Criar o arquivo do projeto",
    desc: "Abra seu editor favorito (VS Code, PyCharm ou até o Bloco de Notas) e crie um arquivo chamado 'calculadora.py'."
  },
  {
    step: "Passo 3",
    title: "Colar o código e salvar",
    desc: "Clique no botão 'Copiar Código' ou 'Baixar calculadora.py' nesta página e salve dentro da sua pasta de estudos."
  },
  {
    step: "Passo 4",
    title: "Executar no Terminal",
    desc: "Abra o terminal na pasta do arquivo e digite: python calculadora.py (ou python3 calculadora.py no Mac/Linux). Pronto! Sua calculadora estará rodando."
  }
];
