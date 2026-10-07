export interface RutValidationResult {
  isValid: boolean;
  normalized: string;
  clean: string;
  dv: string;
  error?: string;
}

/**
 * Normaliza y valida un RUT chileno mediante el algoritmo Módulo 11.
 *
 * Acepta formatos como:
 * - "12.345.678-5"
 * - "12345678-5"
 * - "123456785"
 * - " 76.845.120-k "
 *
 * Función 100% pura y determinística sin llamadas a servicios externos.
 */
export function validateRut(rawRut: string): RutValidationResult {
  if (!rawRut || typeof rawRut !== 'string') {
    return {
      isValid: false,
      normalized: '',
      clean: '',
      dv: '',
      error: 'El RUT no puede estar vacío.',
    };
  }

  // 1. Limpieza de puntos, espacios y caracteres no alfanuméricos
  const clean = rawRut.replace(/[^0-9kK]/g, '').toUpperCase();

  if (clean.length < 2) {
    return {
      isValid: false,
      normalized: '',
      clean,
      dv: '',
      error: 'El RUT debe contener al menos un dígito y un dígito verificador.',
    };
  }

  // Separar cuerpo y dígito verificador
  const body = clean.slice(0, -1);
  const dv = clean.slice(-1);

  // El cuerpo debe contener únicamente dígitos numéricos
  if (!/^\d+$/.test(body)) {
    return {
      isValid: false,
      normalized: '',
      clean,
      dv,
      error: 'El cuerpo del RUT solo debe contener números.',
    };
  }

  // Validar longitud estándar del cuerpo (entre 6 y 8 dígitos para personas y empresas)
  if (body.length < 6 || body.length > 8) {
    return {
      isValid: false,
      normalized: '',
      clean,
      dv,
      error: 'La longitud del RUT está fuera del rango válido en Chile.',
    };
  }

  // 2. Algoritmo Módulo 11
  let sum = 0;
  let multiplier = 2;

  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * multiplier;
    multiplier = multiplier === 7 ? 2 : multiplier + 1;
  }

  const remainder = sum % 11;
  const calculatedDigitValue = 11 - remainder;

  let expectedDv = '';
  if (calculatedDigitValue === 11) {
    expectedDv = '0';
  } else if (calculatedDigitValue === 10) {
    expectedDv = 'K';
  } else {
    expectedDv = calculatedDigitValue.toString();
  }

  const isValid = dv === expectedDv;

  // Formato normalizado con puntos y guion: XX.XXX.XXX-X
  const formattedBody = body.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
  const normalized = `${formattedBody}-${dv}`;

  return {
    isValid,
    normalized,
    clean,
    dv,
    error: isValid ? undefined : `Dígito verificador incorrecto (esperado '${expectedDv}', recibido '${dv}').`,
  };
}
