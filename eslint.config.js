// @ts-check
import { tanstackConfig } from '@tanstack/eslint-config'

export default [
  ...tanstackConfig,

  {
    files: ['*.ts', '*.tsx', '*.js', '*.jsx'],
    languageOptions: {
      ecmaVersion: 2025,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: { jsx: true },
      },
    },
    plugins: {
      import: {},
    },
    rules: {
      ...(tanstackConfig[0]?.rules ?? {}),
      

      'import/order': [
        "off",
        // 'error',
        // {
        //   groups: [
        //     'builtin',
        //     'external',
        //     'internal',
        //     ['parent', 'sibling', 'index'],
        //   ],
        //   pathGroups: [
        //     {
        //       pattern: '@tanstack/**',
        //       group: 'external',
        //       position: 'before',
        //     },
        //   ],
        //   pathGroupsExcludedImportTypes: ['builtin'],
        //   alphabetize: { order: 'asc', caseInsensitive: true },
        //   'newlines-between': 'always',
        // },
      ],
    },
  },
]
