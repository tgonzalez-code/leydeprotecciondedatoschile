import { ActividadRAT, BaseLicitudTipo, CategoriaActividad, DatosEmpresaRAT } from '../../types';

export type { ActividadRAT, BaseLicitudTipo, CategoriaActividad, DatosEmpresaRAT };

export interface RATStatisticalSummary {
  totalActividadesRegistradas: number;
  actividadesConDatosSensibles: number;
  estadoCumplimientoTramo1: string;
}

export interface RATSerializedActivity {
  id: string;
  nombreActividad: string;
  categoria: CategoriaActividad;
  finalidadEspecifica: string;
  categoriasTitulares: string[];
  datosTratados: string[];
  trataDatosSensiblesOEspeciales: boolean;
  detalleCategoriasSensibles: string[];
  baseDeLicitudAsignada: BaseLicitudTipo;
  fundamentoJuridico: string;
  lugarDeAlmacenamiento: string;
  plazoDeConservacion: string;
  destinatariosTransferencias: string;
  medidasDeSeguridadTecnicasYOrganizativas: string[];
}

export interface RATDocumentPayload {
  documentoOficial: string;
  articuloFundante: string;
  entidadFiscalizadora: string;
  codigoCertificacion: string;
  fechaGeneracion: string;
  responsableTratamiento: DatosEmpresaRAT;
  resumenEstadistico: RATStatisticalSummary;
  actividadesDeTratamiento: RATSerializedActivity[];
}

export interface CompanyValidationResult {
  isValid: boolean;
  errors: string[];
  normalizedRut?: string;
}
