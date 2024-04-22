import mockServer from 'vite-plugin-mock-dev-server';

const mock = () => {
  return mockServer({
    prefix: ['^/api'],
    include: ['mock/**.ts'],
  });
};

export default mock;
