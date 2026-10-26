import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  // GitHub Pages 배포용 base path.
  // 저장소: https://github.com/karynadd/anxiety-quiz
  base: '/anxiety-quiz/',
  plugins: [react()],
})
