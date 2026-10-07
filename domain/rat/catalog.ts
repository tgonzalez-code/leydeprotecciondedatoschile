import { ACTIVIDADES_PREDEFINIDAS_RAT, DEFAULT_EMPRESA_RAT } from '../../config/rat.config';
import { ActividadRAT, DatosEmpresaRAT } from './types';

/**
 * Catálogo base de actividades predefinidas e inventario tipo para PYMEs chilenas.
 *
 * NOTAS DE REVISIÓN LEGAL:
 * - LEGAL_REVIEW_REQUIRED: Las bases de licitud asignadas a CCTV (Art. 13 letra e - Interés legítimo)
 *   requieren contar con cartel visible y ponderación documentada previa.
 * - TODO / BUSINESS_RULE_PENDING_REVIEW: Categorías adicionales por industria (Salud, Fintech, Educación).
 */

export const PREDEFINED_RAT_ACTIVITIES: ActividadRAT[] = ACTIVIDADES_PREDEFINIDAS_RAT;

export const DEFAULT_RAT_COMPANY_DATA: Omit<DatosEmpresaRAT, 'codigoCertificadoRAT'> = DEFAULT_EMPRESA_RAT;
