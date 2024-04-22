import { type CommonServerOptions } from 'vite';

const proxyConfig = (DEV_ADDR: string): CommonServerOptions['proxy'] => {
  return {
    '/api': {
      target: DEV_ADDR,
      secure: false,
    },
  };
};

export default proxyConfig;
