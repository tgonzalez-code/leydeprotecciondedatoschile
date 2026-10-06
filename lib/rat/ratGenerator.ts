import { ActividadRAT, DatosEmpresaRAT } from '../../types';

export function generarCodigoCertificadoRAT(rutEmpresa: string): string {
  const anio = new Date().getFullYear();
  const cleanRut = rutEmpresa.replace(/[^0-9kK]/g, '').slice(0, 4);
  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `RAT-CL-${anio}-${cleanRut || 'APDP'}-${randomSuffix}`;
}

export function validarDatosEmpresa(datos: DatosEmpresaRAT): { valido: boolean; errores: string[] } {
  const errores: string[] = [];

  if (!datos.razonSocial.trim()) {
    errores.push('La razón social o nombre comercial es obligatoria.');
  }

  if (!datos.rutEmpresa.trim()) {
    errores.push('El RUT de la empresa es obligatorio.');
  }

  if (!datos.emailContacto.trim() || !datos.emailContacto.includes('@')) {
    errores.push('El correo electrónico de contacto no es válido.');
  }

  return {
    valido: errores.length === 0,
    errores,
  };
}

export function exportarRATaJSON(empresa: DatosEmpresaRAT, actividades: ActividadRAT[]): string {
  const seleccionadas = actividades.filter(a => a.seleccionada);
  const data = {
    documentoOficial: "Registro de Actividades de Tratamiento (RAT) - Ley 21.719",
    articuloFundante: "Artículo 14 ter de la Ley 19.628 modificada por Ley 21.719",
    entidadFiscalizadora: "Agencia de Protección de Datos Personales (APDP) - Chile",
    codigoCertificacion: empresa.codigoCertificadoRAT,
    fechaGeneracion: new Date().toISOString(),
    responsableTratamiento: empresa,
    resumenEstadistico: {
      totalActividadesRegistradas: seleccionadas.length,
      actividadesConDatosSensibles: seleccionadas.filter(a => a.contieneSensibles).length,
      estadoCumplimientoTramo1: "COMPLETO Y VIGENTE",
    },
    actividadesDeTratamiento: seleccionadas.map(a => ({
      id: a.id,
      nombreActividad: a.nombre,
      categoria: a.categoria,
      finalidadEspecifica: a.finalidad,
      categoriasTitulares: a.titulares,
      datosTratados: a.datosTratados,
      trataDatosSensiblesOEspeciales: a.contieneSensibles,
      detalleCategoriasSensibles: a.categoriasSensibles,
      baseDeLicitudAsignada: a.baseLicitud,
      fundamentoJuridico: a.justificacionLegal,
      lugarDeAlmacenamiento: a.almacenamiento,
      plazoDeConservacion: a.plazoConservacion,
      destinatariosTransferencias: a.destinatarios,
      medidasDeSeguridadTecnicasYOrganizativas: a.medidasSeguridad,
    })),
  };

  return JSON.stringify(data, null, 2);
}
