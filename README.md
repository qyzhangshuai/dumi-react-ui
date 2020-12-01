# dumi-react-ui

搭建过程：

我们采用[dumi](https://d.umijs.org/)进行开发库和编写文档

```js
npx @umijs/create-dumi-lib --site # 初始化一个站点模式的组件库开发脚手架
// 我们不采用内置的father进行组件的打包，而是下面的gulp进行组件的打包
// 所以我们可以将father-build库从package.json中移除
```

使用 typescript 边写组件,package.json 里面采用 tsc 的方式进行生成声明文件

```js
yarn add typescript @types/react @types/react-dom  --dev
```

## tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": "./",
    "paths": {
      "dumi-react-ui/esm/*": ["src/*"],
      "dumi-react-ui/lib/*": ["src/*"],
      "dumi-react-ui": ["src/index.ts"],
      "@/*": ["src/*"],
      "@@/*": ["src/.umi/*"]
    },
    "target": "esnext",
    "module": "commonjs",
    "jsx": "react",
    "strict": true,
    "declaration": true,
    "declarationDir": "lib",
    "moduleResolution": "node",
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "resolveJsonModule": true,
    "importHelpers": true
  },
  "include": ["src", "typings.d.ts"],
  "exclude": ["node_modules", "lib", "esm"]
}
```

## tsconfig.build.json

```json
{
  "extends": "./tsconfig.json",
  "compilerOptions": {
    "emitDeclarationOnly": true
  },
  "exclude": ["**/__tests__/**", "**/demo/**"]
}
```

## 我们使用 gulp 进行打包

参考[可能是最详细的 React 组件库搭建总结](https://juejin.cn/post/6844904160568016910)进行编写 gulp

```js
yarn add rimraf cpr gulp gulp-babel gulp-less gulp-autoprefixer gulp-cssnano through2 --dev
yarn add @babel/core @babel/preset-env @babel/preset-react @babel/preset-typescript @babel/plugin-proposal-class-properties @babel/plugin-transform-runtime --dev
yarn add @babel/runtime --dev
```

## package.json

```js
"start": "dumi dev", // 文档本地开发
"docs:build": "dumi build", // 文档打包
"docs:deploy": "gh-pages -d docs-dist",
"clean": "rimraf lib esm dist",
"build:types": "tsc -p tsconfig.build.json && cpr lib esm", // 根据ts生成对应的文件 复制lib文件 命名为esm
"build:gulp": "npm run clean && npm run build:types && gulp", // 生成打包文件
```

## .babelrc.js

```js
module.exports = {
  presets: ['@babel/env', '@babel/typescript', '@babel/react'],
  plugins: [
    '@babel/plugin-transform-runtime',
    '@babel/proposal-class-properties',
  ],
  env: {
    esm: {
      presets: [
        [
          '@babel/env',
          {
            modules: false,
          },
        ],
      ],
      plugins: [
        [
          '@babel/plugin-transform-runtime',
          {
            useESModules: true,
          },
        ],
      ],
    },
  },
};
```

## .browserslistrc

```json
>0.2%
not dead
not op_mini all

```

## gulpfile.js

```js
const gulp = require('gulp');
const babel = require('gulp-babel');
const less = require('gulp-less');
const autoprefixer = require('gulp-autoprefixer');
const cssnano = require('gulp-cssnano');
const through2 = require('through2');

const paths = {
  dest: {
    lib: 'lib',
    esm: 'esm',
    dist: 'dist',
  },
  styles: 'src/**/*.less',
  scripts: [
    'src/**/*.{ts,tsx}',
    '!src/**/demo/*.{ts,tsx}',
    '!src/**/__tests__/*.{ts,tsx}',
  ],
};

/**
 * 当前组件样式 import './index.less' => import './index.css'
 * 依赖的其他组件样式 import '../test-comp/style' => import '../test-comp/style/css.js'
 * 依赖的其他组件样式 import '../test-comp/style/index.js' => import '../test-comp/style/css.js'
 * @param {string} content
 */
function cssInjection(content) {
  return content
    .replace(/\/style\/?'/g, "/style/css'")
    .replace(/\/style\/?"/g, '/style/css"')
    .replace(/\.less/g, '.css');
}

/**
 * 编译脚本文件
 * @param {string} babelEnv babel环境变量
 * @param {string} destDir 目标目录
 */
function compileScripts(babelEnv, destDir) {
  const { scripts } = paths;
  process.env.BABEL_ENV = babelEnv;
  return gulp
    .src(scripts)
    .pipe(babel()) // 使用gulp-babel处理
    .pipe(
      through2.obj(function z(file, encoding, next) {
        this.push(file.clone());
        // 找到目标
        if (file.path.match(/(\/|\\)style(\/|\\)index\.js/)) {
          const content = file.contents.toString(encoding);
          file.contents = Buffer.from(cssInjection(content)); // 处理文件内容
          file.path = file.path.replace(/index\.js/, 'css.js'); // 文件重命名
          this.push(file); // 新增该文件
          next();
        } else {
          next();
        }
      }),
    )
    .pipe(gulp.dest(destDir));
}

/**
 * 编译cjs
 */
function compileCJS() {
  const { dest } = paths;
  return compileScripts('cjs', dest.lib);
}

/**
 * 编译esm
 */
function compileESM() {
  const { dest } = paths;
  return compileScripts('esm', dest.esm);
}

const buildScripts = gulp.series(compileCJS, compileESM);

/**
 * 拷贝less文件
 */
function copyLess() {
  return gulp
    .src(paths.styles)
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

/**
 * 生成css文件
 */
function less2css() {
  return gulp
    .src(paths.styles)
    .pipe(less()) // 处理less文件
    .pipe(autoprefixer()) // 根据browserslistrc增加前缀
    .pipe(cssnano({ zindex: false, reduceIdents: false })) // 压缩
    .pipe(gulp.dest(paths.dest.lib))
    .pipe(gulp.dest(paths.dest.esm));
}

const build = gulp.parallel(buildScripts, copyLess, less2css);

exports.build = build;

exports.default = build;
```

## .umirc.js

```js
import { defineConfig } from 'dumi';
import { join } from 'path';

export default defineConfig({
  title: 'dumi-react-ui',
  favicon:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
  logo:
    'https://user-images.githubusercontent.com/9554297/83762004-a0761b00-a6a9-11ea-83b4-9c8ff721d4b8.png',
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
  },
  // more config: https://d.umijs.org/config
});
```

我们组件库内部会采用 antd，对使用的 antd 进行按需加载样式

```js
yarn add antd babel-plugin-import --dev
```

组件内部的按需加载
