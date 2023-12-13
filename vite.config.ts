import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
  plugins: [react()],
  base: "https://mapi.harmoney.dev/api/v1/messages/"
})
