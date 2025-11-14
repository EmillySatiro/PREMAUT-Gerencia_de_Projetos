# 🤝 Guia de Contribuição - PREMAUT

Obrigado por considerar contribuir para o projeto PREMAUT! Este guia irá ajudá-lo a entender como contribuir efetivamente.

## 📋 Índice

- [Código de Conduta](#código-de-conduta)
- [Como Contribuir](#como-contribuir)
- [Configuração do Ambiente](#configuração-do-ambiente)
- [Fluxo de Desenvolvimento](#fluxo-de-desenvolvimento)
- [Padrões de Código](#padrões-de-código)
- [Testes](#testes)
- [Pull Requests](#pull-requests)
- [Reportar Issues](#reportar-issues)

## 🌟 Código de Conduta

Ao contribuir para este projeto, você concorda em seguir nosso código de conduta:

- Seja respeitoso e inclusivo
- Use linguagem welcoming
- Seja paciente com novos contribuidores
- Foque no que é melhor para a comunidade

## 🚀 Como Contribuir

### Tipos de Contribuições

- 🐛 **Bug fixes** - Correção de problemas
- ✨ **Features** - Novas funcionalidades
- 📚 **Documentação** - Melhorias na documentação
- 🎨 **UI/UX** - Melhorias na interface
- ⚡ **Performance** - Otimizações
- 🧪 **Testes** - Adição ou melhoria de testes

## 💻 Configuração do Ambiente

### 1. Fork e Clone
```bash
# Fork o repositório no GitHub
git clone https://github.com/SEU_USUARIO/PREMAUT-Gerencia_de_Projetos.git
cd PREMAUT-Gerencia_de_Projetos
```

### 2. Configuração Inicial
```bash
# Copie o arquivo de environment
cp .env.example .env

# Instale as dependências
make install_dependecias

# Execute o projeto em desenvolvimento
make run_dev
```

### 3. Configuração do Git
```bash
# Adicione o remote upstream
git remote add upstream https://github.com/EmillySatiro/PREMAUT-Gerencia_de_Projetos.git

# Configure seu usuário
git config user.name "Seu Nome"
git config user.email "seu.email@example.com"
```

## 🔄 Fluxo de Desenvolvimento

### 1. Sincronize com Upstream
```bash
git checkout main
git pull upstream main
```

### 2. Crie uma Branch
```bash
# Para features
git checkout -b feature/nome-da-funcionalidade

# Para bugs
git checkout -b bugfix/nome-do-bug

# Para documentação
git checkout -b docs/melhoria-documentacao
```

### 3. Desenvolva e Teste
```bash
# Faça suas alterações
# Execute os testes
make run_test_back

# Verifique o linting
cd backend && npm run lint
cd frontend && npm run lint
```

### 4. Commit Suas Mudanças
```bash
git add .
git commit -m "tipo(escopo): descrição concisa"

# Exemplo:
# feat(materiais): adicionar funcionalidade de busca avançada
# fix(auth): corrigir validação de email
# docs(readme): atualizar instruções de instalação
```

### 5. Push e Pull Request
```bash
git push origin sua-branch-aqui
```

## 📝 Padrões de Código

### Commits
Usamos o padrão [Conventional Commits](https://www.conventionalcommits.org/):

```
tipo(escopo): descrição

[corpo opcional]

[rodapé opcional]
```

**Tipos:**
- `feat`: nova funcionalidade
- `fix`: correção de bug
- `docs`: documentação
- `style`: formatação, ponto e vírgula, etc
- `refactor`: refatoração de código
- `test`: adição de testes
- `chore`: atualização de dependências, configuração

### JavaScript/TypeScript
```typescript
// ✅ Bom
interface Usuario {
  id: string;
  nome: string;
  email: string;
}

const buscarUsuario = async (id: string): Promise<Usuario> => {
  // implementação
};

// ❌ Evitar
function buscarUsuario(id) {
  // implementação sem tipos
}
```

### CSS/Styling
```css
/* ✅ Bom - Use classes semânticas */
.upload-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

/* ❌ Evitar - Classes genéricas */
.container1 {
  /* estilos */
}
```

## 🧪 Testes

### Backend
```bash
cd backend
npm test                    # Todos os testes
npm test -- --watch        # Modo watch
npm test arquivo.test.ts    # Teste específico
```

### Estrutura de Testes
```typescript
describe('Materiais Controller', () => {
  beforeEach(() => {
    // setup
  });

  it('deve retornar lista de materiais', async () => {
    // Arrange
    const mockData = [{ id: 1, nome: 'Material 1' }];
    
    // Act
    const result = await getMateriais();
    
    // Assert
    expect(result).toEqual(mockData);
  });
});
```

## 📨 Pull Requests

### Antes de Enviar
- [ ] Código está funcionando localmente
- [ ] Testes passando
- [ ] Linting sem erros
- [ ] Documentação atualizada (se necessário)
- [ ] Commits seguem o padrão conventional

### Template de PR
```markdown
## 📝 Descrição
Breve descrição das mudanças realizadas.

## 🎯 Tipo de Mudança
- [ ] 🐛 Bug fix
- [ ] ✨ Nova funcionalidade
- [ ] 💥 Breaking change
- [ ] 📚 Documentação

## 🧪 Como Testar
1. Paso 1
2. Passo 2
3. Passo 3

## 📸 Screenshots (se aplicável)
![Antes](url-da-imagem)
![Depois](url-da-imagem)

## ✅ Checklist
- [ ] Código testado localmente
- [ ] Testes automatizados passando
- [ ] Documentação atualizada
- [ ] Commit messages seguem convenção
```

## 🐛 Reportar Issues

### Template de Bug Report
```markdown
**Descrição do Bug**
Descrição clara e concisa do problema.

**Para Reproduzir**
1. Vá para '...'
2. Clique em '....'
3. Role até '....'
4. Veja o erro

**Comportamento Esperado**
Descrição do que deveria acontecer.

**Screenshots**
Se aplicável, adicione screenshots.

**Ambiente:**
 - OS: [e.g. Ubuntu 20.04]
 - Browser: [e.g. Chrome, Safari]
 - Version: [e.g. 22]
 - Node.js: [e.g. 18.17.0]
 - Docker: [e.g. 24.0.5]
```

### Template de Feature Request
```markdown
**Funcionalidade Desejada**
Descrição clara da funcionalidade.

**Problema que Resolve**
Explicação do problema atual.

**Solução Proposta**
Descrição de como você gostaria que funcionasse.

**Alternativas Consideradas**
Outras soluções que você considerou.
```

## 🏷️ Labels e Prioridades

### Labels de Tipo
- `bug` - Problemas no código
- `enhancement` - Melhorias
- `documentation` - Documentação
- `question` - Perguntas

### Labels de Prioridade
- `priority/high` - Alta prioridade
- `priority/medium` - Média prioridade  
- `priority/low` - Baixa prioridade

### Labels de Status
- `status/needs-review` - Precisa revisão
- `status/in-progress` - Em desenvolvimento
- `status/blocked` - Bloqueado

## 💬 Comunidade

- 💬 **Discord**: [Link do servidor] (em breve)
- 📧 **Email**: premaut@example.com
- 📋 **Issues**: Use GitHub Issues para bugs e features
- 💡 **Discussions**: Use GitHub Discussions para perguntas

## 🎉 Reconhecimento

Todos os contribuidores serão reconhecidos no README principal do projeto. Sua contribuição é valiosa!

---

**Obrigado por contribuir! 🚀**