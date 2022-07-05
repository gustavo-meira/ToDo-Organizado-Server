
# ToDo Organizado

Esse projeto foi feito para uma simulação de entrevista técnica na @trybe.


## Funcionalidades

- Cadastrar novos usuários
- Cadastrar novas tarefas
- Listar novas Tarefas
- Apagar tarefas


## Tecnologias Utilizadas

-  Express - Framework para criar APIS.
-  Typescript - Linguagem de programação.
-  Prisma - ORM para acesso ao banco de dados.
-  BCryptJS - Ferramenta para criptografar senhas.
-  JSONWebToken - Ferramenta para autenticação de usuarios.
-  UUID - Ferramenta para geração de UUIDS.
-  Mocha, Chai e Sinon - Ferramentas para testes.
## Variáveis de Ambiente

Para rodar esse projeto, você vai precisar adicionar as seguintes variáveis de ambiente no seu .env

`PORT` - Porta em que o servidor irá abrir no seu computador.

`DATABASE_URL` - URL de onde se encontra o servidor MySQL.

`JWT_SECRET` - Chave para o JWT.

Todas essas chaves estão no arquivo .env.example, apenas renomeie ele para .env
## Rodando localmente

Clone o projeto

```bash
  git clone git@github.com:gustavo-meira/ToDo-Organizado-Server.git
```

Entre no diretório do projeto

```bash
  cd ToDo-Organizado-Server
```

Instale as dependências

```bash
  npm install
```

Inicie o servidor

```bash
  npm run dev
```


## Rodando os testes

Para rodar os testes, rode o seguinte comando

```bash
  npm run test
```

Para ver a cobertura dos testes, rode o seguinte comando

```bash
  npm run test:coverage
```
## Documentação da API

#### Cria um novo usuário

```http
  POST /user
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | Email do usuário a ser cadastrado |
| `password` | `string` | Senha do usuário a ser cadastrado |
| `username` | `string` | Nome do usuário a ser cadastrado |

#### Pega um token JWT de acesso para o usuário

```http
  POST /login
```

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | Email que o usuário se cadastrou |
| `password` | `string` | Senha que o usuário se cadastrou |

#### Pega todas as tarefas do usuário

```http
  GET /task
```
Essa rota não recebe nenhum parâmetro mas é necessario enviar o token JWT no header da requisição no campo `authorization`.

#### Cadastra uma nova tarefa para o usuário

```http
  POST /task
```

Essa rota precisa receber o token JWT no header da requisição no campo `authorization`.

Ao criar uma tarefa com sucesso, o servidor retorna o id da tarefa criada.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | Título da tarefa a ser cadastrada |
| `startDate` | `date` | **Opcional** - Data de inicio da tarefa |
| `deadline` | `date` | **Opcional** - Data de fim da tarefa |
| `status` | `string` | **Opcional** - Status da tarefa, pode ser "pending", "in progress" ou "completed" |
| `details` | `string` | **Opcional** - Descrição sobre a tarefa |

#### Pega um token JWT de acesso para o usuário

```http
  DELETE /task/${id}
```

Essa rota precisa receber o token JWT no header da requisição no campo `authorization`.

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `${id}` | `string` | Id da tarefa a ser excluida |

## Aprendizados

Durante o desenvolvimento do projeto eu tentei utilizar as 

