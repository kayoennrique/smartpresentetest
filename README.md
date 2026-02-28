# SmartPresente — Padrões de Código (Lint)

Este guia descreve **como o projeto SmartPresente é mantido consistente**: menos bugs óbvios, imports organizados, acessibilidade básica e separação de camadas.

> O lint é só um guard-rail. O que manda é clareza: nomes bons, funções coesas, pouca surpresa e PRs bem revisados.

---

## Como rodar

```bash
npm run lint
npm run lint:fix
```

---

## Regras do projeto (traduzidas)

### 1) Qualidade e previsibilidade

- **Proibido** commitar `debugger`.
- `console` é permitido **só** como `console.warn` e `console.error`.
- Prefira comparações estritas: use `===` (evita coerção silenciosa).
- Use chaves em blocos (`if`, `for`, etc.) para evitar armadilhas.
- Prefira `const` quando não houver reatribuição.

### 2) Tamanho e complexidade (guia)

- Funções com **muitos caminhos** viram difíceis de entender: limite de complexidade **10** (aviso).
- Funções muito longas tendem a perder intenção: **80 linhas** por função (aviso; comentários e linhas em branco não contam).

> Isso é um guia: não vale “quebrar código bom” só para bater número.

### 3) TypeScript (segurança sem travar)

- `any` é desencorajado (aviso). Use apenas quando necessário e documente a exceção.
- Variáveis não usadas geram aviso (exceção: se começar com `_`, é permitido).
- Imports de tipos devem usar `import type` para deixar a intenção explícita.

### 4) Imports (organização)

- Imports devem ficar em grupos e com linha em branco entre eles:
  1. Built-ins (Node)
  2. Externos
  3. Internos (`@/`)
  4. Relativos pai (`../`)
  5. Irmãos/índice (`./`)
- Dentro do grupo: ordem alfabética.

### 5) React (boas práticas)

- Prefira componentes auto-fecháveis quando possível (`<Comp />`).
- Evite fragmentos vazios sem necessidade (`<>...</>`).
- Evite usar índice do array como `key` em listas (pode gerar bugs em reordenação).

### 6) Hooks (correção)

- Hooks **só** onde é permitido (erro).
- Dependências de hooks (`useEffect`, etc.) devem estar corretas (aviso).

### 7) Acessibilidade (mínimo obrigatório)

- Imagens devem ter `alt` (erro).
- Evite `autofocus` (aviso).

---

## Arquitetura: separação de camadas

### Componentes não devem consumir `services` direto

Arquivos em `src/components/**` **não devem importar** `@/services/*`.

✅ Preferido: criar um hook/usecase e consumir no componente.

```ts
// ❌ dentro de componente
import { createGift } from '@/services/gifts';

// ✅ dentro de componente
const { createGift } = useGifts();
```

### Services não devem depender de componentes

Arquivos em `src/services/**` **não devem importar** `@/components/*`.

Motivo: manter services puros, testáveis e sem dependência visual.

---

## Exceções

Quando for inevitável, faça exceção pontual e explique:

```ts
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const payload: any = legacyLib.getData();
```

---

## O que isso NÃO garante

Mesmo com lint, ainda depende de PR:

- nomes bons
- coesão / responsabilidade única
- reduzir duplicação
- testes
- modelagem do domínio
