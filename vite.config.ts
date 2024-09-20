
import { NodeGlobalsPolyfillPlugin } from '@esbuild-plugins/node-globals-polyfill'
import { NodeModulesPolyfillPlugin } from '@esbuild-plugins/node-modules-polyfill'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import { nodePolyfills } from 'vite-plugin-node-polyfills'


import requireTransform from 'vite-plugin-require-transform'
import VitePluginCompression from 'vite-plugin-compression'

import path from 'path'

export default defineConfig({
  define: {
    'process.version': JSON.stringify(process.version),
    global: 'window'
  },
  plugins: [
    react(),
    nodePolyfills(),
    requireTransform({
      fileRegex: /.tsx$/
    }),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '/src')
    }
  },
  optimizeDeps: {
    exclude: [ 'jsbi' ],
    esbuildOptions: {
      // Node.js global to browser globalThis
      define: {
        global: 'globalThis'
      },
      // Enable esbuild polyfill plugins
      plugins: [
        NodeModulesPolyfillPlugin(),
        NodeGlobalsPolyfillPlugin({
          buffer: false,
          process: true
        })
      ]
    }
  },
  build: {
    commonjsOptions: {
      requireReturnsDefault: (e) => e.includes('jsbi')
    },
    target: 'ES2020',
    minify: false,
    rollupOptions: {
      treeshake: true,
      plugins: [
        VitePluginCompression()
      ]
    },
    chunkSizeWarningLimit: 1500
}
})
