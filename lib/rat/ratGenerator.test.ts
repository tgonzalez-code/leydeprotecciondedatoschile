import { describe, expect, it } from 'vitest';
import {
  exportarRATaJSON,
  generarCodigoCertificadoRAT,
  validarDatosEmpresa,
} from './ratGenerator';
import { DEFAULT_EMPRESA_RAT, ACTIVIDADES_PREDEFINIDAS_RAT } from '../../config/rat.config';

describe('lib/rat/ratGenerator (Compatibility Layer)', () => {
  it('genera código de certificado con formato esperado', () => {
    const code = generarCodigoCertificadoRAT('76.845.120-6');
    expect(code).toContain('RAT-CL-');
  });

  it('valida datos de empresa usando delegación a domain', () => {
    const res = validarDatosEmpresa({
      ...DEFAULT_EMPRESA_RAT,
      codigoCertificadoRAT: 'TEST-123',
    });
    expect(res.valido).toBe(true);
    expect(res.errores).toHaveLength(0);
  });

  it('exporta JSON del RAT correctamente', () => {
    const jsonStr = exportarRATaJSON(
      { ...DEFAULT_EMPRESA_RAT, codigoCertificadoRAT: 'TEST-123' },
      ACTIVIDADES_PREDEFINIDAS_RAT
    );
    expect(jsonStr).toContain('Registro de Actividades de Tratamiento');
  });
});
