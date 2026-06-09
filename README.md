# 📋 ToDo List

Uma aplicação moderna de gerenciamento de tarefas inspirada no Trello, desenvolvida com foco em produtividade, organização e experiência **Mobile First**.

O sistema permite que usuários criem múltiplos quadros para diferentes áreas da vida, como:

- 📚 Estudos
- 💼 Trabalho
- 🏠 Tarefas Domésticas
- 🚀 Projetos Pessoais
- 💰 Finanças
- 🎯 Objetivos

---

# ✨ Funcionalidades

## 🔐 Autenticação

- Login com e-mail e senha
- Logout seguro
- Persistência de sessão
- Recuperação de senha
- Integração futura com Google Login

---

## 📁 Meus Quadros

Criação de quadros personalizados para organização de tarefas.

### Recursos

- Criar quadros
- Editar quadros
- Excluir quadros
- Favoritar quadros
- Visualização em cards
- Indicador de progresso
- Estatísticas por quadro

### Exemplos

- Estudos
- Trabalho
- Casa
- Projetos
- Finanças

---

## ✅ Minhas Tarefas

Gerenciamento completo de tarefas.

### Recursos

- Criar tarefa
- Editar tarefa
- Excluir tarefa
- Marcar como concluída
- Adicionar descrição
- Definir categoria
- Definir data
- Definir horário
- Filtrar tarefas
- Pesquisar tarefas

### Status

- Pendente
- Em andamento
- Concluída

---

## 📅 Agenda

Visualização de compromissos em formato de agenda.

### Recursos

- Visualização diária
- Visualização semanal
- Timeline por horário
- Próximos compromissos
- Resumo diário
- Indicadores de produtividade

---

## ⚙️ Configurações

Personalização da aplicação.

### Recursos

- Perfil do usuário
- Alteração de senha
- Preferências gerais
- Idioma
- Tema claro/escuro
- Cor principal do sistema
- Configurações de notificações

---

# 🎨 Design

O projeto segue uma identidade visual moderna baseada em:

- Tons de azul e roxo
- Layout minimalista
- Componentes arredondados
- Interface limpa
- Experiência Mobile First

---

# 📱 Mobile First

Toda a aplicação será desenvolvida inicialmente para dispositivos móveis.

Após a conclusão da versão mobile, serão criadas adaptações para:

- Tablets
- Notebooks
- Desktop

## Breakpoints

```css
/* Mobile */
320px+

/* Tablet */
768px+

/* Notebook */
1024px+

/* Desktop */
1440px+
```

---

# 🛠️ Tecnologias

## Frontend

- Next.js 15
- React
- TypeScript
- Tailwind CSS
- Shadcn/UI

## Backend

- Next.js API Routes

## Banco de Dados

- SQLite
- Prisma ORM

## Autenticação

- NextAuth

## Gerenciamento de Estado

- Zustand

## Formulários

- React Hook Form
- Zod

## Drag and Drop

- dnd-kit

## PWA

- next-pwa

## APK Android

- Capacitor

---

# 📂 Estrutura do Projeto

```txt
src/
│
├── app/
│   ├── login/
│   ├── dashboard/
│   ├── tasks/
│   ├── agenda/
│   └── settings/
│
├── components/
│   ├── shared/
│   ├── forms/
│   ├── cards/
│   ├── navigation/
│   └── ui/
│
├── hooks/
│
├── services/
│
├── lib/
│
├── styles/
│
├── prisma/
│
└── types/
```

---

# 🗄️ Banco de Dados

## users

```txt
id
name
email
password
avatar
created_at
```

## boards

```txt
id
user_id
title
description
color
favorite
created_at
```

## tasks

```txt
id
board_id
title
description
status
priority
due_date
created_at
```

## settings

```txt
id
user_id
theme
language
accent_color
```

## notifications

```txt
id
user_id
title
read
created_at
```

---

# 🚀 Roadmap

## Fase 1 — Interface Mobile

- [x] Login
- [ ] Meus Quadros
- [ ] Minhas Tarefas
- [ ] Agenda
- [ ] Configurações

---

## Fase 2 — Componentização

- [ ] Button
- [ ] Input
- [ ] Card
- [ ] Modal
- [ ] Dropdown
- [ ] Badge
- [ ] SearchBar

---

## Fase 3 — Funcionalidades

- [ ] Autenticação
- [ ] CRUD de Quadros
- [ ] CRUD de Tarefas
- [ ] Filtros
- [ ] Pesquisa

---

## Fase 4 — Banco de Dados

- [ ] Prisma
- [ ] SQLite
- [ ] Migrations

---

## Fase 5 — Backend

- [ ] API de usuários
- [ ] API de quadros
- [ ] API de tarefas
- [ ] API de configurações

---

## Fase 6 — Responsividade

- [ ] Tablet
- [ ] Notebook
- [ ] Desktop

---

## Fase 7 — PWA

- [ ] Instalação mobile
- [ ] Instalação desktop
- [ ] Offline Mode
- [ ] Push Notifications

---

## Fase 8 — APK Android

- [ ] Capacitor
- [ ] Build Android
- [ ] Publicação

---

# 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/todo-list.git
```

Entre na pasta do projeto:

```bash
cd todo-list
```

Instale as dependências:

```bash
npm install
```

Execute o projeto:

```bash
npm run dev
```

Acesse:

```txt
http://localhost:3000
```

---

# 🎯 Objetivos do Projeto

- Construir uma aplicação moderna de produtividade
- Consolidar conhecimentos em React e Next.js
- Aplicar conceitos de arquitetura Front-End
- Implementar autenticação e banco de dados
- Criar um PWA instalável
- Gerar APK Android utilizando Capacitor
- Servir como projeto de portfólio profissional

---

# 📄 Licença

Este projeto está licenciado sob a licença MIT.

---

# 👨‍💻 Autor

**Diogo Santana de Carvalho**

Projeto desenvolvido para fins de estudo, evolução profissional e composição de portfólio na área de desenvolvimento web.
