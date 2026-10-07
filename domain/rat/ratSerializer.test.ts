import { describe, expect, it } from 'vitest';
import { PREDEFINED_RAT_ACTIVITIES } from './catalog';
import {
  generateRATCertificateCode,
  parseRATFromJSON,
  serializeRATToJSON,
} from './ratSerializer';
import { ActividadRAT, DatosEmpresaRAT } from './types';

describe('domain/rat/ratSerializer', () => {
  const sampleCompany: DatosEmpresaRAT = {
    razonSocial: 'Comercializadora de Prueba SpA',
    rutEmpresa: '76.845.120-K',
    representanteLegal: 'María José Valenzuela',
    rubro: 'Retail y Comercio Electrónico',
    clasificacionTamano: 'Pequeña Pyme',
    responsableTratamientoDPO: 'María José Valenzuela',
    emailContacto: 'privacidad@comercializadora.cl',
    ciudadRegion: 'Santiago, Región Metropolitana',
    fechaCreacion: '06/10/2026',
    codigoCertificadoRAT: 'RAT-CL-2026-7684-TEST',
  };

  it('serializa un JSON válido con todos los campos regulatorios requeridos', () => {
    const jsonStr = serializeRATToJSON(sampleCompany, PREDEFINED_RAT_ACTIVITIES);
    expect(typeof jsonStr).toBe('string');

    const parsed = parseRATFromJSON(jsonStr);

    expect(parsed.documentoOficial).toBe('Registro de Actividades de Tratamiento (RAT) - Ley 21.719');
    expect(parsed.articuloFundante).toContain('Artículo 14 ter');
    expect(parsed.entidadFiscalizadora).toContain('APDP');
    expect(parsed.codigoCertificacion).toBe('RAT-CL-2026-7684-TEST');
    expect(parsed.responsableTratamiento.razonSocial).toBe('Comercializadora de Prueba SpA');
    expect(parsed.resumenEstadistico).toBeDefined();
    expect(parsed.actividadesDeTratamiento).toBeInstanceOf(Array);
  });

  it('filtra y serializa únicamente las actividades con seleccionada: true', () => {
    const activitiesWithOneSelected: ActividadRAT[] = [
      { ...PREDEFINED_RAT_ACTIVITIES[0], seleccionada: true },
      { ...PREDEFINED_RAT_ACTIVITIES[1], seleccionada: false },
    ];

    const jsonStr = serializeRATToJSON(sampleCompany, activitiesWithOneSelected);
    const parsed = parseRATFromJSON(jsonStr);

    expect(parsed.resumenEstadistico.totalActividadesRegistradas).toBe(1);
    expect(parsed.actividadesDeTratamiento.length).toBe(1);
    expect(parsed.actividadesDeTratamiento[0].id).toBe(PREDEFINED_RAT_ACTIVITIES[0].id);
  });

  it('calcula correctamente el conteo de actividades con datos sensibles', () => {
    // PREDEFINED_RAT_ACTIVITIES[0] es RRHH (con huella/salud = contieneSensibles: true)
    // PREDEFINED_RAT_ACTIVITIES[1] es CRM (contieneSensibles: false)
    const activities: ActividadRAT[] = [
      { ...PREDEFINED_RAT_ACTIVITIES[0], seleccionada: true },
      { ...PREDEFINED_RAT_ACTIVITIES[1], seleccionada: true },
    ];

    const jsonStr = serializeRATToJSON(sampleCompany, activities);
    const parsed = parseRATFromJSON(jsonStr);

    expect(parsed.resumenEstadistico.actividadesConDatosSensibles).toBe(1);
  });

  it('conserva íntegramente una actividad personalizada creada por el usuario', () => {
    const customActivity: ActividadRAT = {
      id: 'act-custom-geolocalizacion-flota',
      categoria: 'seguridad',
      nombre: 'Monitoreo GPS en Vehículos de Reparto',
      finalidad: 'Seguridad de la carga y optimización de rutas de despacho',
      titulares: ['Choferes de despacho'],
      datosTratados: ['Coordenadas GPS', 'Velocidad', 'Horarios de encendido'],
      contieneSensibles: false,
      categoriasSensibles: [],
      baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
      justificacionLegal: 'Control de medios de trabajo según Art. 154 bis del Código del Trabajo',
      almacenamiento: 'Plataforma telemática de proveedor de GPS',
      plazoConservacion: '90 días de historial de rutas',
      destinatarios: 'Aseguradora de carga en caso de siniestro',
      medidasSeguridad: ['Acceso con doble factor', 'Bitácora de consultas'],
      seleccionada: true,
    };

    const jsonStr = serializeRATToJSON(sampleCompany, [customActivity]);
    const parsed = parseRATFromJSON(jsonStr);

    expect(parsed.actividadesDeTratamiento.length).toBe(1);
    const serializedAct = parsed.actividadesDeTratamiento[0];
    expect(serializedAct.nombreActividad).toBe('Monitoreo GPS en Vehículos de Reparto');
    expect(serializedAct.datosTratados).toContain('Coordenadas GPS');
    expect(serializedAct.plazoDeConservacion).toBe('90 días de historial de rutas');
  });

  it('genera un código de certificado con formato estándar si no se proporciona uno', () => {
    const code = generateRATCertificateCode('76845120K');
    const currentYear = new Date().getFullYear();

    expect(code).toMatch(new RegExp(`^RAT-CL-${currentYear}-7684-[A-Z0-9]{4}$`));
  });

  it('lanza error al intentar parsear un JSON que no corresponde al esquema RAT', () => {
    expect(() => parseRATFromJSON('{"foo": "bar"}')).toThrowError('esquema estructural');
  });
});
