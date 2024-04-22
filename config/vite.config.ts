import { defineConfig, loadEnv, type UserConfig } from 'vite';
import { visualizer } from 'rollup-plugin-visualizer';
import react from '@vitejs/plugin-react';
import preDep from './prebuildDeps';
import mock from './plugins/mock';
import legacy from './plugins/legacy';
import gzip from './plugins/gzip';
import svgr from './plugins/svgr';
import importer from './plugins/importer';
import proxyConfig from './proxy';
import antdLessVars from './antdLessVars';
import path from 'path';

const is = (v: string) => {
  return v === 'true';
};

const SRC_PATH = path.resolve(__dirname, '../src');

// https://vitejs.dev/config/
export default defineConfig(({ mode }): UserConfig => {
  const { DEV_MOCK, DEV_ADDR, DEV_REPORT, DEV_OUT_DIR, DEV_GZIP } = loadEnv(
    mode,
    process.cwd(),
    'DEV_',
  );

  return {
    plugins: [
      react(),
      legacy(),
      svgr(),
      importer(),
      is(DEV_GZIP) && gzip(),
      is(DEV_MOCK) && mock(),
      is(DEV_REPORT) && visualizer(),
    ].filter((i) => i),

    server: {
      host: true,
      port: 5000,
      proxy: proxyConfig(DEV_ADDR),
    },

    resolve: {
      alias: {
        '@': SRC_PATH,
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          additionalData: `
            @import "${SRC_PATH}/assets/styles/_mixin.less";
            @import "${SRC_PATH}/assets/styles/_var.less";
          `,
          modifyVars: antdLessVars,
        },
      },
    },
    define: {
      _STAMP_: `${new Date().getTime()}`,
    },
    optimizeDeps: {
      include: preDep,
    },
    build: {
      outDir: DEV_OUT_DIR || './dist',
      chunkSizeWarningLimit: 1000,
      emptyOutDir: true,
      rollupOptions: {
        output: {
          // reactLib: ['react', 'react-dom', 'react-intl'],
          manualChunks(id) {
            if (/\/node_modules\/(react|react-dom|react-intl)/.test(id)) {
              return 'reactLib';
            }
          },
        },
      },
    },
  };
});
