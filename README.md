# Pet Help API

API REST em desenvolvimento para registrar animais de estimação perdidos ou encontrados. O projeto está sendo construído gradualmente para praticar a integração entre Express, validação de dados, Prisma e PostgreSQL.

## Estado atual

Neste momento, a API permite:

- listar todos os pets com `GET /pets`;
- cadastrar um pet com `POST /pets`.

As próximas etapas são buscar um pet por ID, atualizar um cadastro e remover um pet. Portanto, o CRUD ainda está em andamento.

## Tecnologias

- Node.js e TypeScript;
- Express 5 para o servidor HTTP e as rotas;
- Zod 4 para validar e transformar os dados recebidos;
- Prisma ORM 7 para acessar o banco;
- PostgreSQL 17, executado em um contêiner Docker.

## Como a requisição percorre a API

```text
Cliente HTTP (por exemplo, Bruno)
        ↓
Express registra /pets
        ↓
Rota de pets
        ↓
Controller (valida a requisição e monta a resposta)
        ↓
Service (executa a operação usando Prisma)
        ↓
PostgreSQL
```

Responsabilidades dos arquivos principais:

| Caminho | Responsabilidade |
| --- | --- |
| `src/server.ts` | Configura o Express, interpreta JSON e registra o roteador `/pets`. |
| `src/routes/pets-routes.ts` | Associa métodos e caminhos HTTP aos controllers de pets. |
| `src/controllers/pets-controller.ts` | Trata a requisição, valida os dados e escolhe a resposta HTTP. |
| `src/services/pet-services.ts` | Executa operações de pets usando Prisma. |
| `src/schemas/pet-schemas.ts` | Define a validação Zod e os tipos de entrada e saída do cadastro. |
| `src/lib/prisma.ts` | Cria o Prisma Client com o adaptador PostgreSQL. |
| `prisma/schema.prisma` | Define o modelo `Pet` e os enums do banco. |
| `prisma/migrations/` | Guarda as migrações que versionam as alterações do banco. |
| `docker-compose.yml` | Define o serviço PostgreSQL para desenvolvimento local. |

## Requisitos

- Node.js e npm;
- Docker Desktop ou Docker Engine com Docker Compose;
- Bruno, Postman ou outro cliente HTTP para chamar a API.

## Configuração local

### 1. Instale as dependências

Na pasta do projeto, execute:

```bash
npm install
```

### 2. Configure as variáveis de ambiente

Crie ou ajuste o arquivo `.env` na raiz do projeto:

```dotenv
POSTGRES_USER=pethelp_user
POSTGRES_PASSWORD=troque_por_uma_senha_local
DATABASE_URL="postgresql://pethelp_user:troque_por_uma_senha_local@localhost:5432/pethelp?schema=public"
```

Use o mesmo usuário e a mesma senha em `POSTGRES_USER`, `POSTGRES_PASSWORD` e `DATABASE_URL`. O banco criado pelo Docker Compose chama-se `pethelp` e é exposto na porta `5432`. O arquivo `.env` está no `.gitignore`; não publique credenciais reais.

Se a senha contiver caracteres reservados de URL, codifique-os na parte da senha dentro de `DATABASE_URL`.

### 3. Inicie o PostgreSQL

```bash
docker compose up -d db
```

Confira se o serviço está ativo:

```bash
docker compose ps db
```

O Compose mantém os dados no volume `pets_data`, então reiniciar o contêiner não apaga os registros.

### 4. Aplique as migrações e gere o Prisma Client

O projeto guarda a configuração da CLI em `prisma7.config.ts`, por isso os comandos indicam esse arquivo explicitamente:

```bash
npx prisma migrate dev --config prisma7.config.ts
npx prisma generate --config prisma7.config.ts
```

`migrate dev` aplica as migrações pendentes no banco de desenvolvimento. `generate` atualiza o Prisma Client gerado em `src/generated/prisma` depois de mudanças no schema.

Para conferir o estado das migrações:

```bash
npx prisma migrate status --config prisma7.config.ts
```

### 5. Inicie a API

```bash
npm run dev
```

O servidor fica disponível em `http://localhost:3000`. O script `dev` usa `tsx watch`, que reinicia o servidor quando os arquivos TypeScript mudam.

## Endpoints disponíveis

### `GET /pets`

Retorna todos os pets cadastrados, ordenados pelo ID. Se ainda não houver registros, retorna uma lista vazia:

```json
[]
```

Resposta de sucesso: `200 OK`.

### `POST /pets`

Cadastra um pet. Envie o corpo como JSON com `Content-Type: application/json`:

```json
{
  "name": "Mimi",
  "specie": "cat",
  "descricao": "Gata cinza, vista pela última vez perto da praça",
  "city": "Manaus",
  "status": "lost",
  "dateDisappearance": "2026-10-10T09:00:00.000Z",
  "contact": "contato@example.com"
}
```

Valores aceitos:

- `specie`: `cat`, `dog` ou `other`;
- `status`: `lost` ou `found`;
- `dateDisappearance`: data e hora no formato ISO, por exemplo `2026-10-10T09:00:00.000Z`.

O Zod valida o corpo. A data chega como texto ISO e é transformada em um objeto `Date` antes de o service chamar o Prisma. Formatos localizados, como `10/10/2026`, não são aceitos pelo schema atual.

Resposta de sucesso: `201 Created`, com o registro criado, incluindo o ID gerado pelo banco.

Erros esperados:

- `400 Bad Request` quando o corpo não passa pela validação Zod; a resposta inclui os detalhes em `details`.
- `500 Internal Server Error` quando ocorre um erro inesperado durante a operação no banco.

## Modelo de dados

O modelo `Pet` em `prisma/schema.prisma` contém:

| Campo | Tipo / regra |
| --- | --- |
| `id` | Inteiro gerado automaticamente; chave primária. |
| `name` | Nome do pet. |
| `specie` | Enum: `dog`, `cat` ou `other`. |
| `descricao` | Descrição do pet. |
| `city` | Cidade relacionada ao desaparecimento ou encontro. |
| `status` | Enum: `lost` ou `found`. |
| `dateDisappearance` | Data e hora (`DateTime`). |
| `contact` | Informação de contato. |

## Próximas etapas

O desenvolvimento seguirá completando as operações do CRUD:

1. buscar um pet por ID (`GET /pets/:id`);
2. atualizar os dados de um pet (`PATCH /pets/:id`);
3. remover um pet (`DELETE /pets/:id`).

Depois, a API também pode ganhar documentação formal, paginação, filtros e testes automatizados.
