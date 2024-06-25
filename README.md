# Desafio CLINICORP

Aplicação Node para cadastrar e listar tarefas para serem executadas.

## Requisitos funcionais

- O sistema deve permitir cadastrar tarefas
-  O sistema deve exibir todos os dados

## Requisitos não funcionais:

- O servidor deve ser em node 20 com express e javascript
- Deve ser possível fazer o input de dados com comando via CLI
- Deve ser possível ler os dados de um arquivo .json via CLI
- Deve conter um endpoint “/insert-tasks”, que deve conseguir inserir dados
- Deve conter um endpoint “/get-tasks” que retorne um json com o array de dados
- Deve salvar no FireStore o nome do computador que fez o insert (Deve pegar
automaticamente o nome do computador)
- Deve conter testes unitários com Jest
- Para rodar o CLI deve ser possível rodar o comando "tmanager" no terminal
- Deve conter um README.md que explique o passo a passo para configurar e
executar o projeto


## Pré-requisitos

- [Node.js](https://nodejs.org/) (Versão 20)
- npm, yarn ou pnpm

## Installation

1. Clone o repositório ou faça download do projeto

    ```sh
    git clone https://github.com/NakaokaGabriel/clinicorp.git
    cd clinicorp
    ```

2. Instale as dependências
    Npm

    ```sh
    npm install
    ```
    Yarn

    ```sh
    yarn
    ```
    PNPM

    ```sh
    pnpm install
    ```

## Variáveis de ambiente obrigatórios

É necessário que você crie um arquivo ``.env`` na raiz do projeto para que o projeto seja executado junto com o firebase com essas variáveis de ambiente abaixo:

```dosini
PORT=

FIRESTORE_API_KEY=
FIRESTORE_AUTH_DOMAIN=
FIRESTORE_PROJECT_ID=
FIRESTORE_STORAGE_BUCKET=
FIRESTORE_MESSAGING_SENDER_ID=
FIRESTORE_APP_ID=
```

### Executar o código

#### - CLI

Antes de executar o código devemos fazer algumas configurações em sua maquina primeiro devemos configurar onde sera executado se for por meio de `CLI` devemos rodar o comando:

```sh
alias tmanager="npx ts-node src/driver/cli.ts"
```

Assim ele criara um link simbólico para você conseguir executar códigos apenas passando ``tmanager``

#### - Criar tarefa

Por meio de um arquivo json

```sh
tmanager -insert ./examples/input.json
```

Passando diretamente o json

```sh
 tmanager -insert '[{"description":"Criar Login","responsable":"bruno","status":"done"},{"description":"Criar Menu","responsable":"bruno","status":"doing"},{"description":"Criar tela de perfil","responsable":"bruno","status":"todo"}]'
```

#### - Listar tarefa

```sh
 tmanager -show
```

---

#### - Chamadas HTTP's

Primeiro inicie o servidor com o comando:

Npm
```sh
npm run start
```

Yarn
```sh
yarn start
```

PNPM
```sh
pnpm run start
```
<br>

### -- Rodando o código -- 

<br>

## curl

#####  Criar tarefa


```sh
curl -X POST -H "Content-Type: application/json" -d '[{"description":"Criar Login","responsable":"bruno","status":"done"},{"description":"Criar Menu","responsable":"bruno","status":"doing"},{"description":"Criar tela de perfil","responsable":"bruno","status":"todo"}]' http://localhost:8085/insert-tasks
```

#####  Listar tarefa

```sh
curl http://localhost:8085/get-tasks
```