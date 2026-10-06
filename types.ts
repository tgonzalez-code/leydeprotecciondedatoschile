export type PageId = 
  | 'inicio'
  | 'ley-21719'
  | 'agente-rat'
  | 'derechos-arcop'
  | 'multas-utm'
  | 'test-cumplimiento'
  | 'casos-pymes'
  | 'guias-recursos'
  | 'compendio-legal';

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

// ----------------- DOMAIN & ASSESSMENT MODELS -----------------

export interface ChecklistItem {
  id: string;
  pregunta: string;
  articulos: string;
  ponderacion: number;
  consejo: string;
}

export type NivelRiesgoCumplimiento = 'Avanzado' | 'Moderado' | 'Crítico';

export interface DiagnosticoCumplimiento {
  nivel: string;
  categoria: NivelRiesgoCumplimiento;
  color: string;
  mensaje: string;
  puntaje: number;
  recomendaciones: string[];
}

// ----------------- CALCULATOR & SANCTIONS MODELS -----------------

export type TipoInfraccion = 'leve' | 'grave' | 'gravisima';

export interface InfraccionDetalle {
  tipo: TipoInfraccion;
  nombre: string;
  maxUtm: number;
  ejemplos: string[];
  articulos: string;
}

export interface CalculoMultaResultado {
  utmOficial: number;
  tipoInfraccion: TipoInfraccion;
  maxUtm: number;
  montoMaximoCLP: number;
  aplicaBeneficioPyme: boolean;
  esReincidente: boolean;
  puntosRiesgo: number;
  nivelRiesgo: 'Controlado' | 'Medio' | 'Crítico';
  tieneRAT: boolean;
  respondeBloqueo2Dias: boolean;
  manejaDatosSensibles: boolean;
  sancionEstimadaTexto: string;
}

// ----------------- ARCOP RIGHTS MODELS -----------------

export interface DerechoARCOPDetalle {
  tipo: TipoSolicitudARCO;
  articulo: string;
  sla: string;
  esCritico?: boolean;
  resumen: string;
  descripcionCompleta: string;
  requisitosTitular: string;
  obligacionEmpresa: string;
  excepcionesLegales: string;
  reclamacionAPDP: string;
}

// ----------------- LAW & TIMELINE MODELS -----------------

export interface TimelineHito {
  fase: string;
  fecha: string;
  titulo: string;
  descripcion: string;
  estado: 'Completado' | 'En curso' | 'Próximo hito' | 'Plena vigencia';
  articulosClave: string[];
  impactoEmpresa: string;
}

export interface ArticuloLeyCompendio {
  numero: string;
  titulo: string;
  resumen: string;
  contenido: string;
  obligatorio: boolean;
  tag: string;
}

export interface CasoPractico {
  titulo: string;
  rubro: string;
  situacion: string;
  riesgo: string;
  solucionRAT: string;
}

export interface RubroExposicion {
  id: string;
  name: string;
  riesgo: 'Alto' | 'Medio' | 'Crítico' | 'Bajo';
  datosTipicos: string;
  urgencia: string;
  beneficioPyme: string;
}
