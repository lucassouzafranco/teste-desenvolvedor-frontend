# Pharma . Lib

📑 **Sobre o Projeto**

Este projeto consiste em um teste front end para a vaga de Desenvolvedor Front End jr. na Dot.Lib. Este repositório é um fork do repositório da vaga, sendo desenvolvido por mim e, posteriormente, encaminhado como pull request para os recrutadores.

O objetivo principal do projeto é construir uma aplicação CRUD com as principais funcionalidades de um software de bulário eletrônico, como busca por medicamento e exibição do estoque em tabelas. Além disso, também há funcionalidades como a criação de novos medicamentos e exportação de arquivo CSV.

&nbsp;

💼 **Regras de Negócio**

Edição de medicamentos: A edição de medicamentos permite alterar o nome do produto e a empresa, mas restringe a edição da data original de publicação e informações sobre os princípios ativos.

&nbsp;

✨ **Decisões Tomadas**

Durante o desenvolvimento do projeto, foram tomadas algumas decisões importantes para garantir a qualidade, organização e eficiência do código. Abaixo estão as decisões tomadas e o motivo pelo qual foram escolhidas.

- **Criação do projeto com Vite:** Optei por utilizar o Vite como meu bundler durante o desenvolvimento do projeto. Escolhi o Vite devido à sua velocidade de compilação incrivelmente rápida, o que é essencial para um fluxo de desenvolvimento ágil. Essas características tornam o Vite uma escolha ideal para projetos que priorizam a eficiência e a simplicidade no processo de desenvolvimento front-end.
  
- **Linguagem TypeScript:** Decidi adotar o TypeScript como linguagem principal para o desenvolvimento do projeto por sua capacidade de adicionar tipagem estática ao JavaScript, o que ajuda a detectar erros durante o desenvolvimento e a melhorar a qualidade e manutenibilidade do código. Com o TypeScript, pude definir tipos para variáveis, parâmetros de função, objetos e outros elementos do código, proporcionando um ambiente de desenvolvimento mais seguro e confiável.
  
- **Context API:** Optei por utilizar Context API do React para gerenciar o estado global da aplicação. Escolhi usar Context API devido à sua simplicidade de uso e sua integração nativa com o ecossistema do React. Com os Contexts e Providers nesse projeto, pude criar e compartilhar os principais estados entre componentes sem a necessidade de passar props manualmente por vários níveis da árvore de componentes.
  
- **Charts.js:** Decidi integrar a biblioteca Chart.js ao projeto para a visualização de dados no Dashboard. Escolhi o Chart.js devido à sua facilidade de uso, flexibilidade e variedade de tipos de gráficos disponíveis. Com o Chart.js, fui capaz de criar meu primeiro gráfico para a minha aplicação em pouquíssimo tempo.

&nbsp;

📚 **Organização do Código**

A estrutura de pastas do projeto é organizada da seguinte forma:


Na pasta `public`, encontramos os arquivos estáticos relacionados à aplicação. Todos esses arquivos são acessíveis publicamente.

Dentro da pasta `src`, encontramos a pasta que contém os componentes da aplicação, outra com os contextos, outra para o consumo dos dados da API e a última com os tipos dos dados.

&nbsp;

🎯 **Funcionalidades**

As funcionalidades principais do projeto incluem:

- **Busca e filtragem de medicamentos:** Além de pesquisar por medicamentos e laboratórios, os usuários podem aplicar filtros na área de pesquisa e visualizar tabelas com dados ordenados a partir dos filtros.
- **Manipulação de dados (CRUD):** Os usuários podem realizar todas as 4 operações com dados: Leitura, Escrita, Edição e Remoção.
- **Exportação de dados em CSV:** Os usuários podem fazer download direto das tabelas no formato de CSV pelo navegador.
- **Dashboard:** Para melhorar a capacidade de visualização e interpretação dos dados, os usuários podem visualizar um dashboard que contém um gráfico de frequência de cada medicamento.

&nbsp;

💻 **Instruções de Instalação e de Uso**

Para instalar e usar o projeto "teste-desenvolvedor-frontend", siga as instruções abaixo:

1. Faça um fork do projeto no GitHub: Acesse o link [https://github.com/lucassouzafranco/teste-desenvolvedor-frontend/fork](https://github.com/lucassouzafranco/teste-desenvolvedor-frontend/fork) e clique no botão "Fork" no canto superior direito da página. Isso criará uma cópia do projeto em seu próprio repositório do GitHub.

2. Clone o repositório: No seu terminal, navegue até o diretório onde deseja clonar o projeto e execute o seguinte comando:

`git clone git@github.com:lucassouzafranco/teste-desenvolvedor-frontend.git`


3. Acesse o diretório do projeto: Execute o seguinte comando no terminal para entrar no diretório do projeto:

`cd teste-desenvolvedor-frontend`

4. Instale as dependências: Execute o comando a seguir para instalar as dependências do projeto usando o npm:

`npm install`

5. Para carregar a API, use o json-server:

`npm install -g json-server`

`json-server api/dotlib.json -s ./api/public`

6. Inicie o servidor de desenvolvimento: Após a conclusão da instalação das dependências, execute o seguinte comando para iniciar o servidor de desenvolvimento:

`npm run dev`


7. Acesse o projeto: Abra o seu navegador e digite o seguinte endereço:

[http://localhost:5173](http://localhost:5173)

Agora você poderá visualizar e interagir com o projeto "teste-desenvolvedor-front-end" localmente em seu ambiente de desenvolvimento.

&nbsp;

🤴🏾 **Autor**

- **Nome:** Lucas Souza
- **E-mail:** lucassouzafranco1@gmail.com
- **Perfil no GitHub:** [https://github.com/lucassouzafranco](https://github.com/lucassouzafranco)
- **Perfil no LinkedIn:** [https://www.linkedin.com/in/lucas-souza-franco/](https://www.linkedin.com/in/lucas-souza-franco/)