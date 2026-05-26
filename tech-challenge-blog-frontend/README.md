# 🚀 FIAP - Front-End (Painel Administrativo & Blog)

Este repositório contém o código do Front-End do **Blog da FIAP**, uma aplicação interativa desenvolvida em React para o compartilhamento de artigos acadêmicos e feedbacks entre professores e alunos. O projeto faz parte do escopo do **Tech Challenge Fase 3**.

## 🏗️ Arquitetura da Aplicação

A estrutura do projeto foi planejada seguindo os padrões do ecossistema React (Vite) com componentização modular, estilização isolada e gerenciamento de estado global nativo. 

```text
src/
├── components/         # Componentes globais e reutilizáveis (Ex: Navbar)
├── contexts/           # Gerenciamento de estado global (Context API)
├── pages/              # Páginas principais da aplicação (Views)
│   ├── Home/           # Listagem de postagens e busca
│   ├── PostDetail/     # Leitura completa do post e área de comentários
│   ├── Login/          # Autenticação do Professor
│   └── Admin/          # Painel de controle CRUD (Listar, Criar, Editar, Deletar)
├── services/           # Configuração de integrações externas (Axios/API)
├── styles/             # Estilos globais da aplicação (Styled Components)
├── App.jsx             # Roteador e inicialização dos Provedores globais
└── main.jsx            # Ponto de entrada do React no DOM
```
* **React Hooks & Componentes Funcionais:** Desenvolvimento 100% estruturado sobre o padrão moderno do React, utilizando hooks nativos (`useState`, `useEffect`) e de ecossistema (`useParams`) para gerenciamento de ciclos de vida, estados locais e manipulação de rotas sem a necessidade de componentes baseados em classes.

## 🧠 Gerenciamento de Estado (Context API)

Para evitar o acoplamento de propriedades (Prop Drilling) e garantir que o status de autenticação do professor reflita instantaneamente na interface, foi implementada a Context API do React (AuthContext).

-> O estado de login é persistido de forma segura e reativa.
-> Componentes distantes, como a Navbar e a página de Login, comunicam-se em tempo real sem a necessidade de recarregar a página (window.location.reload()).

## 💅 Estilização

A identidade visual foi construída utilizando Styled Components (CSS-in-JS), permitindo a criação de componentes altamente customizáveis, encapsulados e livres de conflitos de escopo de CSS.

## 🛠️ Setup Inicial e Pré-requisitos

Antes de iniciar, certifique-se de ter o Node.js instalado em sua máquina ou de que o ambiente Docker do projeto esteja em execução.

1. Instalação das Dependências
Na raiz da pasta do front-end, execute o comando abaixo para instalar as bibliotecas necessárias (React Router, Axios, Styled Components):

```npm install```

2. Configuração da API
Certifique-se de que o arquivo src/services/api.js está apontando para o endereço correto do seu servidor back-end local ou contêiner Docker:

``` // Exemplo de configuração do Axios
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000' // Porta do seu Back-End Express
});

export default api;
```

3. Executando o Projeto em Desenvolvimento
Para rodar a aplicação localmente com suporte a Hot Reloading (Vite), utilize o comando:

```npm run dev```

A aplicação estará disponível no endereço: http://localhost:5173

## 📖 Guia de Uso
A aplicação divide-se em duas visões principais baseadas no perfil do usuário:

## 🧑‍🎓 Área do Aluno (Pública)
Home: Exibe uma listagem em ordem cronológica inversa de todos os artigos publicados pelos professores. Inclui uma barra de pesquisa funcional em tempo real para filtrar conteúdos por termos no título ou corpo do texto.

Leitura Completa: Ao clicar em "Ler post completo", o usuário tem acesso à íntegra do conteúdo do artigo, formatação textual preservada e uma Seção de Comentários interativa na base da página, onde qualquer aluno pode registrar seu nome e feedback sem necessidade de login.

## 🧑‍🏫 Painel do Professor (Privado)
Autenticação: O acesso é realizado clicando em "Login Professor" na Navbar.

E-mail institucional padrão: professor@fiap.com.br

Senha padrão: admin

Painel Administrativo: Após o login, o professor é redirecionado ao painel onde visualiza a contagem de suas publicações e uma tabela com ações gerenciais.

Fluxo CRUD:

Criar (+ Nova Post): Abre um formulário para criar um novo artigo enviado diretamente ao MongoDB.

Editar: Carrega os dados antigos do post no formulário, permitindo atualizações rápidas no banco.

Excluir: Remove permanentemente o artigo do banco de dados após uma janela de confirmação de segurança (window.confirm).