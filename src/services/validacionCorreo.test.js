import { describe, expect, it } from 'vitest'
import { validarCorreo } from './validacionCorreo.js'

describe('validarCorreo (v1.0.0)', () => {
  it('acepta un correo con formato válido', () => {
    expect(validarCorreo('ana@utp.edu.pe')).toBe(true)
  })

  it('acepta correos de cualquier dominio', () => {
    expect(validarCorreo('ana@gmail.com')).toBe(true)
  })

  it('ignora los espacios al inicio y al final', () => {
    expect(validarCorreo('  ana@utp.edu.pe  ')).toBe(true)
  })

  it('rechaza un texto vacío o con solo espacios', () => {
    expect(validarCorreo('')).toBe(false)
    expect(validarCorreo('   ')).toBe(false)
  })

  it('rechaza un correo sin arroba', () => {
    expect(validarCorreo('ana.utp.edu.pe')).toBe(false)
  })

  it('rechaza un correo sin dominio', () => {
    expect(validarCorreo('ana@')).toBe(false)
  })

  it('rechaza valores que no son texto', () => {
    expect(validarCorreo(undefined)).toBe(false)
    expect(validarCorreo(null)).toBe(false)
    expect(validarCorreo(42)).toBe(false)
  })
})
