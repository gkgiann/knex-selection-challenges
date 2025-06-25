# Como executar a aplicação

1. **Pré-requisitos:**
   - Docker e Docker Compose instalados

2. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio>
   cd backend
   ```

3. **Configure o ambiente:**
   - Crie um arquivo `.env` na raiz do projeto com:
     ```env
     DATABASE_URL="postgresql://postgres:prisma@postgres:5432/postgres?schema=public"
     ```

4. **Suba toda a API e o banco Postgres com Docker Compose:**
   ```sh
   docker compose up -d --build
   ```
   - Isso irá subir o banco de dados e a API juntos.
   - A API estará disponível em `http://localhost:3333`.

5. **Acesse a documentação Swagger:**
   - Acesse `http://localhost:3333/docs` para ver a documentação e ver exemplos de requisição/resposta.

6. **Upload de dados:**
    - Use o endpoint `/upload-csv` para importar o CSV de deputados e despesas.
---

# Teste Técnico - Backend

> Knex Empresa Júnior de Computação

## Avaliação

Este teste é uma oportunidade para você demonstrar seus conhecimentos em desenvolvimento backend, modelagem de dados, e boas práticas de programação. Avaliaremos diversos aspectos do seu código e da implementação da solução. Lembrando que não é necessário concluir tudo do projeto, fazer o que conseguir!

## Instruções

- Desenvolva a solução utilizando a linguagem e framework de sua preferência
- Utilize qualquer ORM de sua escolha
- Você pode utilizar quaisquer bibliotecas externas que considerar necessárias
- Adicione um arquivo README.md com instruções claras de como executar sua aplicação
- O desenvolvimento deve ser individual

## Descrição do desafio

A Cota para o Exercício da Atividade Parlamentar (CEAP) custeia as despesas do mandato de deputados, como passagens aéreas e contas de celular. Através do portal da transparência, temos acesso a essas despesas e podemos analisar como e onde os políticos estão gastando.

Seu desafio é criar uma API para gerenciar e consultar essas despesas.

- Fonte de Dados: Utilize a API de Dados Abertos da Câmara dos Deputados para obter as despesas referentes ao ano de 2025 em formato CSV.

  - [Link da API (buscar em "Dados Abertos - CSV")](https://dadosabertos.camara.leg.br/swagger/api.html?tab=staticfile#staticfile).
  - [Documentação com explicações dos campos](https://dadosabertos.camara.leg.br/howtouse/2023-12-26-dados-ceap.html).

- Filtragem dos dados:
  - Ignore linhas que não contenham valor no campo `sgUF` (Sigla da Unidade Federativa).
  - Para fins de cálculos de despesa, considere o campo `vlrLiquido`. Este é o valor que de fato foi debitado da cota do candidato.

## Requisitos Obrigatórios

Sua solução deve obrigatoriamente atender aos seguintes requisitos:

### 1. Implementação de uma API RESTful

- Crie uma **API REST** que responda a requisições HTTP e manipule os dados das despesas e deputados.
- Os endpoints devem seguir os princípios RESTful (uso de verbos HTTP, status codes apropriados, URLs descritivas).

### 2. Organização dos Dados no Banco de Dados (Endpoint de Upload/Processamento)

- **Endpoint de Upload/Processamento:** Crie um endpoint (por exemplo, `POST /upload-ceap` ou `POST /processar-csv`) que seja responsável por:
  - Receber ou processar o arquivo CSV baixado da fonte de dados (pode ser via upload, ou a API pode baixá-lo internamente).
  - **Ler e parsear** o conteúdo do CSV.
  - **Extrair e organizar** os dados nas tabelas `Deputado` e `Despesa` no banco de dados, conforme o modelo de entidades abaixo.
  - Garanta que a **importação seja idempotente** para evitar duplicidade de dados em caso de múltiplas chamadas ao endpoint. Considere formas de verificar se um deputado já existe antes de inseri-lo, por exemplo, usando o CPF ou um identificador único.

### 3. Listagem de Deputados por Estado

- Crie um endpoint (ex: `GET /deputados?uf=SP`) que permita **listar todos os deputados** filtrando por sua **Unidade Federativa (UF)**.
- O endpoint deve retornar os dados básicos de cada deputado (id, nome, uf, cpf, partido).

### 4. Endpoint de Relatório (Somatório de Despesas)

- Desenvolva um endpoint de relatório que apresente o **somatório das despesas**.
- **Relatório Específico por Deputado:** Deve ser possível consultar o somatório das despesas de **um deputado específico** (ex: `GET /relatorios/deputados/:id/total-despesas`).
- **Relatório Geral:** Deve ser possível consultar o **somatório total de despesas de todos os deputados** combinados (ex: `GET /relatorios/total-despesas`).

### 5. Listagem de Despesas

- Crie um endpoint (ex: `GET /despesas` ou `GET /deputados/:id/despesas`) que permita **listar as despesas**, exibindo os seguintes campos de forma clara:
  - `dataEmissao` (Data da emissão do documento fiscal da despesa)
  - `txtFornecedor` (Nome do fornecedor ou estabelecimento)
  - `vlrLiquido` (Valor monetário líquido da despesa)
  - `urlDocumento` (URL do documento fiscal ou comprovante da despesa, se disponível)
- Considere a possibilidade de **paginação e filtros** (por exemplo, por data, por fornecedor) para este endpoint, se houver tempo.

### Entidades e Relacionamentos

Seu banco de dados deve conter as seguintes entidades e seus respectivos relacionamentos:

**Deputado**

- `id` (Chave primária, único para cada deputado)
- `nome` (Nome completo do deputado)
- `uf` (Sigla da Unidade Federativa do deputado)
- `cpf` (CPF do deputado, se disponível e relevante para a identificação única)
- `partido` (Partido político do deputado)
- **Relacionamento:** Um `Deputado` pode ter **várias `Despesas`**.

**Despesa**

- `id` (Chave primária, único para cada despesa)
- `dataEmissao` (Data em que a despesa foi emitida)
- `fornecedor` (Nome do estabelecimento ou fornecedor da despesa)
- `valorLiquido` (Valor monetário líquido da despesa)
- `urlDocumento` (URL do documento fiscal ou comprovante da despesa, se disponível)
- **Relacionamento:** Cada `Despesa` **pertence a um `Deputado`** (chave estrangeira referenciando o `id` do Deputado).

## O que pode te destacar?

- Docker
- Deploy da aplicação
- S.O.L.I.D.
- Uso de PostgreSQL
- Monitoramento de erros
- Testes automatizados
- Documentação detalhada

## Entrega

- O código deve ser disponibilizado em um repositório público no GitHub
- Inclua instruções detalhadas de como rodar o projeto

## Prazo

O prazo para entrega está especificado no edital do processo seletivo.

## Contato

Em caso de dúvidas, utilize o canal de comunicação informado no início do processo seletivo.
