# Teste tecnico - desenvolvedor VueJs (Bobby)

## Sobre o Projeto
Este projeto é uma mini-aplicação desenvolvida para o controle de usuários, permitindo uma gestão eficiente das informações dos usuários com funcionalidades completas de CRUD (Criar, Ler, Atualizar, Excluir). A aplicação é construída utilizando o Vue.js 3 e é integrada com a API pública do Reqres.

## Objetivos do Projeto
- Permitir a criação, edição, exclusão e busca de usuários.
- Implementar autenticação e validação nos formulários.
- Incluir funcionalidades de paginação e filtro de busca.
- Dashboard para visualização de indicadores e gráficos.

## Funcionalidades Principais
- **Autenticação:** Implementação de login e gerenciamento de sessões de usuário.
- **Validação de Formulários:** Validação robusta para garantir a integridade dos dados inseridos.
- **Paginação:** Navegação eficiente entre páginas de resultados.
- **Filtro de Busca:** Busca dinâmica por nome ou email para facilitar a localização de usuários.
- **Sistema de Notificações:** Notificações personalizadas.
- **Geração de Dados Fictícios:** Criação de dados fictícios para apresentação, simulação e testes durante o desenvolvimento da aplicação.

## Tecnologias Utilizadas
- **Vue.js 3:** Framework JavaScript moderno para construção da interface de usuário.
- **API Reqres:** API para manipulação de dados de usuários.
- **Tailwind CSS:** Framework CSS para estilização responsiva e moderna.
- **ApexCharts:** Biblioteca para criação de gráficos interativos.
- **axios:** Cliente HTTP para comunicação com APIs.
- **vee-validate e yup:** Ferramentas para validação de formulários.
- **animejs:** Biblioteca para animações avançadas em JavaScript.


## Instruções de Configuração e Execução

### Pré-requisitos
- Node.js (v14 ou superior)
- npm (v6 ou superior)

### Passo a Passo para Configuração

1. Clone o repositório forkado:
    ```bash
    git clone https://github.com/Saviovd/teste-tecnico-front.git
    cd user-controller

2. Instale as dependências do projeto:
    ```bash
    npm install

3. Inicie o servidor de desenvolvimento:
    ```bash
    npm run serve


## Estrutura do Projeto
- A estrutura do projeto é organizada da seguinte forma:
    ```bash
    src/
    ├── assets/         # Imagens e outros arquivos estáticos
    ├── components/     # Componentes Vue reutilizáveis
    ├── router/         # Configurações de rotas
    ├── services/       # Serviços para interação com APIs
    ├── store/          # Estado global (Vuex)
    ├── utils/          # Funções globais
    ├── views/          # Páginas da aplicação
    ├── App.vue         # Componente raiz
    ├── main.js         # Ponto de entrada da aplicação

## Decisões de Design e Implementação

- **Vuex**: Utilizado para gerenciamento de estado global, facilitando a comunicação entre componentes.
- **axios**: Cliente HTTP escolhido pela sua simplicidade e flexibilidade.
- **Tailwind CSS**: Escolhido para estilização devido à sua abordagem utilitária, facilitando a criação de um design responsivo.
- **ApexCharts**: Biblioteca de gráficos escolhida pela sua facilidade de integração com Vue.js e pela diversidade de tipos de gráficos oferecidos.
- **vee-validate e yup**: Ferramentas de validação escolhidas para garantir a robustez dos formulários.

## Considerações Finais

Este projeto foi desenvolvido com foco na organização, semântica, estrutura e legibilidade do código. Além disso, a aplicação foi projetada para ser responsiva e oferecer uma experiência de usuário agradável e intuitiva.

Para qualquer dúvida ou sugestão, por favor, entre em contato.
