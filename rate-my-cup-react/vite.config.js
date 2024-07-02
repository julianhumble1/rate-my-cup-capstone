import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
        environment: "jsdom",
        setupFiles: ["./tests/config/setup.js"],
        testMatch: ["./tests/**/*.test.jsx$?"],
        globals: true,
  },
  base: '/',
  // server: {
  //   port: 3000,
  //   open: true,
  //   historyApiFallback: true, // This handles client-side routing
  // },
})
