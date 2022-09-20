
import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'

const libname = 'kl-element-ui'

export default defineConfig({
  resolve: {
    // alias: [
    //   {
    //     find: '@',
    //     replacement: __dirname
    //   },
    //   {
    //     find: '~',
    //     replacement: path.resolve(__dirname, 'packages')
    //   },
    // ]
  },
  plugins: [
    createVuePlugin({ jsx: true }),
    WindiCSS(),
    tsconfigPaths()
  ],
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'packages/index.ts'),
      name: libname,
      formats: ['es', 'umd', 'cjs'],
      fileName: (format) => `${libname}.${format}.js`,
    },
    rollupOptions: {
      external: [
        'vue', 
        'vue-router',
        'element-ui', 
        'vue-fragment', 
        'lodash', 
        'rule-judgment', 
        '@kenote/common',
        'js-yaml',
        'nunjucks'
      ],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
          lodash: 'lodash',
          nunjucks: 'nunjucks',
          ['element-ui']: 'element-ui',
          ['vue-fragment']: 'vue-fragment',
          ['js-yaml']: 'js-yaml',
          ['rule-judgment']: 'rule-judgment',
          ['@kenote/common']: '@kenote/common'
        },
      }
    },
    emptyOutDir: false,
  }
})