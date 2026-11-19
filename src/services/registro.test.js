import { describe, expect, it } from 'vitest'
import { registrarUsuario } from './registro.js'

describe('registrarUsuario (v1.0.0)', () => {
  it('registra con correo y contraseña válidos', () => {
    const resultado = registrarUsuario({ correo: 'Ana@Gmail.com', contrasena: 'clave1234' })
    expect(resultado).toEqual({ ok: true, usuario: { correo: 'ana@gmail.com' } })
  })

  it('rechaza un correo con formato inválido', () => {
    const resultado = registrarUsuario({ correo: 'ana.gmail.com', contrasena: 'clave1234' })
    expect(resultado.ok).toBe(false)
  })

  it('rechaza una contraseña de menos de 8 caracteres', () => {
    const resultado = registrarUsuario({ correo: 'ana@gmail.com', contrasena: 'corta' })
    expect(resultado.ok).toBe(false)
    expect(resultado.error).toMatch(/8 caracteres/)
  })

  it('rechaza el registro cuando no se envían datos', () => {
    expect(registrarUsuario().ok).toBe(false)
  })
})
