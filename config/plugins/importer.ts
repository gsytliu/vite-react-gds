import pluginImporter from 'vite-plugin-importer';

const importer = () => {
  return pluginImporter({
    libraryName: 'antd',
    libraryDirectory: 'es',
    style: true,
  });
};

export default importer;
