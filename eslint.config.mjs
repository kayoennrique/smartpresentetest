import { defineConfig, globalIgnores } from 'eslint/config';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

import importPlugin from 'eslint-plugin-import';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';

export default defineConfig([
  // Presets do Next
  ...nextVitals,
  ...nextTypescript,

  // Regras gerais — todos os arquivos TS/JS
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    plugins: {
      import: importPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    languageOptions: {
      // Mantém o React plugin confortável com JSX (especialmente fora de TS)
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: {
      // Ajuda o eslint-plugin-react a detectar a versão automaticamente
      react: { version: 'detect' },
    },
    rules: {
      // Qualidade geral
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['warn', 'always'],
      curly: ['warn', 'all'],
      'prefer-const': 'warn',

      // Complexidade e tamanho (guia, não dogma)
      complexity: ['warn', { max: 10 }],
      'max-lines-per-function': [
        'warn',
        { max: 80, skipBlankLines: true, skipComments: true },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        { prefer: 'type-imports', disallowTypeAnnotations: false },
      ],

      // Organização de imports (agora garantido pelo plugin)
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // React — boas práticas
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'warn',

      // React Hooks
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Acessibilidade
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/no-autofocus': 'warn',
    },
  },

  // Arquitetura — UI pura não consome services
  // (Se você quiser manter a regra antiga, mude esse glob para src/components/**)
  {
    files: ['src/components/ui/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@/services/*', '../services/*', '../../services/*', '../../../services/*'],
              message:
                'UI pura não deve consumir services diretamente. Prefira um hook/usecase para orquestrar regra de negócio.',
            },
          ],
        },
      ],
    },
  },

  // Arquitetura — services não dependem de componentes
  {
    files: ['src/services/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@/components/*'],
              message:
                'Services não devem depender de componentes visuais. Mantenha as camadas desacopladas.',
            },
          ],
        },
      ],
    },
  },

  // Ignorados globalmente
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);