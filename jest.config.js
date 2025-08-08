export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.app.json' }],
  },
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  testMatch: [
    '**/__tests__/**/*.(ts|tsx|js|jsx)',
    '**/?(*.)+(spec|test).(ts|tsx|js|jsx)',
  ],
};