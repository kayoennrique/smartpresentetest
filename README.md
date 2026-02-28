# 🛡️ ESLint Config — SmartPresente

O objetivo é garantir **qualidade de código, previsibilidade arquitetural e escalabilidade** de forma automatizada, com regras graduais que não bloqueiam o fluxo do time.

---

## 📦 Dependências necessárias

```bash
npm install -D \
  eslint \
  eslint-config-next \
  eslint-plugin-import \
  eslint-plugin-react \
  eslint-plugin-react-hooks \
  eslint-plugin-jsx-a11y \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

---

## ▶️ Comandos

```bash
npm run lint        # Analisa o projeto
npm run lint:fix    # Corrige automaticamente o que for possível
```

> Sugestão de scripts no `package.json`:
>
> ```json
> "lint": "eslint .",
> "lint:fix": "eslint . --fix"
> ```

---

## 🗂️ Estrutura da configuração

A config é dividida em **3 blocos** com escopos distintos.

### 1️⃣ Regras gerais

Aplicadas a **todos os arquivos** `.ts`, `.tsx`, `.js`, `.jsx`.

| Categoria    | Regra                     | Nível    | Por quê                                       |
| ------------ | ------------------------- | -------- | --------------------------------------------- |
| Qualidade    | `no-debugger`             | 🔴 error | Jamais commitar `debugger`                    |
| Qualidade    | `no-console`              | 🟡 warn  | Permite apenas `warn` e `error`               |
| Qualidade    | `eqeqeq`                  | 🟡 warn  | Exige `===` para evitar coerção silenciosa    |
| Qualidade    | `curly`                   | 🟡 warn  | Chaves obrigatórias em todos os blocos        |
| Qualidade    | `prefer-const`            | 🟡 warn  | Favorece imutabilidade onde possível          |
| Complexidade | `complexity`              | 🟡 warn  | Máximo 10 caminhos por função                 |
| Complexidade | `max-lines-per-function`  | 🟡 warn  | Máximo 50 linhas por função                   |
| TypeScript   | `no-explicit-any`         | 🟡 warn  | Proíbe uso de `any` sem justificativa         |
| TypeScript   | `no-unused-vars`          | 🟡 warn  | Variáveis não usadas (exceto prefixo `_`)     |
| TypeScript   | `consistent-type-imports` | 🟡 warn  | Exige `import type` para tipos                |
| Imports      | `import/order`            | 🟡 warn  | Organiza imports por grupo e ordem alfabética |
| React        | `self-closing-comp`       | 🟡 warn  | `<Comp />` em vez de `<Comp></Comp>`          |
| React        | `jsx-no-useless-fragment` | 🟡 warn  | Remove `<></>` desnecessários                 |
| React        | `no-array-index-key`      | 🟡 warn  | Evita bugs silenciosos em listas              |
| Hooks        | `rules-of-hooks`          | 🔴 error | Hooks só em componentes/hooks                 |
| Hooks        | `exhaustive-deps`         | 🟡 warn  | Dependências corretas no `useEffect`          |
| A11y         | `alt-text`                | 🔴 error | Toda imagem precisa de `alt`                  |
| A11y         | `no-autofocus`            | 🟡 warn  | `autofocus` prejudica navegação               |

---

### 2️⃣ Arquitetura — `src/components/**`

Componentes visuais **não podem importar** `services` diretamente.

```
❌ import { fetchUser } from '@/services/userService'  ← dentro de um componente
✅ const { user } = useUser()                          ← via hook
```

> **Motivo:** manter apresentação desacoplada de lógica de negócio e chamadas remotas.

---

### 3️⃣ Arquitetura — `src/services/**`

Services **não podem importar** componentes visuais.

```
❌ import { Button } from '@/components/Button'  ← dentro de um service
✅ retornar dados e deixar o componente renderizar
```

> **Motivo:** evitar dependência circular e manter a camada de serviço pura e testável.

---

## 🔢 Organização de imports

A regra `import/order` força a seguinte ordem, com linha em branco entre grupos:

```ts
// 1. Node built-ins
import fs from 'fs';

// 2. Dependências externas
import { useQuery } from '@tanstack/react-query';

// 3. Aliases internos (@/)
import { api } from '@/services/api';

// 4. Relativos pai
import { formatDate } from '../utils/date';

// 5. Relativos irmão / índice
import { Button } from './Button';
```

---

## 🚦 Filosofia de níveis

| Nível      | Quando usar                                                 |
| ---------- | ----------------------------------------------------------- |
| 🔴 `error` | Quebra de regra crítica — deve ser corrigida antes do merge |
| 🟡 `warn`  | Ponto de atenção — permite adoção gradual sem bloquear CI   |

> Regras começam como `warn` para não travar o time. À medida que o código se adequa, podem ser promovidas para `error`.

---

## ⚠️ Exceções

Se uma feature exigir exceção a alguma regra, use comentário inline com justificativa:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const payload: any = externalLegacyLib.getData();
```

Exceções recorrentes devem ser **documentadas no PR** com justificativa técnica.

---

## 🗃️ Arquivos ignorados

```
.next/
out/
build/
next-env.d.ts
```
