# Blog de Professores - Rede Pública (API Escalável)

Este projeto consiste em uma plataforma de blogging dinâmico desenvolvida em **Node.js**, substituindo a antiga solução OutSystems para garantir escalabilidade nacional. A aplicação permite que professores publiquem aulas e conhecimentos de forma centralizada.

## Tecnologias Utilizadas
*   **Back-end:** Node.js com Express.js
*   **Banco de Dados:** MongoDB (NoSQL) para alta performance em buscas textuais.
*   **Containerização:** Docker e Docker Compose.
*   **Testes:** Jest e Supertest (Cobertura atual: >75%).
*   **CI/CD:** GitHub Actions (configurado em `.github/workflows`).

## Como rodar o projeto
Certifique-se de ter o Docker instalado e execute:

```bash
docker-compose up --build
docker-compose up
```

A API estará disponível em `http://localhost:3000`.

## Endpoints da API

| Método | Rota | Descrição |
| :--- | :--- | :--- |
| **GET** | `/posts` | Listagem de todas as postagens. |
| **GET** | `/posts/:id` | Leitura de uma postagem específica. |
| **GET** | `/posts/search?q=termo` | Busca por palavra-chave no título ou conteúdo. |
| **POST** | `/posts` | Criação de nova postagem (Requer: titulo, conteudo, autor). |
| **PUT** | `/posts/:id` | Edição de postagem existente. Eg.: http://localhost:3000/posts/search?q=Node|
| **DELETE** | `/posts/:id` | Exclusão de postagem. |

## Testes e Qualidade

Para rodar os testes unitários e verificar a cobertura de código, utilize o comando abaixo com o container em execução:

```bash
docker exec -it blog_api_node npm test
```
## Documentação

### A Transição do Low-Code para Pro-Code
A migração da plataforma **OutSystems** para **Node.js** foi um salto de maturidade técnica. Enquanto o *Low-Code* oferecia velocidade inicial, o Node.js me deu o controle total sobre o **Back-end**, permitindo otimizações específicas para o panorama nacional e maior liberdade na definição da arquitetura.

### Desafios Enfrentados
*   **Containerização:** Configurar o **Docker** para que a API aguardasse a conexão do **MongoDB** foi um desafio de infraestrutura superado com o uso de `depends_on` e verificações de saúde nos logs, garantindo que o servidor só subisse após o banco estar pronto.
*   **Cobertura de Testes:** Implementar testes unitários com **Jest** exigiu uma mudança de mentalidade, focando em "testar para garantir a estabilidade". O resultado foi uma cobertura superior a **75%**, assegurando que funções críticas (como a exclusão e edição) funcionem corretamente em larga escala.
*   **Busca Dinâmica:** Implementar o endpoint de `search` com filtros de **Regex** no MongoDB foi essencial para atender ao requisito de busca por palavras-chave de forma performática e intuitiva para o usuário final.

### Conclusão
O projeto demonstrou que a utilização de tecnologias modernas como **Node.js**, **Docker** e **CI/CD** (GitHub Actions) permite transformar uma solução local em uma plataforma robusta, segura e pronta para os desafios da educação em escala nacional.

