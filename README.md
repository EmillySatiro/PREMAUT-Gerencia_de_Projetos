# 🚀 PREMAUT - Gerência de Projetos

Sistema de gerenciamento educacional para projetos de fisioterapia, focado no apoio a pacientes, familiares e profissionais da área.

## 📋 Versão Atual

**v0.1.1-alpha** - Melhorias na Integração e Segurança

## 🛠️ Tecnologias Utilizadas

### Frontend
- **Next.js 15.5.3** - Framework React com TypeScript
- **React 19.1.0** - Biblioteca de interface
- **Tailwind CSS 4.0** - Framework CSS utilitário
- **Swiper 12.0.3** - Carrossel responsivo

### Backend
- **Node.js** - Runtime JavaScript
- **Express 4.18.2** - Framework web
- **TypeScript 5.0** - Linguagem tipada
- **Supabase 2.78.0** - Banco de dados e autenticação

### DevOps & Ferramentas
- **Docker + Docker Compose** - Containerização
- **Jest 30.2.0** - Testes automatizados
- **ESLint** - Qualidade de código
- **Multer 2.0.2** - Upload de arquivos
- **Nodemailer 7.0.10** - Envio de emails

## ⚡ Início Rápido

### Pré-requisitos
- Docker e Docker Compose
- Node.js 18+ (para desenvolvimento local)

### Instalação das Dependências
```bash
make install_dependecias
```

### Executar em Desenvolvimento
```bash
make run_dev
```

### Executar em Produção
```bash
make run_prod
```

### Executar Testes
```bash
make run_test_back
```

## 📁 Estrutura do Projeto

```
├── backend/                    # API Node.js + TypeScript
│   ├── src/
│   │   ├── controllers/        # Controladores da API
│   │   ├── routes/            # Rotas da API
│   │   ├── models/            # Modelos de dados
│   │   └── services/          # Serviços (Supabase)
│   └── tests/                 # Testes automatizados
├── frontend/                   # Aplicação Next.js
│   ├── src/app/
│   │   ├── components/        # Componentes reutilizáveis
│   │   ├── pages/            # Páginas da aplicação
│   │   └── services/         # Serviços de API
│   └── public/               # Arquivos estáticos
├── docker-compose.yml          # Produção
├── docker-compose.dev.yml      # Desenvolvimento
└── makefile                   # Comandos automatizados
```

## 🧩 Funcionalidades

### Sistema de Autenticação
- ✅ Login e cadastro de usuários
- ✅ Recuperação de senha via email
- ✅ Redefinição de senha
- ✅ Perfis diferenciados (paciente, família, monitor, professor, admin)

### Gerenciamento de Materiais
- ✅ Upload de arquivos educacionais
- ✅ Edição de metadados dos materiais
- ✅ Busca de arquivos por ID
- ✅ Atualização de informações de materiais
- ✅ Interface de gerenciamento no painel administrativo

### Painéis Administrativos
- ✅ Painel do administrador com integração Supabase
- ✅ Painel do professor
- ✅ Filtros e busca de usuários
- ✅ Estados de loading e interface responsiva

### Sistema de Relatórios
- ✅ API de relatórios implementada
- ✅ Interface para criação de relatórios
- ✅ Upload e visualização de documentos

## 🔧 Configuração do Ambiente

### Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto:

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=sua_url_do_supabase
NEXT_PUBLIC_SUPABASE_KEY=sua_chave_do_supabase

# Database Configuration
DATABASE_URL=sua_url_do_banco

# Email Configuration (Nodemailer)
EMAIL_USER=seu_email
EMAIL_PASS=sua_senha_email
```

### Docker Configuration
- **Desenvolvimento**: Use `docker-compose.dev.yml` para hot reload
- **Produção**: Use `docker-compose.yml` para build otimizado
- **Testes**: Serviço dedicado `backend-test` para CI/CD

## 🧪 Testes

O projeto inclui testes automatizados com Jest:

```bash
# Executar todos os testes
npm run test

# Executar testes com Docker
make run_test_back
```

Testes incluem:
- Testes de API (relatórios, upload)
- Validação de controladores
- Testes de integração

## 📚 Documentação da API

### Endpoints Principais

#### Autenticação
- `POST /api/usuarios/cadastro` - Cadastro de usuário
- `POST /api/usuarios/login` - Login
- `POST /api/usuarios/esqueci-senha` - Recuperação de senha

#### Materiais
- `GET /api/materiais` - Listar materiais
- `GET /api/materiais/:id` - Buscar material por ID
- `POST /api/materiais` - Upload de arquivo
- `PUT /api/materiais/:id/metadados` - Atualizar metadados
- `DELETE /api/materiais/:filename` - Remover arquivo

#### Relatórios
- `POST /api/relatorios` - Criar relatório
- `GET /api/relatorios` - Listar relatórios

## 🚀 Deploy

### Docker em Produção
```bash
docker compose up --build -d
```

### Serviços Expostos
- **Frontend**: `http://localhost:3000`
- **Backend**: `http://localhost:3001`

## 🤝 Contribuição

1. Fork o projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFuncionalidade`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova funcionalidade'`)
4. Push para a branch (`git push origin feature/NovaFuncionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 👥 Equipe

- **Frontend**: Next.js, React, TypeScript
- **Backend**: Node.js, Express, TypeScript  
- **Database**: Supabase (PostgreSQL)
- **DevOps**: Docker, Docker Compose

---

**PREMAUT** - Promovendo excelência em fisioterapia através da tecnologia 🏥💻