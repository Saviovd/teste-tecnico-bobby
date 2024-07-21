<template>
    <div class="p-6 bg-gray-900 text-white rounded">
        <h1 class="text-3xl font-bold mb-4">Sobre o Projeto</h1>
        <p class="mb-4">
            Este projeto é uma mini-aplicação desenvolvida para o controle de usuários, permitindo uma gestão eficiente
            das informações dos usuários com funcionalidades completas de CRUD (Criar, Ler, Atualizar, Excluir).
            A aplicação é construída utilizando o Vue.js 3 e é integrada com a API pública do <a
                href="https://reqres.in/" target="_blank" class="text-indigo-400 hover:underline">Reqres</a>.
        </p>

        <h2 class="text-2xl font-semibold mb-2">Objetivos do Projeto</h2>
        <ul class="list-disc ml-6 mb-4">
            <li>Permitir a criação, edição, exclusão e busca de usuários.</li>
            <li>Implementar autenticação e validação nos formulários.</li>
            <li>Incluir funcionalidades de paginação e filtro de busca.</li>
            <li>Dashboard para visualização de indicadores e gráficos.</li>
        </ul>

        <h2 class="text-2xl font-semibold mb-2">Funcionalidades Principais</h2>
        <ul class="list-disc ml-6 mb-4">
            <li><strong>Autenticação:</strong> Implementação de login e gerenciamento de sessões de usuário.</li>
            <li><strong>Validação de Formulários:</strong> Validação robusta para garantir a integridade dos dados
                inseridos.</li>
            <li><strong>Paginação:</strong> Navegação eficiente entre páginas de resultados.</li>
            <li><strong>Filtro de Busca:</strong> Busca dinâmica por nome ou email para facilitar a localização de
                usuários.</li>
            <li><strong>Sistema de Notificações:</strong> Notificações personalizadas</li>
            <li><strong>Geração de Dados Fictícios:</strong> Criação de dados fictícios para apresentação, simulação e testes durante o
                desenvolvimento da aplicação.</li>
        </ul>

        <h2 class="text-2xl font-semibold mb-2">Tecnologias Utilizadas</h2>
        <ul class="list-disc ml-6 mb-4">
            <li><strong>Vue.js 3:</strong> Framework JavaScript moderno para construção da interface de usuário.</li>
            <li><strong>API Reqres:</strong> API para manipulação de dados de usuários.</li>
            <li><strong>Tailwind CSS:</strong> Framework CSS para estilização responsiva e moderna.</li>
            <li><strong>ApexCharts:</strong> Biblioteca para criação de gráficos interativos.</li>
            <li><strong>axios:</strong> Cliente HTTP para comunicação com APIs.</li>
            <li><strong>vee-validate e yup:</strong> Ferramentas para validação de formulários.</li>
            <li><strong>animejs:</strong> Biblioteca para animações avançadas em JavaScript.</li>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AboutView'
};
</script>
