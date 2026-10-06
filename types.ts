export type CategoriaActividad = 
  | 'rrhh' 
  | 'clientes' 
  | 'marketing' 
  | 'seguridad' 
  | 'proveedores' 
  | 'ecommerce';

export type BaseLicitudTipo = 
  | 'Art. 12 - Consentimiento expreso e informado'
  | 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial'
  | 'Art. 13 letra b) - Cumplimiento de una obligación legal (ej. laboral/tributaria)'
  | 'Art. 13 letra e) - Interés legítimo ponderado';

export interface ActividadRAT {
  id: string;
  categoria: CategoriaActividad;
  nombre: string;
  finalidad: string;
  titulares: string[];
  datosTratados: string[];
  contieneSensibles: boolean;
  categoriasSensibles: string[];
  baseLicitud: BaseLicitudTipo;
  justificacionLegal: string;
  almacenamiento: string;
  plazoConservacion: string;
  destinatarios: string;
  medidasSeguridad: string[];
  seleccionada: boolean;
}

export interface DatosEmpresaRAT {
  razonSocial: string;
  rutEmpresa: string;
  representanteLegal: string;
  rubro: string;
  clasificacionTamano: 'Microempresa' | 'Pequeña Pyme' | 'Mediana Empresa' | 'Gran Empresa';
  responsableTratamientoDPO: string;
  emailContacto: string;
  ciudadRegion: string;
  fechaCreacion: string;
  codigoCertificadoRAT?: string;
}

export type TipoSolicitudARCO = 
  | 'Bloqueo Temporal' 
  | 'Acceso' 
  | 'Rectificación' 
  | 'Supresión' 
  | 'Oposición' 
  | 'Portabilidad';

export interface SolicitudARCO {
  id: string;
  titularNombre: string;
  titularRUT: string;
  titularEmail: string;
  tipoSolicitud: TipoSolicitudARCO;
  fechaIngreso: string;
  slaMaximo: string; // "2 días hábiles" o "30 días corridos"
  fechaVencimiento: string;
  diasRestantes: number;
  estado: 'Pendiente' | 'En Proceso' | 'Respondida' | 'Rechazada Justificada';
  detalle: string;
}

export interface MensajeChat {
  id: string;
  remitente: 'usuario' | 'asistente';
  texto: string;
  timestamp: string;
  sugerencias?: string[];
}
