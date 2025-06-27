# Como executar a aplicação

1. **Pré-requisitos:**
   - Node.js
   - npm

2. **Clone o repositório:**
   ```sh
   git clone <url-do-repositorio>
   cd frontend
   ```

3. **Instale as dependências:**
   ```sh
   npm install
   ```

4. **Execute a aplicação em modo de desenvolvimento:**
   ```sh
   npm run dev
   ```
   - A aplicação estará disponível em `http://localhost:3000`
---

# Teste Técnico - Frontend

> Knex Empresa Júnior de Computação

## Avaliação

Este teste é uma oportunidade para você demonstrar seus conhecimentos em desenvolvimento Frontend, boas práticas de programação e implementação de formulários e tratamentos de dados de API's. Avaliaremos diversos aspectos do seu código e da implementação da solução. Lembrando que não é necessário concluir tudo do projeto, fazer o que conseguir!

## Instruções

- Desenvolva a solução utilizando React + framework a sua escolha.
- Utilize uma biblioteca para gerenciamento de formulários (React hook form, formik, ...entre outros)
- Utilize um client HTTP para as requisições (Axios, GOT, ..., entre outros)
- Utilize uma biblioteca para validação de dados (Zod, Yup, ...entre outros)
- Você pode utilizar quaisquer outras bibliotecas que considerar necessárias
- Adicione um arquivo README.md com instruções claras de como executar sua aplicação
- O desenvolvimento deve ser individual

## Desafio

Desenvolver uma tela que fará um CRUD (CREATE, READ, UPDATE, DELETE) de posts de um usuário aleatório na sua plataforma. A tela deverá conter um HEADER e FOOTER exemple para uma rede social, com logo e barras de navegações (mesmo que não sejam links de fato). Os posts serão feitos em requisição a API JSONPlaceholder e os dados do usuário serão obtidos pela API RandomUser.

### A solução deve focar em três pontos principais:

1. Implementação de um formulário para montar o body da requisição do post.
2. Validações em tempo real com feedback visual claro.
3. Confirmação de envios e atualização da página (feita em cache).
4. Tratamento das respostas com feedbacks e components populados.

### Do usuário do sistema principal (RandomUser)

1. **Informações do usuário** - Fazer uma requisição de usuários na API e apresentar, de forma estética e coesa a redes sociais as informações do usuário "logado":

   - Nome completo
   - Foto de perfil
   - Email
   - Telefone
   - Idade
   - Localização (dê preferencia a BR).

2. **Do Token** - Guardar em Cookies o token SHA256 gerado pela requisição para persistência do usuário.
   - ! A cada requisição nova a API, os usuários são alterados e sua aplicação deve atualizar isso caso dê reload.

### Dos posts do sistema (JSONPlaceholder)

1. **Informações do post** - Apresentar, de forma estética e coesa a redes sociais as informações requisitadas da API:

   - Título do post
   - Texto do post
   - Atrelar o ID do post a um componente

2. **Da estilização do componente Post** - Utilizar a mesma requisição feita sobre os usuários e popular a tela com:
   - Imagem
   - Nome
   - Localização
3. **Criar um novo post** - Ter um botão ao final da amostra para criar um novo post
   - O post deve seguir a forma de criação disponível na documentação da API JSONPlaceholder

### Requisitos Gerais de Validação

- Feedback visual imediato para o usuário.
- Mensagens de erro claras e específicas.
- Validação em tempo real nos campos.
- Permitir CRUD dos posts criados pelo usuário fictício.
- Validar formulário completo antes do envio final.

## O que não pode faltar neste projeto?

- Uma releitura do protótipo, em Figma mesmo [preferencialmente] ou outra ferramenta análoga
- Testes automatizados (Jest, React Testing Library)
- Uso de Eslint e Prettier
- Código limpo e semântico
- Componentização adequada
- Responsividade
- Tratamento de erros

## O que pode te destacar?

- Uso de Typescript
- Utilização de recursos modernos de UI
- Deploy da aplicação
- Animações fluidas nas transições
- Cobertura de testes
- Pouca usabilidade de recursos de IA.

## Entrega

- O código deve ser disponibilizado em um repositório público no GitHub
- Inclua instruções detalhadas de como rodar o projeto
- Screenshots ou GIFs da aplicação funcionando

## Prazo

O prazo para entrega está especificado no edital do processo seletivo.

## Documentações das APIS.

- Acesse a documentação da api RandomUser [aqui!](https://randomuser.me/documentation)
- Acesse a documentação da api JSONPlaceholder [aqui!](https://jsonplaceholder.typicode.com/guide/)

## Contato

Em caso de dúvidas, utilize o canal de comunicação informado no início do processo seletivo.