import compression from 'vite-plugin-compression';

export default () =>
  compression({
    verbose: true,
    disable: false,
    threshold: 0,
    filter: /\.(js|mjs|css)$/i,
    algorithm: 'gzip',
    ext: '.gz', // 生成的压缩包后缀
    deleteOriginFile: true,
  });
