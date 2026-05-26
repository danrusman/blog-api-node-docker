# Tech Challenge - Blog FIAP 

Este repositório contém o projeto completo do Tech Challenge desenvolvido para a FIAP. A aplicação consiste em um sistema de Blog com arquitetura baseada em microsserviços/monorepo, totalmente conteinerizada com Docker.

## 🏗️ Arquitetura do Projeto

O projeto está dividido em três pilares principais rodando de forma orquestrada:

1. **Frontend**: Aplicação SPA desenvolvida em **React + Vite**, otimizada e servida através de um servidor de produção **Nginx** na porta `80`.
2. **Backend**: API RESTful desenvolvida em **Node.js** respondendo na porta `3000`.
3. **Database**: Banco de dados NoSQL **MongoDB** na porta `27017` com persistência de dados via Docker Volumes.

---

## 🛠️ Pré-requisitos

Para rodar este projeto localmente, você só precisa ter instalado em sua máquina:

* [Docker](https://www.docker.com/)
* [Docker Compose](https://docs.docker.com/compose/)

---

## 🚀 Como Rodar a Aplicação

Graças à orquestração com o Docker Compose, você pode subir o ecossistema completo (Banco, API e Frontend) com apenas um comando.

1. Clone o repositório para a sua máquina:
   ```bash
   git clone [https://github.com/danrusman/blog-api-node-docker.git](https://github.com/danrusman/blog-api-node-docker.git)
   ```

2. Acesse a pasta raiz do projeto:
    ```bash
    cd blog-api-node-docker
    ```
3. Execute o comando para buildar e iniciar todos os containers:
    ```bash
    docker compose up --build
    ``` 
4. Aguarde a inicialização dos serviços. Assim que os logs estabilizarem, a aplicação estará disponível em:
    - Frontend (Blog): http://localhost
    - Backend (API): http://localhost:3000

## Como Parar a Aplicação
Para encerrar os containers e liberar as portas do seu sistema, basta rodar:
    ```bash
    docker compose down
    ``` 
