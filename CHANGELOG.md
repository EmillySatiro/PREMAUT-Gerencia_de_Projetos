# 📝 Changelog

Todas as mudanças notáveis neste projeto serão documentadas neste arquivo.

O formato é baseado em [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
e este projeto adere ao [Versionamento Semântico](https://semver.org/lang/pt-BR/).

## [0.1.1-alpha] - 2025-01-14

### 🚀 Novidades
- **Integração Completa de Materiais**: Implementação completa da funcionalidade de edição de materiais educacionais
  - Nova rota `GET /api/materiais/:id` para busca de arquivos por ID
  - Nova rota `PUT /api/materiais/:id/metadados` para atualização de metadados
  - Interface de edição no frontend com carregamento de dados existentes
  - Suporte a modo criação e edição na mesma tela

### 🔒 Melhorias de Segurança
- **Remoção de Credenciais Hardcoded**: Substituição de credenciais do Supabase hardcoded por variáveis de ambiente
  - Implementação de `process.env.NEXT_PUBLIC_SUPABASE_URL`
  - Implementação de `process.env.NEXT_PUBLIC_SUPABASE_KEY`
  - Melhor segurança na configuração de ambiente

### 🎨 Melhorias na Interface
- **Painel Administrativo Aprimorado**: Integração completa com Supabase no painel admin
  - Estados de loading durante busca de usuários
  - Componente dropdown para filtros implementado
  - Substituição de Header por TopBar para consistência visual

### 🔧 Melhorias Técnicas
- **Funcionalidades de Upload Expandidas**: 
  - Suporte a upload e substituição de arquivos existentes
  - Preview de capas de arquivos no modo edição
  - Validação de campos e feedback visual melhorado
  - Estados de loading durante operações de salvamento

### 🛠️ Ferramentas de Desenvolvimento
- **Makefile Expandido**: Novos comandos para facilitar o desenvolvimento
  - `make install_dependecias` - Instalação automática de dependências
  - `make run_dev` - Execução em modo desenvolvimento
  - Comandos específicos para backend e frontend separadamente

### 🐛 Correções
- Correção na configuração de cliente Supabase no frontend
- Melhoria na navegação com implementação de `router.back()`
- Ajustes na responsividade dos componentes de upload

### 📚 Documentação
- README.md principal criado com documentação completa
- Instruções de setup e configuração de ambiente
- Documentação da API atualizada
- Guia de contribuição implementado

## [0.1.0-alpha] - 2025-01-13

### 🚀 Primeira Release
Primeira versão de testes do sistema PREMAUT para Gerência de Projetos.

### ✨ Funcionalidades Implementadas
- **Arquitetura Completa**: Frontend (Next.js/TypeScript) e backend (Node.js/Express/TypeScript)
- **Docker Configuration**: Setup completo com docker-compose para desenvolvimento e produção
- **Integração Supabase**: Banco de dados PostgreSQL e sistema de autenticação
- **API RESTful**: Controllers implementados para relatórios, upload e usuários
- **Interface Completa**: Páginas estruturadas com componentes reutilizáveis
- **Sistema de Autenticação**: Login, cadastro e recuperação de senha
- **Painéis Diferenciados**: Admin, professor, paciente, família e monitor
- **Testes Automatizados**: Jest configurado no backend
- **Quality Assurance**: ESLint e TypeScript para qualidade de código

### 🧪 Funcionalidades em Teste
- Fluxo completo de autenticação
- API de relatórios e upload de arquivos
- Integração frontend-backend via serviços
- Navegação entre perfis de usuário
- Páginas de materiais de apoio

### ⚙️ Próximos Passos (Planejados)
- Finalização dos controllers e rotas da API
- Conexão de formulários com endpoints
- Implementação de validação de dados
- CRUD completo para pacientes, eventos e relatórios
- Autenticação JWT e middleware de autorização
- Gráficos e dashboards nos painéis
- Melhorias de responsividade
- Expansão da cobertura de testes

---

### Formato das Versões

- **MAJOR.MINOR.PATCH-alpha/beta/rc**
- **Adicionado** para novas funcionalidades
- **Alterado** para mudanças em funcionalidades existentes
- **Deprecated** para funcionalidades que serão removidas
- **Removido** para funcionalidades removidas
- **Corrigido** para correções de bugs
- **Segurança** para vulnerabilidades corrigidas