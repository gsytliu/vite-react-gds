import legacy from '@vitejs/plugin-legacy';

export default () =>
  legacy({
    modernPolyfills: ['es.promise.finally', 'es.array.at'],
    renderLegacyChunks: true,
    renderModernChunks: false,
    targets: ['defaults', 'not IE 11'],
  });
