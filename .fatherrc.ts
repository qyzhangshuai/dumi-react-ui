export default {
  esm: 'rollup',
  cjs: 'rollup',
  entry: ['src/index.ts', 'src/**/index.tsx'],
  // doc: {
  //   title: 'dumi-react-ui',
  //   themeConfig: { mode: 'light' },
  //   // base: '/xu_ui'
  // },
  // extraBabelPlugins: [
  //     ['babel-plugin-import', {
  //         libraryName: 'antd',
  //         libraryDirectory: 'es',
  //         style: true,
  //     }]
  // ],
  // cssModules: true,
  extractCSS: true,
  lessInRollupMode: {},
  // lessInBabelMode: true,
  // runtimeHelpers: true,
  // autoprefixer: {
  //     browsers: ['ie>9', 'Safari >= 6'],
  // }
};
