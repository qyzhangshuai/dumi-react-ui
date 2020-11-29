/**
 * @description: 
 * @author: zs
 * @Date: 2020-11-29 18:02:20
 * @LastEditTime: 2020-11-29 21:44:37
 * @LastEditors: zs
 */
import { defineConfig } from 'dumi';
import { join } from 'path'

export default defineConfig({
  title: 'dumi-react-ui',
  favicon: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo: 'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  outputPath: 'docs-dist',
  mode: 'site',
  resolve: {
    includes: ['docs', 'src'],
  },
  navs: [
    null,
    {
      title: 'Github',
      path: 'https://github.com/qyzhangshuai/dumi-react-ui',
    },
  ],
  alias: {
    'dumi-react-ui/lib': join(__dirname, 'src'),
    'dumi-react-ui': join(__dirname, 'src'),
  }
  // more config: https://d.umijs.org/config
});