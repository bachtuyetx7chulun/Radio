import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import AsyncCatch from 'vite-plugin-async-catch'
import eslintPlugin from '@nabla/vite-plugin-eslint'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    eslintPlugin(),
    tsconfigPaths(),
    AsyncCatch({
      catchCode: `console.error(e)`,
    }),
  ],
})
