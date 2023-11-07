import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()]
})
