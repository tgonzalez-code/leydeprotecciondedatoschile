import { describe, expect, it } from 'vitest';
import { validateRut } from './rutValidator';

describe('domain/rat/rutValidator', () => {
  describe('RUTs válidos en diversos formatos', () => {
    it('valida RUT con puntos y guion estándar (12.345.678-5)', () => {
      const res = validateRut('12.345.678-5');
      expect(res.isValid).toBe(true);
      expect(res.normalized).toBe('12.345.678-5');
      expect(res.dv).toBe('5');
      expect(res.error).toBeUndefined();
    });

    it('valida RUT sin puntos pero con guion (12345678-5)', () => {
      const res = validateRut('12345678-5');
      expect(res.isValid).toBe(true);
      expect(res.normalized).toBe('12.345.678-5');
    });

    it('valida RUT plano sin puntos ni guion (123456785)', () => {
      const res = validateRut('123456785');
      expect(res.isValid).toBe(true);
      expect(res.normalized).toBe('12.345.678-5');
    });

    it('valida RUT terminado en K mayúscula o minúscula', () => {
      // 11.111.112-K: 2*2 + 1*3 + 1*4 + 1*5 + 1*6 + 1*7 + 1*2 + 1*3 = 4+3+4+5+6+7+2+3 = 34. 34%11 = 1. 11-1 = 10 -> 'K'
      const resUpper = validateRut('11.111.112-K');
      expect(resUpper.isValid).toBe(true);
      expect(resUpper.dv).toBe('K');

      const resLower = validateRut('11111112k');
      expect(resLower.isValid).toBe(true);
      expect(resLower.normalized).toBe('11.111.112-K');
    });

    it('valida RUT terminado en dígito 0', () => {
      // 11.111.113-0: 3*2 + 1*3 + 1*4 + 1*5 + 1*6 + 1*7 + 1*2 + 1*3 = 6+3+4+5+6+7+2+3 = 36. 36%11 = 3? Wait,
      // Let's check 11.111.120: 0*2 + 2*3 + 1*4 + 1*5 + 1*6 + 1*7 + 1*2 + 1*3 = 0+6+4+5+6+7+2+3 = 33. 33%11 = 0. 11-0 = 11 -> expected '0'.
      const res0 = validateRut('11.111.120-0');
      expect(res0.isValid).toBe(true);
      expect(res0.dv).toBe('0');
    });

    it('ignora y limpia espacios en blanco iniciales o finales', () => {
      const res = validateRut('  12.345.678-5   ');
      expect(res.isValid).toBe(true);
      expect(res.normalized).toBe('12.345.678-5');
    });
  });

  describe('Detección de RUTs inválidos y casos de borde', () => {
    it('rechaza RUT con dígito verificador incorrecto', () => {
      const res = validateRut('12.345.678-9'); // correcto es 5
      expect(res.isValid).toBe(false);
      expect(res.error).toContain('Dígito verificador incorrecto');
    });

    it('rechaza string vacío o no string', () => {
      const resEmpty = validateRut('');
      expect(resEmpty.isValid).toBe(false);
      expect(resEmpty.error).toContain('no puede estar vacío');

      const resNull = validateRut(null as unknown as string);
      expect(resNull.isValid).toBe(false);
    });

    it('rechaza caracteres inválidos que no forman un RUT', () => {
      const resChars = validateRut('ABCDEFGH-X');
      expect(resChars.isValid).toBe(false);
      expect(resChars.error).toBeDefined();
    });

    it('rechaza RUT con longitud excesiva o insuficiente', () => {
      const resShort = validateRut('1-9');
      expect(resShort.isValid).toBe(false);

      const resLong = validateRut('1234567890123-5');
      expect(resLong.isValid).toBe(false);
    });
  });
});
