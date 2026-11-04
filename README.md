# 🧮 Calculadora Básica em Python

> Projeto prático e educativo desenvolvido para programadores iniciantes aprenderem lógica de programação, funções modulares, estruturas de decisão, laços de repetição e tratamento de erros em Python.

---

## 📋 Sumário

- [Visão Geral do Projeto](#-visão-geral-do-projeto)
- [Funcionalidades](#-funcionalidades)
- [Estrutura do Código-Fonte](#-estrutura-do-código-fonte)
- [Código Completo (`calculadora.py`)](#-código-completo-calculadorapy)
- [Explicação Passo a Passo dos Componentes](#-explicação-passo-a-passo-dos-componentes)
  - [1. Funções Matemáticas (`def` e `return`)](#1-funções-matemáticas-def-e-return)
  - [2. Prevenção de Divisão por Zero](#2-prevenção-de-divisão-por-zero)
  - [3. Conversão de Tipos com `float(input())`](#3-conversão-de-tipos-com-floatinput)
  - [4. Menu Interativo e Laço Contínuo (`while True` e `break`)](#4-menu-interativo-e-laço-contínuo-while-true-e-break)
  - [5. Tratamento de Erros (`try...except ValueError`)](#5-tratamento-de-erros-tryexcept-valueerror)
  - [6. Formatação com f-strings](#6-formatação-com-f-strings)
  - [7. Ponto de Entrada (`if __name__ == "__main__":`)](#7-ponto-de-entrada-if-__name__--__main__)
- [Como Rodar no seu Computador](#-como-rodar-no-seu-computador)
  - [Pré-requisitos](#pré-requisitos)
  - [Passo a Passo (Windows, macOS e Linux)](#passo-a-passo-windows-macos-e-linux)
  - [Executando no VS Code](#executando-no-vs-code)
  - [Alternativas Online (sem instalar nada)](#alternativas-online-sem-instalar-nada)
- [Exemplo de Uso no Terminal](#-exemplo-de-uso-no-terminal)
- [Desafios e Próximos Passos](#-desafios-e-próximos-passos)
- [Licença](#-licença)

---

## 🌟 Visão Geral do Projeto

A criação de uma calculadora é o projeto clássico mais recomendado para quem está aprendendo uma nova linguagem de programação. Ele abrange desde os conceitos mais simples (imprimir na tela e ler o teclado) até práticas profissionais de arquitetura de código (modularização, separação de responsabilidades e tratamento de exceções).

Este repositório contém:
1. **O script Python (`calculadora.py`)**: código limpo, 100% comentado e aderente ao guia de estilo oficial do Python (**PEP 8**).
2. **Ambiente Web Interativo**: interface moderna com simulador de terminal em tempo real, calculadora visual vinculada às funções Python, inspetor de memória e quiz de fixação.

---

## ✨ Funcionalidades

- ➕ **Adição**: soma de dois números reais (inteiros ou decimais).
- ➖ **Subtração**: diferença entre dois números.
- ✖️ **Multiplicação**: produto dos fatores.
- ➗ **Divisão Segura**: divisão com validação preventiva para evitar o erro fatal de divisão por zero (`ZeroDivisionError`).
- 🔁 **Ciclo Contínuo**: menu que permanece aberto até que o usuário opte expressamente por sair.
- 🛡️ **Tolerância a Falhas**: o programa não fecha inesperadamente se o usuário digitar letras ou caracteres especiais no lugar de números.

---

## 📁 Estrutura do Código-Fonte

O projeto é organizado em três blocos bem definidos:

```text
calculadora.py
│
├── 1. FUNÇÕES MATEMÁTICAS (Lógica de Negócio)
│   ├── adicionar(a, b)
│   ├── subtrair(a, b)
│   ├── multiplicar(a, b)
│   └── dividir(a, b)
│
├── 2. INTERFACE COM O USUÁRIO (Apresentação)
│   └── exibir_menu()
│
└── 3. CONTROLE DE FLUXO (Programa Principal)
    └── calculadora()
        ├── Leitura da opção
        ├── Captura e validação dos números (try/except)
        ├── Chamada da função correspondente
        └── Exibição formatada do resultado
```

---

## 💻 Código Completo (`calculadora.py`)

Você pode copiar o código abaixo e salvá-lo em um arquivo chamado `calculadora.py`:

```python
# ============================================================
# PROJETO: CALCULADORA BÁSICA EM PYTHON
# Operações: Adição, Subtração, Multiplicação e Divisão
# ============================================================

# ------------------------------------------------------------
# 1. FUNÇÕES MATEMÁTICAS
# Cada operação possui uma função dedicada.
# 'a' e 'b' são os parâmetros (os dois números recebidos).
# 'return' devolve o resultado para quem chamou a função.
# ------------------------------------------------------------

def adicionar(a, b):
    """Retorna a soma de dois números."""
    return a + b

def subtrair(a, b):
    """Retorna a subtração do segundo número em relação ao primeiro."""
    return a - b

def multiplicar(a, b):
    """Retorna o produto da multiplicação de dois números."""
    return a * b

def dividir(a, b):
    """
    Retorna a divisão do primeiro número pelo segundo.
    Atenção: Na matemática, divisão por zero não existe!
    Verificamos se 'b' é zero para evitar que o Python trave.
    """
    if b == 0:
        return "Erro: Divisão por zero não permitida!"
    return a / b


# ------------------------------------------------------------
# 2. FUNÇÃO DO MENU
# Exibe visualmente as opções para o usuário no terminal.
# ------------------------------------------------------------
def exibir_menu():
    print("\n" + "=" * 34)
    print("      CALCULADORA EM PYTHON       ")
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
    
    # 'while True' cria um loop contínuo: a calculadora continuará
    # funcionando para novas contas até que o usuário digite '5'.
    while True:
        exibir_menu()
        opcao = input("Escolha uma opção (1 a 5): ")

        # 1. Se o usuário escolheu '5', encerramos o programa com 'break'
        if opcao == '5':
            print("\nObrigado por usar a calculadora! Bons estudos! 👋")
            break

        # 2. Se escolheu uma das operações (1, 2, 3 ou 4)
        if opcao in ('1', '2', '3', '4'):
            
            # O bloco try...except protege contra erros de digitação:
            # se o usuário digitar letras em vez de números, o programa não trava.
            try:
                num1 = float(input("Digite o primeiro número: "))
                num2 = float(input("Digite o segundo número: "))
            except ValueError:
                print("\n[!] Erro: Você deve digitar apenas números válidos (ex: 10 ou 4.5).")
                continue  # Volta imediatamente para o início do menu

            # 3. Execução da função correspondente à opção escolhida
            if opcao == '1':
                resultado = adicionar(num1, num2)
                print(f"\n>>> Resultado: {num1} + {num2} = {resultado}")

            elif opcao == '2':
                resultado = subtrair(num1, num2)
                print(f"\n>>> Resultado: {num1} - {num2} = {resultado}")

            elif opcao == '3':
                resultado = multiplicar(num1, num2)
                print(f"\n>>> Resultado: {num1} * {num2} = {resultado}")

            elif opcao == '4':
                resultado = dividir(num1, num2)
                if isinstance(resultado, str):
                    # Caso a função tenha retornado o texto de aviso sobre divisão por zero
                    print(f"\n>>> {resultado}")
                else:
                    print(f"\n>>> Resultado: {num1} / {num2} = {resultado}")

        else:
            # Caso o usuário digite algo fora de 1 a 5 (ex: '9' ou 'ola')
            print("\n[!] Opção inválida! Digite um número de 1 a 5.")


# Esse comando garante que a calculadora só execute se o arquivo for rodado diretamente
if __name__ == "__main__":
    calculadora()
```

---

## 🔍 Explicação Passo a Passo dos Componentes

### 1. Funções Matemáticas (`def` e `return`)

A palavra reservada `def` (do inglês *define*) cria uma nova função.

```python
def adicionar(a, b):
    return a + b
```

- **Por que usamos funções?** Para não repetir lógica. Se amanhã você quiser alterar a forma como uma soma ou formatação é feita, você altera em apenas um lugar.
- **Parâmetros (`a`, `b`):** Funcionam como "espaços reservados" na memória que receberão os números enviados pelo usuário.
- **Retorno (`return` vs `print`):** 
  - `print()` apenas joga uma mensagem na tela para uma pessoa ler, mas não guarda nada.
  - `return` **entrega o resultado de volta** para quem chamou a função, permitindo armazenar o valor em variáveis ou reutilizá-lo em outros cálculos.

---

### 2. Prevenção de Divisão por Zero

Na matemática elementar, a divisão por zero não existe. No Python, executar `10 / 0` dispara a exceção `ZeroDivisionError` e encerra o programa imediatamente.

```python
def dividir(a, b):
    if b == 0:
        return "Erro: Divisão por zero não permitida!"
    return a / b
```

- A instrução `if b == 0:` intercepta a operação **antes** que o Python tente executá-la, devolvendo uma mensagem clara e amigável ao usuário.

---

### 3. Conversão de Tipos com `float(input())`

A função `input()` sempre lê o que o usuário digita como **texto** (`string`).

```python
# ❌ Sem conversão:
# a = input("Digite 10: ")  # "10"
# b = input("Digite 5: ")   # "5"
# print(a + b)              # Imprime "105" (concatenação de texto)

# ✅ Com float():
num1 = float(input("Digite o primeiro número: "))  # 10.0 (número decimal)
```

- `float()` converte texto para número com casas decimais, permitindo contas com inteiros (`10`) ou frações (`3.14`).

---

### 4. Menu Interativo e Laço Contínuo (`while True` e `break`)

```python
while True:
    exibir_menu()
    opcao = input("Escolha uma opção: ")
    if opcao == '5':
        break
```

- `while True:` cria um laço que executa infinitamente enquanto sua condição for verdadeira.
- O comando `break` serve como saída de emergência: ele encerra o laço imediatamente quando o usuário digita `5`.

---

### 5. Tratamento de Erros (`try...except ValueError`)

Se o usuário acidentalmente digitar `"dez"` ou `"banana"` quando o programa estiver esperando um número, a função `float()` falha e dispara um `ValueError`.

```python
try:
    num1 = float(input("Digite o primeiro número: "))
    num2 = float(input("Digite o segundo número: "))
except ValueError:
    print("\n[!] Erro: Você deve digitar apenas números válidos.")
    continue  # Pula o restante do laço e volta para o menu
```

- O bloco `try` tenta executar o código sensível.
- Caso ocorra um `ValueError`, o bloco `except` intercepta o erro, avisa o usuário e o comando `continue` reinicia o laço sem fechar o programa.

---

### 6. Formatação com f-strings

A partir do Python 3.6, as **f-strings** são o padrão moderno para interpolação de variáveis dentro de textos:

```python
print(f"\n>>> Resultado: {num1} + {num2} = {resultado}")
```

Basta colocar o prefixo `f` antes das aspas e inserir variáveis ou expressões entre chaves `{}`.

---

### 7. Ponto de Entrada (`if __name__ == "__main__":`)

```python
if __name__ == "__main__":
    calculadora()
```

Essa cláusula garante que a função `calculadora()` só execute se você rodar o arquivo diretamente (`python calculadora.py`). Caso outro arquivo importe este script como um módulo (`import calculadora`), as funções estarão disponíveis para uso sem disparar o menu automaticamente.

---

## 🚀 Como Rodar no seu Computador

### Pré-requisitos

1. Ter o **Python 3** instalado (versão 3.10 ou superior recomendada).
   - Você pode verificar se já tem instalado abrindo o terminal e digitando:
     ```bash
     python --version
     # ou
     python3 --version
     ```
   - Caso não tenha, baixe gratuitamente no site oficial: [python.org/downloads](https://www.python.org/downloads/).
   - ⚠️ **Importante no Windows:** Durante a instalação, marque a opção **"Add Python to PATH"**.

---

### Passo a Passo (Windows, macOS e Linux)

1. **Baixe ou salve o código:**
   - Crie uma pasta para seus estudos, por exemplo: `meus-projetos-python`.
   - Crie um arquivo chamado `calculadora.py` e cole o código completo.

2. **Abra o terminal na pasta:**
   - No Windows: abra o Prompt de Comando (CMD) ou PowerShell e navegue até a pasta:
     ```bash
     cd caminho/para/sua/pasta
     ```
   - No macOS ou Linux: abra o Terminal e navegue com `cd`.

3. **Execute o comando:**
   - No Windows:
     ```bash
     python calculadora.py
     ```
   - No macOS ou Linux:
     ```bash
     python3 calculadora.py
     ```

---

### Executando no VS Code

1. Abra o **Visual Studio Code**.
2. Instale a extensão oficial **Python** (da Microsoft).
3. Abra o arquivo `calculadora.py`.
4. Clique no ícone de "Play" (▶️) no canto superior direito ou pressione `Ctrl + F5` (ou `Cmd + F5` no Mac).
5. O terminal integrado do VS Code se abrirá e você poderá interagir diretamente com a calculadora.

---

### Alternativas Online (sem instalar nada)

Se você estiver em um computador bloqueado ou quiser testar na nuvem:
- **Google Colab:** Acesse [colab.research.google.com](https://colab.research.google.com/), crie um *Novo Notebook*, cole o código em uma célula e clique no botão de executar.
- **Replit:** Acesse [replit.com](https://replit.com/), crie um projeto Python e clique em *Run*.

---

## 🖥️ Exemplo de Uso no Terminal

```text
Bem-vindo à sua primeira calculadora em Python!

==================================
      CALCULADORA EM PYTHON       
==================================
1 - Adição (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
5 - Sair do Programa
==================================
Escolha uma opção (1 a 5): 1
Digite o primeiro número: 45.5
Digite o segundo número: 14.5

>>> Resultado: 45.5 + 14.5 = 60.0

==================================
      CALCULADORA EM PYTHON       
==================================
1 - Adição (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
5 - Sair do Programa
==================================
Escolha uma opção (1 a 5): 4
Digite o primeiro número: 100
Digite o segundo número: 0

>>> Erro: Divisão por zero não permitida!

==================================
      CALCULADORA EM PYTHON       
==================================
1 - Adição (+)
2 - Subtração (-)
3 - Multiplicação (*)
4 - Divisão (/)
5 - Sair do Programa
==================================
Escolha uma opção (1 a 5): 5

Obrigado por usar a calculadora! Bons estudos! 👋
```

---

## 🎯 Desafios e Próximos Passos

Para continuar praticando e evoluindo seus conhecimentos em Python, tente implementar as seguintes melhorias:

1. **Novas Operações:**
   - Adicione a operação de **Potenciação** (`a ** b`).
   - Adicione a operação de **Porcentagem** (`(a * b) / 100`).
   - Adicione **Raiz Quadrada** importando o módulo nativo: `import math` e usando `math.sqrt(a)`.

2. **Histórico de Cálculos:**
   - Crie uma lista chamada `historico = []` e armazene cada conta realizada para poder exibir uma opção "6 - Ver Histórico".

3. **Interface Gráfica com Janela:**
   - Use o módulo nativo `tkinter` do Python para transformar este programa em um aplicativo de desktop com botões clicáveis.

---

## 📄 Licença

Este projeto é de código aberto sob a licença [Apache 2.0](https://www.apache.org/licenses/LICENSE-2.0). Sinta-se livre para estudar, modificar e compartilhar com outros estudantes de programação!
