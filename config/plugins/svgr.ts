import svgr from 'vite-plugin-svgr';

export default () => {
  return svgr({
    include: '**/*.svg?react',
  });
};
