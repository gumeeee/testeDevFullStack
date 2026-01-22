 # testeDevFullStack

  Teste técnico para sistema de autenticação e gestão de usuários com diferentes níveis de permissão.

  Deploy do Front end via AWS Amplify: https://main.d1pvj7rp3jo9t2.amplifyapp.com
  Deploy do Back end via AWS Lightsail com Quick Tunnel da Cloudflare: https://massive-basket-wine-cold.trycloudflare.com
  Deploy Statico do Back end na Railway: pacific-kindness-production-48ea.up.railway.app/api/v1/ 

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

  Scripts Disponíveis

  Backend

  php artisan serve          # Iniciar servidor
  php artisan migrate        # Executar migrations
  php artisan migrate:fresh  # Recriar banco
  php artisan test           # Executar testes

  Frontend

  npm run dev      # Servidor de desenvolvimento
  npm run build    # Build de produção
  npm run preview  # Preview do build
  npm run lint     # Verificar código
  npm run test     # Executar testes

  Variáveis de Ambiente

  Backend (backend/.env)

  APP_NAME=testeDevFullStack
  APP_ENV=local
  APP_DEBUG=true
  APP_KEY=  # Gerado com php artisan key:generate

  DB_CONNECTION=sqlite

  Frontend (frontend/.env)

  VITE_API_URL=http://localhost:8000/api