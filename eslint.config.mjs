import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,

  // ─────────────────────────────────────────────
  // Regras gerais — todos os arquivos TS/JS
  // ─────────────────────────────────────────────
  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    rules: {
      // Qualidade geral
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      'eqeqeq': ['warn', 'always'],
      'curly': ['warn', 'all'],
      'prefer-const': 'warn',

      // Complexidade e tamanho
      'complexity': ['warn', { max: 10 }],
      'max-lines-per-function': [
        'warn',
        { max: 80, skipBlankLines: true, skipComments: true },
      ],

      // TypeScript
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'warn',
        {
          prefer: 'type-imports',
          disallowTypeAnnotations: false,
        },
      ],

      // Organização de imports
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

      // React Hooks — explícitos para garantir mesmo com preset
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      // Acessibilidade
      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/no-autofocus': 'warn',
    },
  },

  // ─────────────────────────────────────────────
  // Arquitetura — componentes não consomem services
  // ─────────────────────────────────────────────
  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: [
                '@/services/*',
                '../services/*',
                '../../services/*',
                '../../../services/*',
              ],
              message:
                'Evite consumir services diretamente em componentes visuais. Prefira um hook para orquestrar a regra de negócio.',
            },
          ],
        },
      ],
    },
  },

  // ─────────────────────────────────────────────
  // Arquitetura — services não dependem de componentes
  // ─────────────────────────────────────────────
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

  // ─────────────────────────────────────────────
  // Ignorados globalmente
  // ─────────────────────────────────────────────
  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);
