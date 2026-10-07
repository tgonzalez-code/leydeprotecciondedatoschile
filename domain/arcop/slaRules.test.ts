import { describe, expect, it } from 'vitest';
import { ARCOP_SLA_RULES } from './slaRules';

describe('domain/arcop/slaRules', () => {
  it('identifica el Bloqueo Temporal como crítico con SLA de 2 días hábiles (Art. 10 bis)', () => {
    const bloqueo = ARCOP_SLA_RULES['Bloqueo Temporal'];
    expect(bloqueo.isCritical).toBe(true);
    expect(bloqueo.slaDays).toBe(2);
    expect(bloqueo.slaType).toBe('dias_habiles');
    expect(bloqueo.requiresImmediateSuspension).toBe(true);
    expect(bloqueo.article).toBe('Art. 10 bis');
  });

  it('asigna SLA de 30 días corridos a los derechos tradicionales (Acceso, Rectificación, Supresión)', () => {
    ['Acceso', 'Rectificación', 'Supresión', 'Oposición', 'Portabilidad'].forEach((tipo) => {
      const regla = ARCOP_SLA_RULES[tipo as keyof typeof ARCOP_SLA_RULES];
      expect(regla.slaDays).toBe(30);
      expect(regla.slaType).toBe('dias_corridos');
      expect(regla.isCritical).toBe(false);
    });
  });
});
