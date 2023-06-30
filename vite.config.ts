
import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import WindiCSS from 'vite-plugin-windicss'
import tsconfigPaths from 'vite-tsconfig-paths'
import monacoEditorPlugin from 'vite-plugin-monaco-editor'

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
    tsconfigPaths(),
    monacoEditorPlugin({
      // languageWorkers: ['html', 'css', 'json', 'typescript', 'editorWorkerService']
    })
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
        'monaco-editor',
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
          ['monaco-editor']: 'monaco-editor',
          ['element-ui']: 'element-ui',
          ['vue-fragment']: 'vue-fragment',
          ['js-yaml']: 'js-yaml',
          ['rule-judgment']: 'rule-judgment',
          ['@kenote/common']: '@kenote/common'
        },
        // manualChunks: {
        //   jsonWorker: [`monaco-editor/esm/vs/language/json/json.worker`],
        //   cssWorker: [`monaco-editor/esm/vs/language/css/css.worker`],
        //   htmlWorker: [`monaco-editor/esm/vs/language/html/html.worker`],
        //   tsWorker: [`monaco-editor/esm/vs/language/typescript/ts.worker`],
        //   editorWorker: [`monaco-editor/esm/vs/editor/editor.worker`]
        // }
      }
    },
    emptyOutDir: true,
  }
})