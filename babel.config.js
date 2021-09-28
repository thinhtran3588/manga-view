module.exports = {
  presets: ['next/babel'],
  plugins: [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        root: ['./src/'],
        alias: {
          '@test': './__tests__',
          '@core': './src/core',
          '@locales': './src/locales',
          '@store': './src/store',
          '@main': './src/modules/main',
        },
      },
    ],
  ],
};
