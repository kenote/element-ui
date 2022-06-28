import path from 'path'
import { defineConfig } from 'vite'
import { createVuePlugin } from 'vite-plugin-vue2'
import tsconfigPaths from 'vite-tsconfig-paths'
import Layouts from 'vite-plugin-vue-layouts'
import Pages from 'vite-plugin-pages'
import Markdown, { code, link, meta } from 'vite-plugin-md'
import ScriptSetup from 'unplugin-vue2-script-setup/vite'
import Inspect from 'vite-plugin-inspect'
import OptimizationPersist from 'vite-plugin-optimize-persist'
import PkgConfig from 'vite-plugin-package-config'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementUiResolver } from 'unplugin-vue-components/resolvers'
import WindiCSS from 'vite-plugin-windicss'

export default defineConfig({
  mode: process.env.NODE_ENV,

  root: __dirname,

  publicDir: 'static',

  plugins: [
    createVuePlugin({ 
      jsx: true,
      vueTemplateOptions: {
        compilerOptions: {
          whitespace: 'preserve'
        },
      },
      include: [/\.vue$/, /\.md$/]
    }),
    tsconfigPaths(),
    PkgConfig(),
    OptimizationPersist(),
    Inspect(),
    ScriptSetup(),
    AutoImport({
      imports: ['vue-router'],
      dts: false,
    }),
    Components({
      resolvers: [ 
        ElementUiResolver()
      ],
      extensions: ['vue', 'md'],
      include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
    }),
    Layouts({
      layoutsDirs: 'src/layouts',
      defaultLayout: 'basic'
    }),
    Pages({
      pagesDir: [{ dir: 'pages', baseRoute: '', }],
      extensions: ['vue', 'md'],
      syncIndex: false,
      nuxtStyle: true,
    }),
    Markdown({
      headEnabled: true,
      builders: [
        meta({
          routeProps: ['layout', 'requiresAuth'],
          defaults: {
            requireAuth: () => false,
          },
        }),
        link(),
        code({
          theme: 'base',
          invertColorMode: true,
          layoutStructure: 'flex-lines',
        }),
      ],
      // markdownItSetup (md) {
      //   md.use(require('markdown-it-prism'))
      // }
    }),
    WindiCSS(),
  ],

  base: './',

  build: {
    outDir: 'dist',
    emptyOutDir: true,
    // sourcemap: true
  },
})