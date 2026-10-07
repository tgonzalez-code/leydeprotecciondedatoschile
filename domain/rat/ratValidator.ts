import { validateRut } from './rutValidator';
import { CompanyValidationResult, DatosEmpresaRAT } from './types';

/**
 * Valida los datos identificatorios de la empresa responsable del tratamiento (Art. 14 ter Nº 1).
 */
export function validateCompanyData(datos: DatosEmpresaRAT): CompanyValidationResult {
  const errors: string[] = [];

  if (!datos.razonSocial || !datos.razonSocial.trim()) {
    errors.push('La razón social o nombre comercial es obligatoria.');
  }

  const rutRes = validateRut(datos.rutEmpresa);
  if (!rutRes.isValid) {
    errors.push(rutRes.error || 'El RUT de la empresa no es válido conforme a la normativa chilena.');
  }

  if (!datos.representanteLegal || !datos.representanteLegal.trim()) {
    errors.push('El nombre del representante legal es obligatorio.');
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!datos.emailContacto || !emailRegex.test(datos.emailContacto.trim())) {
    errors.push('El correo electrónico de contacto para el canal ARCOP no tiene un formato válido.');
  }

  return {
    isValid: errors.length === 0,
    errors,
    normalizedRut: rutRes.isValid ? rutRes.normalized : undefined,
  };
}
