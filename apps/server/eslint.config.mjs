module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  env: {
    node: true,
    jest: true,
    es2021: true,
  },
  plugins: ['@typescript-eslint', 'prettier', 'import', 'unused-imports'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
    'plugin:prettier/recommended',
  ],
  rules: {
    /* NestJS & TypeScript */
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-member-accessibility': 'off',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],

    /* Import ordering & cleanup */
    'import/order': [
      'error',
      {
        groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
    'unused-imports/no-unused-imports': 'error',
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
      },
    ],

    /* Prettier */
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
  },
  overrides: [
    {
      files: ['*.spec.ts', '*.test.ts'],
      env: {
        jest: true,
      },
      plugins: ['jest'],
      extends: ['plugin:jest/recommended'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
      },
    },
    {
      files: ['*.d.ts'],
      rules: {
        '@typescript-eslint/ban-types': 'off',
      },
    },
  ],
  ignorePatterns: ['dist', 'node_modules', 'coverage', '*.js'],
};
