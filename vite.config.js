import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

// En GitHub Pages el sitio vive en https://<usuario>.github.io/<repositorio>/
// El flujo CD define BASE_PATH con ese prefijo; en desarrollo local queda "/".
function normalizarBase(valor) {
  if (!valor) return '/'
  const conInicio = valor.startsWith('/') ? valor : `/${valor}`
  return conInicio.endsWith('/') ? conInicio : `${conInicio}/`
}

export default defineConfig({
  base: normalizarBase(process.env.BASE_PATH),
  plugins: [react()],
  test: {
    environment: 'node',
    // Sin pruebas todavía (primer despliegue), Vitest no falla; con código
    // sin pruebas, el umbral de cobertura sí falla.
    passWithNoTests: true,
    include: ['src/**/*.test.{js,jsx}'],
    coverage: {
      provider: 'v8',
      // Alcance de la cobertura: amplíalo cuando haya más módulos con pruebas.
      include: ['src/services/**/*.js'],
      exclude: ['**/*.test.{js,jsx}'],
      reporter: ['text', 'text-summary', 'lcov'],
      // Umbral mínimo: si la cobertura baja de 80 %, el flujo CI falla.
      thresholds: { lines: 80, functions: 80, branches: 80, statements: 80 },
    },
  },
})
