import { defineConfig, globalIgnores } from 'eslint/config';

import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';

import importPlugin from 'eslint-plugin-import';

export default defineConfig([
  ...nextVitals,
  ...nextTypescript,

  {
    files: ['**/*.{ts,tsx,js,jsx}'],
    // ✅ registre só o plugin que você realmente adicionou por fora
    plugins: {
      import: importPlugin,
    },
    rules: {
      'no-debugger': 'error',
      'no-console': ['warn', { allow: ['warn', 'error'] }],
      eqeqeq: ['warn', 'always'],
      curly: ['warn', 'all'],
      'prefer-const': 'warn',

      complexity: ['warn', { max: 10 }],
      'max-lines-per-function': ['warn', { max: 80, skipBlankLines: true, skipComments: true }],

      // Se quiser que "any" vire erro, troque pra 'error'
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_', varsIgnorePattern: '^_' }],
      '@typescript-eslint/consistent-type-imports': ['warn', { prefer: 'type-imports', disallowTypeAnnotations: false }],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],

      // ✅ regras de react/a11y/hooks podem continuar aqui
      // (o Next já registra os plugins)
      'react/self-closing-comp': 'warn',
      'react/jsx-no-useless-fragment': 'warn',
      'react/no-array-index-key': 'warn',

      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',

      'jsx-a11y/alt-text': 'error',
      'jsx-a11y/no-autofocus': 'warn',
    },
  },

  {
    files: ['src/components/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@/services/*', '../services/*', '../../services/*', '../../../services/*'],
              message:
                'UI não deve consumir services diretamente. Prefira um hook/usecase para orquestrar regra de negócio.',
            },
          ],
        },
      ],
    },
  },

  {
    files: ['src/services/**/*.{ts,tsx}'],
    rules: {
      'no-restricted-imports': [
        'warn',
        {
          patterns: [
            {
              group: ['@/components/*'],
              message: 'Services não devem depender de componentes visuais. Mantenha as camadas desacopladas.',
            },
          ],
        },
      ],
    },
  },

  globalIgnores(['.next/**', 'out/**', 'build/**', 'next-env.d.ts']),
]);