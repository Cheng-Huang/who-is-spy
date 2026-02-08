import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  // Deploy under a sub-path on the server to avoid conflicts with other sites (e.g. /lucky-draw/).
  // Access URL: http://124.221.23.178/who-is-spy/
  base: command === 'build' ? '/who-is-spy/' : '/',
  plugins: [
    react(),
    tailwindcss(),
  ],
}))
