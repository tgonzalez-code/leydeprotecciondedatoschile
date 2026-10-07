import {
  generateRATCertificateCode,
  serializeRATToJSON,
} from '../../domain/rat/ratSerializer';
import { validateCompanyData } from '../../domain/rat/ratValidator';
import { ActividadRAT, DatosEmpresaRAT } from '../../types';

export function generarCodigoCertificadoRAT(rutEmpresa: string): string {
  return generateRATCertificateCode(rutEmpresa);
}

export function validarDatosEmpresa(datos: DatosEmpresaRAT): { valido: boolean; errores: string[] } {
  const result = validateCompanyData(datos);
  return {
    valido: result.isValid,
    errores: result.errors,
  };
}

export function exportarRATaJSON(empresa: DatosEmpresaRAT, actividades: ActividadRAT[]): string {
  return serializeRATToJSON(empresa, actividades);
}
