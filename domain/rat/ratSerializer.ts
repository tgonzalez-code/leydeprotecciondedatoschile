import { ActividadRAT, DatosEmpresaRAT, RATDocumentPayload } from './types';

/**
 * Genera un código único de acreditación interna para la ficha del RAT.
 */
export function generateRATCertificateCode(rutEmpresa: string): string {
  const anio = new Date().getFullYear();
  const cleanRut = (rutEmpresa || '').replace(/[^0-9kK]/g, '').slice(0, 4);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RAT-CL-${anio}-${cleanRut || 'APDP'}-${randomSuffix}`;
}

/**
 * Serializa los tratamientos seleccionados y datos de la empresa al formato oficial APDP Tramo 1.
 * Función pura: no toca el DOM, genera JSON estructurado e identado.
 */
export function serializeRATToJSON(
  empresa: DatosEmpresaRAT,
  actividades: ActividadRAT[]
): string {
  const seleccionadas = actividades.filter((a) => a.seleccionada);

  const payload: RATDocumentPayload = {
    documentoOficial: 'Registro de Actividades de Tratamiento (RAT) - Ley 21.719',
    articuloFundante: 'Artículo 14 ter de la Ley 19.628 modificada por Ley 21.719',
    entidadFiscalizadora: 'Agencia de Protección de Datos Personales (APDP) - Chile',
    codigoCertificacion: empresa.codigoCertificadoRAT || generateRATCertificateCode(empresa.rutEmpresa),
    fechaGeneracion: new Date().toISOString(),
    responsableTratamiento: { ...empresa },
    resumenEstadistico: {
      totalActividadesRegistradas: seleccionadas.length,
      actividadesConDatosSensibles: seleccionadas.filter((a) => a.contieneSensibles).length,
      estadoCumplimientoTramo1: 'COMPLETO Y VIGENTE',
    },
    actividadesDeTratamiento: seleccionadas.map((a) => ({
      id: a.id,
      nombreActividad: a.nombre,
      categoria: a.categoria,
      finalidadEspecifica: a.finalidad,
      categoriasTitulares: [...a.titulares],
      datosTratados: [...a.datosTratados],
      trataDatosSensiblesOEspeciales: a.contieneSensibles,
      detalleCategoriasSensibles: [...a.categoriasSensibles],
      baseDeLicitudAsignada: a.baseLicitud,
      fundamentoJuridico: a.justificacionLegal,
      lugarDeAlmacenamiento: a.almacenamiento,
      plazoDeConservacion: a.plazoConservacion,
      destinatariosTransferencias: a.destinatarios,
      medidasDeSeguridadTecnicasYOrganizativas: [...a.medidasSeguridad],
    })),
  };

  return JSON.stringify(payload, null, 2);
}

/**
 * Parsea y valida preliminarmente un string JSON de un RAT ya exportado.
 */
export function parseRATFromJSON(jsonString: string): RATDocumentPayload {
  const data = JSON.parse(jsonString) as RATDocumentPayload;
  if (!data.documentoOficial || !data.responsableTratamiento || !Array.isArray(data.actividadesDeTratamiento)) {
    throw new Error('El archivo no cumple con el esquema estructural de un RAT oficial de la Ley 21.719.');
  }
  return data;
}
