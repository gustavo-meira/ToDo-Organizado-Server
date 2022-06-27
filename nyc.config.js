module.exports = {
  all: true,
  extends: '@istanbuljs/nyc-config-typescript',
  exclude: [
    'src/**/*.test.ts',
    'src/repositories',
    'src/server.ts',
  ],
  include: ['src/**/*.ts'],
};
