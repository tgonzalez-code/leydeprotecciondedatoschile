import { describe, expect, it, vi } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useRatWizard } from './useRatWizard';

describe('hooks/useRatWizard', () => {
  it('inicializa en el paso 1 con datos predeterminados de empresa y actividades del catálogo', () => {
    const { result } = renderHook(() => useRatWizard());

    expect(result.current.paso).toBe(1);
    expect(result.current.datosEmpresa.razonSocial).toBe('Comercial & Servicios SpA');
    expect(result.current.datosEmpresa.codigoCertificadoRAT).toBeDefined();
    expect(result.current.actividades.length).toBeGreaterThan(0);
    expect(result.current.totalSeleccionadas).toBeGreaterThan(0);
    expect(result.current.puedeContinuarPaso1).toBe(true);
    expect(result.current.validacionEmpresa.isValid).toBe(true);
  });

  it('gestiona la navegación entre pasos (1 a 4) respetando límites', () => {
    const { result } = renderHook(() => useRatWizard());

    expect(result.current.paso).toBe(1);

    act(() => {
      result.current.siguientePaso();
    });
    expect(result.current.paso).toBe(2);

    act(() => {
      result.current.siguientePaso();
    });
    expect(result.current.paso).toBe(3);

    act(() => {
      result.current.siguientePaso();
    });
    expect(result.current.paso).toBe(4);

    // No debe superar paso 4
    act(() => {
      result.current.siguientePaso();
    });
    expect(result.current.paso).toBe(4);

    // Retroceso
    act(() => {
      result.current.pasoAnterior();
    });
    expect(result.current.paso).toBe(3);

    // Salto directo
    act(() => {
      result.current.irAPaso(1);
    });
    expect(result.current.paso).toBe(1);
  });

  it('permite actualizar campos individuales de la empresa y regenera código de registro ante cambio de RUT', () => {
    const { result } = renderHook(() => useRatWizard());

    const codigoOriginal = result.current.datosEmpresa.codigoCertificadoRAT;

    act(() => {
      result.current.actualizarCampoEmpresa('razonSocial', 'Nueva Empresa SpA');
      result.current.actualizarCampoEmpresa('rutEmpresa', '12.345.678-5');
    });

    expect(result.current.datosEmpresa.razonSocial).toBe('Nueva Empresa SpA');
    expect(result.current.datosEmpresa.rutEmpresa).toBe('12.345.678-5');
    expect(result.current.datosEmpresa.codigoCertificadoRAT).not.toBe(codigoOriginal);
  });

  it('detecta errores de validación mediante el validador del dominio', () => {
    const { result } = renderHook(() => useRatWizard());

    // Asignar RUT con DV inválido
    act(() => {
      result.current.actualizarCampoEmpresa('rutEmpresa', '12.345.678-9');
    });

    expect(result.current.validacionEmpresa.isValid).toBe(false);
    expect(
      result.current.validacionEmpresa.errors.some((e) =>
        e.includes('Dígito verificador incorrecto')
      )
    ).toBe(true);
  });

  it('permite seleccionar, deseleccionar y filtrar actividades de tratamiento', () => {
    const { result } = renderHook(() => useRatWizard());

    const primeraActividad = result.current.actividades[0];
    const estadoInicial = primeraActividad.seleccionada;

    act(() => {
      result.current.toggleActividad(primeraActividad.id);
    });

    const actividadModificada = result.current.actividades.find(
      (a) => a.id === primeraActividad.id
    );
    expect(actividadModificada?.seleccionada).toBe(!estadoInicial);

    // Filtrar por categoría
    act(() => {
      result.current.setFiltroCategoria('rrhh');
    });

    expect(result.current.filtroCategoria).toBe('rrhh');
    expect(
      result.current.actividadesFiltradas.every((a) => a.categoria === 'rrhh')
    ).toBe(true);
  });

  it('permite agregar una actividad personalizada y la incluye en la lista seleccionada', () => {
    const { result } = renderHook(() => useRatWizard());
    const initialCount = result.current.actividades.length;

    act(() => {
      result.current.agregarActividadPersonalizada(
        'Cámaras de vigilancia perimetral',
        'Seguridad de accesos e instalaciones'
      );
    });

    expect(result.current.actividades.length).toBe(initialCount + 1);
    const added = result.current.actividades.find((a) =>
      a.nombre.includes('Cámaras de vigilancia')
    );
    expect(added).toBeDefined();
    expect(added?.seleccionada).toBe(true);
  });

  it('genera un payload JSON serializado con el formato legal exigible por la APDP', () => {
    const { result } = renderHook(() => useRatWizard());

    const jsonStr = result.current.generarJSONString();
    expect(typeof jsonStr).toBe('string');

    const parsed = JSON.parse(jsonStr);
    expect(parsed.documentoOficial).toBeDefined();
    expect(parsed.responsableTratamiento).toBeDefined();
    expect(parsed.actividadesDeTratamiento).toBeDefined();
    expect(Array.isArray(parsed.actividadesDeTratamiento)).toBe(true);
  });

  it('abre y cierra el modal de nueva actividad y limpia los campos', () => {
    const { result } = renderHook(() => useRatWizard());

    expect(result.current.mostrarModalNueva).toBe(false);

    act(() => {
      result.current.abrirModalNuevaActividad();
      result.current.setNuevaActividadNombre('Test temporal');
      result.current.setNuevaActividadFinalidad('Finalidad temporal');
    });

    expect(result.current.mostrarModalNueva).toBe(true);
    expect(result.current.nuevaActividadNombre).toBe('Test temporal');

    act(() => {
      result.current.cerrarModalNuevaActividad();
    });

    expect(result.current.mostrarModalNueva).toBe(false);
    expect(result.current.nuevaActividadNombre).toBe('');
    expect(result.current.nuevaActividadFinalidad).toBe('');
  });

  it('evalúa puedeContinuarPaso1 como falso si faltan campos obligatorios', () => {
    const { result } = renderHook(() => useRatWizard());

    act(() => {
      result.current.actualizarDatosEmpresa({ razonSocial: '' });
    });

    expect(result.current.puedeContinuarPaso1).toBe(false);
  });

  it('ejecuta exportarJSON llamando a los métodos del navegador', () => {
    const { result } = renderHook(() => useRatWizard());

    // Mock createObjectURL & revokeObjectURL
    const createObjectUrlMock = vi.fn().mockReturnValue('blob:mock-url');
    const revokeObjectUrlMock = vi.fn();
    window.URL.createObjectURL = createObjectUrlMock;
    window.URL.revokeObjectURL = revokeObjectUrlMock;

    act(() => {
      result.current.exportarJSON();
    });

    expect(createObjectUrlMock).toHaveBeenCalled();
    expect(revokeObjectUrlMock).toHaveBeenCalledWith('blob:mock-url');
  });

  it('restablece el estado completo a los valores iniciales con reset()', () => {
    const { result } = renderHook(() => useRatWizard());

    act(() => {
      result.current.irAPaso(3);
      result.current.actualizarCampoEmpresa('razonSocial', 'Compañía Modificada');
      result.current.setFiltroCategoria('seguridad');
    });

    expect(result.current.paso).toBe(3);
    expect(result.current.datosEmpresa.razonSocial).toBe('Compañía Modificada');

    act(() => {
      result.current.reset();
    });

    expect(result.current.paso).toBe(1);
    expect(result.current.datosEmpresa.razonSocial).toBe('Comercial & Servicios SpA');
    expect(result.current.filtroCategoria).toBe('todas');
  });
});
