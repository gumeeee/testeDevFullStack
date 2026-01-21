 # testeDevFullStack

  Teste técnico para sistema de autenticação e gestão de usuários com diferentes níveis de permissão.

  ## Tecnologias Utilizadas

  | Camada | Tecnologia |
  |--------|------------|
  | **Frontend** | React, TypeScript, Vite, TailwindCSS |
  | **Backend** | Laravel, PHP, Sanctum |
  | **Banco de Dados** | SQLite |
  | **Containerização** | Docker, Docker Compose |

  ## Estrutura do Projeto

  testeDevFullStack/    
  ├── backend/          
  ├── frontend/         
  ├── docker-compose.yml    
  └── README.md

  ## Pré-requisitos

  - **PHP** >= 8.2
  - **Composer** >= 2.0
  - **Node.js** >= 18
  - **npm** >= 9
  - **Docker** e **Docker Compose** (opcional)

  ## Instalação e Execução

  ### Opção 1: Desenvolvimento Local (Recomendado)

  #### Backend (Laravel)

  ```bash
  # Entrar na pasta do backend
  cd backend

  # Instalar dependências
  composer install

  # Copiar arquivo de ambiente
  cp .env.example .env

  # Gerar chave da aplicação
  php artisan key:generate

  # Criar banco SQLite
  touch database/database.sqlite

  # Executar migrations
  php artisan migrate

  # Iniciar servidor (porta 8000)
  php artisan serve

  Frontend (React)

  # Em outro terminal, entrar na pasta do frontend
  cd frontend

  # Instalar dependências
  npm install

  # Iniciar servidor de desenvolvimento (porta 5173)
  npm run dev

  Acessar a Aplicação

  - Frontend: http://localhost:5173
  - Backend API: http://localhost:8000/api

  ---
  Opção 2: Docker Compose

  # Na raiz do projeto, criar arquivo .env com a APP_KEY
  echo "APP_KEY=base64:$(openssl rand -base64 32)" > .env

  # Subir os containers
  docker-compose up --build

  # Ou em modo detached (background)
  docker-compose up -d --build

  Acessar a Aplicação

  - Frontend: http://localhost:5173
  - Backend API: http://localhost:8000/api

  Comandos úteis do Docker

  # Ver logs
  docker-compose logs -f

  # Parar containers
  docker-compose down

  # Rebuild após mudanças
  docker-compose up --build