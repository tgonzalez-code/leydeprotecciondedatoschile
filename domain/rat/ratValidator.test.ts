import { describe, expect, it } from 'vitest';
import { validateCompanyData } from './ratValidator';
import { DatosEmpresaRAT } from './types';

describe('domain/rat/ratValidator - validateCompanyData', () => {
  const validCompany: DatosEmpresaRAT = {
    razonSocial: 'Tecnologías y Datos SpA',
    rutEmpresa: '76.845.120-6',
    representanteLegal: 'Andrea Morales Lagos',
    rubro: 'Tecnología',
    clasificacionTamano: 'Pequeña Pyme',
    responsableTratamientoDPO: 'Andrea Morales',
    emailContacto: 'contacto@tecnologias.cl',
    ciudadRegion: 'Valparaíso',
    fechaCreacion: '06/10/2026',
  };

  it('valida exitosamente una empresa con todos los datos y RUT correcto', () => {
    const res = validateCompanyData(validCompany);
    expect(res.isValid).toBe(true);
    expect(res.errors).toHaveLength(0);
    expect(res.normalizedRut).toBe('76.845.120-6');
  });

  it('detecta error si falta la razón social', () => {
    const res = validateCompanyData({ ...validCompany, razonSocial: '   ' });
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain('La razón social o nombre comercial es obligatoria.');
  });

  it('detecta error si el RUT tiene dígito verificador inválido', () => {
    const res = validateCompanyData({ ...validCompany, rutEmpresa: '76.845.120-9' });
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('Dígito verificador incorrecto'))).toBe(true);
  });

  it('detecta error si el correo de contacto tiene formato erróneo', () => {
    const res = validateCompanyData({ ...validCompany, emailContacto: 'invalido-sin-arroba' });
    expect(res.isValid).toBe(false);
    expect(res.errors.some((e) => e.includes('correo electrónico'))).toBe(true);
  });

  it('detecta error si falta el representante legal', () => {
    const res = validateCompanyData({ ...validCompany, representanteLegal: '' });
    expect(res.isValid).toBe(false);
    expect(res.errors).toContain('El nombre del representante legal es obligatorio.');
  });
});
