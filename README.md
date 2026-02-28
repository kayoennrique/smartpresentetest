# 🛡️ ESLint — SmartPresente

Configuração focada em **qualidade, previsibilidade arquitetural e segurança contra bugs comuns**, sem burocracia.

> ESLint ajuda, mas não substitui revisão de PR (nomes, design, coesão e testes).

---

## 📦 Instalação

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

## ▶️ Scripts

```json
{
  "scripts": {
    "lint": "eslint .",
    "lint:fix": "eslint . --fix"
  }
}
```

---

# 📏 Regras Principais

Aplicadas a `.ts`, `.tsx`, `.js`, `.jsx`.

### 🔴 Erros (bloqueiam merge)

- `no-debugger`
- `react-hooks/rules-of-hooks`
- `jsx-a11y/alt-text`

### 🟡 Avisos (adoção gradual)

- `no-console` (apenas `warn` e `error` permitidos)
- `eqeqeq`
- `curly`
- `prefer-const`
- `complexity` (máx. 10)
- `max-lines-per-function` (máx. 80)
- `@typescript-eslint/no-explicit-any`
- `@typescript-eslint/no-unused-vars` (ignora `_`)
- `@typescript-eslint/consistent-type-imports`
- `import/order`
- `react/no-array-index-key`
- `react-hooks/exhaustive-deps`

> Regras de complexidade e tamanho são **guia**, não objetivo numérico cego.

---

# 🏗️ Arquitetura do Projeto

Estrutura real considerada:

```
src/
 ├─ app/
 ├─ components/
 │   ├─ ui/          ← componentes puramente visuais
 │   └─ ...          ← componentes com lógica (containers)
 ├─ hooks/
 ├─ services/
 ├─ utils/
 └─ types/
```

## 🔹 UI pura (`src/components/ui/**`)

Não pode importar `services` diretamente.

```ts
// ❌
import { createGift } from '@/services/giftService';

// ✅
const { createGift } = useGift();
```

Motivo: manter apresentação desacoplada de IO.

## 🔹 Services (`src/services/**`)

Não podem importar componentes.

```ts
// ❌
import { Button } from '@/components/ui/Button';
```

Motivo: manter camada de serviço pura e testável.

---

# 📦 Organização de Imports

Ordem obrigatória:

1. Built-ins (Node)
2. Externos
3. Aliases internos (`@/`)
4. Relativos (`../`)
5. Irmãos (`./`)

Sempre com linha em branco entre grupos.

---

# ⚠️ Exceções

Use apenas quando necessário e com justificativa:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const payload: any = legacyLib.getData();
```

---

# ❗ O que o ESLint NÃO resolve

- Bons nomes
- Responsabilidade única
- Abstrações mal feitas
- Testes
- Modelagem de domínio

Esses pontos são responsabilidade da revisão de código.

---

Configuração pensada para manter o projeto consistente sem travar a evolução.
