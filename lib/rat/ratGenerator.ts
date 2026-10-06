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
  const data = {
    metadatos: {
      estandar: 'Ley Nº 21.719 - Art. 14 ter (RAT)',
      organismo: 'Agencia de Protección de Datos Personales (APDP Chile)',
      generador: 'leydedatospersonaleschile.cl - Agente LegalTech RAT',
      fechaGeneracion: new Date().toISOString(),
      codigoCertificado: empresa.codigoCertificadoRAT,
    },
    responsableTratamiento: empresa,
    actividadesTratamiento: actividades.filter(a => a.seleccionada),
  };

  return JSON.stringify(data, null, 2);
}
