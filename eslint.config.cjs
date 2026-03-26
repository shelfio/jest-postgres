const baseConfig = require('@shelf/eslint-config/typescript-no-prettier.js').default;

module.exports = [
  {
    ignores: ['coverage/**', 'lib/**', 'renovate.json', 'tsconfig.json', '.pnpm-store/'],
  },
  ...baseConfig,
  {
    files: ['eslint.config.cjs', 'jest-postgres-config.cjs', 'jest-preset.cjs', 'src/config.ts'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
    },
  },
];
