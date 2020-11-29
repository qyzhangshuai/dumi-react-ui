export default {
  esm: 'rollup',
  cjs: 'rollup',
  entry: 'src/index.ts',
  doc: {
    title: 'dumi-react-ui',
    themeConfig: { mode: 'light' },
    // base: '/xu_ui'
  },
  // extraBabelPlugins: [
  //     ['babel-plugin-import', {
  //         libraryName: 'antd',
  //         libraryDirectory: 'es',
  //         style: true,
  //     }]
  // ],
  // cssModules: true,
  extractCSS: true,
  lessInBabelMode: true,
  // runtimeHelpers: true,
  // esm: 'babel', 
  // cjs: 'babel',
  // autoprefixer: {
  //     browsers: ['ie>9', 'Safari >= 6'],
  // }
};
