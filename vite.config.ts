import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// vite.config.js
// import reactRefresh from '@vitejs/plugin-react-refresh'

// export default {
//   plugins: [reactRefresh({
// 	excludeExports: ['mapStateToProps', 'mapDispatchToProps']
//   })]
// }

// https://vitejs.dev/config/
export default defineConfig({
  server:{
    proxy:{
      '/api' : 'http://localhost:5173'
    }
  },
  plugins: [react()]
})
