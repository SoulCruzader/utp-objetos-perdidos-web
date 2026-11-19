// Módulo: registro de usuarios (usa la validación de correo).
// En el proyecto, después de esta validación se invoca a Supabase Auth.
import { validarCorreo } from './validacionCorreo.js'

const LONGITUD_MINIMA_CONTRASENA = 8

export function registrarUsuario({ correo, contrasena } = {}) {
  if (!validarCorreo(correo)) {
    return { ok: false, error: 'El correo ingresado no es válido.' }
  }
  if (typeof contrasena !== 'string' || contrasena.length < LONGITUD_MINIMA_CONTRASENA) {
    return {
      ok: false,
      error: `La contraseña debe tener al menos ${LONGITUD_MINIMA_CONTRASENA} caracteres.`,
    }
  }
  return { ok: true, usuario: { correo: correo.trim().toLowerCase() } }
}
