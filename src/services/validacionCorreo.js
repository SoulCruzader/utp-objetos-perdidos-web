// Módulo: validación de correo electrónico (registro de usuarios)
// Versión 1.0.0: acepta cualquier correo con formato válido.

const FORMATO_CORREO = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Indica si el texto recibido es un correo electrónico con formato válido.
 * @param {unknown} correo Texto ingresado por la persona usuaria.
 * @returns {boolean} true si el formato es válido; false en caso contrario.
 */
export function validarCorreo(correo) {
  if (typeof correo !== 'string') return false
  const texto = correo.trim()
  if (texto === '') return false
  return FORMATO_CORREO.test(texto)
}
