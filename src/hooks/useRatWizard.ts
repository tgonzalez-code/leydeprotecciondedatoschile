import { useState, useMemo, useCallback, Dispatch, SetStateAction } from 'react';
import { ACTIVIDADES_PREDEFINIDAS_RAT, DEFAULT_EMPRESA_RAT } from '../../config/rat.config';
import { exportarRATaJSON, generarCodigoCertificadoRAT } from '../../lib/rat/ratGenerator';
import { validateCompanyData } from '../../domain/rat/ratValidator';
import { CompanyValidationResult } from '../../domain/rat/types';
import { ActividadRAT, DatosEmpresaRAT } from '../../types';

export interface UseRatWizardOptions {
  initialPaso?: number;
  initialEmpresa?: Partial<DatosEmpresaRAT>;
  initialActividades?: ActividadRAT[];
}

export interface UseRatWizardReturn {
  // Navigation & Step State
  paso: number;
  setPaso: (paso: number) => void;
  siguientePaso: () => void;
  pasoAnterior: () => void;
  irAPaso: (paso: number) => void;
  puedeContinuarPaso1: boolean;

  // Company Data & Validation
  datosEmpresa: DatosEmpresaRAT;
  setDatosEmpresa: Dispatch<SetStateAction<DatosEmpresaRAT>>;
  actualizarDatosEmpresa: (cambios: Partial<DatosEmpresaRAT>) => void;
  actualizarCampoEmpresa: <K extends keyof DatosEmpresaRAT>(campo: K, valor: DatosEmpresaRAT[K]) => void;
  validacionEmpresa: CompanyValidationResult;

  // Activities State
  actividades: ActividadRAT[];
  setActividades: Dispatch<SetStateAction<ActividadRAT[]>>;
  toggleActividad: (id: string) => void;
  filtroCategoria: string;
  setFiltroCategoria: (categoria: string) => void;
  actividadesFiltradas: ActividadRAT[];
  actividadesSeleccionadas: ActividadRAT[];
  totalSeleccionadas: number;
  totalActividades: number;
  conDatosSensiblesCount: number;

  // Custom Activity Modal State & Actions
  mostrarModalNueva: boolean;
  setMostrarModalNueva: (mostrar: boolean) => void;
  nuevaActividadNombre: string;
  setNuevaActividadNombre: (nombre: string) => void;
  nuevaActividadFinalidad: string;
  setNuevaActividadFinalidad: (finalidad: string) => void;
  abrirModalNuevaActividad: () => void;
  cerrarModalNuevaActividad: () => void;
  agregarActividadPersonalizada: (nombre?: string, finalidad?: string) => void;

  // Serialization & Export
  generarJSONString: () => string;
  exportarJSON: () => void;
  reset: () => void;
}

/**
 * Hook para la gestión del flujo del Agente Wizard de Registro RAT (Art. 14 ter).
 * Desacopla la navegación de 4 pasos, la validación formal de empresa y el catálogo
 * de tratamientos de datos personales.
 */
export function useRatWizard(options: UseRatWizardOptions = {}): UseRatWizardReturn {
  const [paso, setPaso] = useState<number>(options.initialPaso ?? 1);

  const initialEmpresaData: DatosEmpresaRAT = useMemo(() => {
    const base = {
      ...DEFAULT_EMPRESA_RAT,
      ...options.initialEmpresa,
    };
    return {
      ...base,
      codigoCertificadoRAT:
        base.codigoCertificadoRAT || generarCodigoCertificadoRAT(base.rutEmpresa),
    };
  }, [options.initialEmpresa]);

  const [datosEmpresa, setDatosEmpresa] = useState<DatosEmpresaRAT>(initialEmpresaData);
  const [actividades, setActividades] = useState<ActividadRAT[]>(
    options.initialActividades ?? ACTIVIDADES_PREDEFINIDAS_RAT
  );
  const [filtroCategoria, setFiltroCategoria] = useState<string>('todas');

  // Estado del modal de nueva actividad personalizada
  const [mostrarModalNueva, setMostrarModalNueva] = useState(false);
  const [nuevaActividadNombre, setNuevaActividadNombre] = useState('');
  const [nuevaActividadFinalidad, setNuevaActividadFinalidad] = useState('');

  // Validación de empresa mediante el dominio puro
  const validacionEmpresa = useMemo(() => {
    return validateCompanyData(datosEmpresa);
  }, [datosEmpresa]);

  const puedeContinuarPaso1 = useMemo(() => {
    return Boolean(
      datosEmpresa.razonSocial?.trim() &&
      datosEmpresa.rutEmpresa?.trim() &&
      datosEmpresa.representanteLegal?.trim() &&
      datosEmpresa.emailContacto?.trim()
    );
  }, [datosEmpresa]);

  // Actualizaciones de datos de empresa
  const actualizarDatosEmpresa = useCallback((cambios: Partial<DatosEmpresaRAT>) => {
    setDatosEmpresa((prev) => {
      const nuevo = { ...prev, ...cambios };
      if (cambios.rutEmpresa && cambios.rutEmpresa !== prev.rutEmpresa) {
        nuevo.codigoCertificadoRAT = generarCodigoCertificadoRAT(cambios.rutEmpresa);
      }
      return nuevo;
    });
  }, []);

  const actualizarCampoEmpresa = useCallback(
    <K extends keyof DatosEmpresaRAT>(campo: K, valor: DatosEmpresaRAT[K]) => {
      setDatosEmpresa((prev) => {
        const nuevo = { ...prev, [campo]: valor };
        if (campo === 'rutEmpresa' && typeof valor === 'string') {
          nuevo.codigoCertificadoRAT = generarCodigoCertificadoRAT(valor);
        }
        return nuevo;
      });
    },
    []
  );

  // Navegación
  const irAPaso = useCallback((p: number) => {
    if (p >= 1 && p <= 4) {
      setPaso(p);
    }
  }, []);

  const siguientePaso = useCallback(() => {
    setPaso((prev) => Math.min(prev + 1, 4));
  }, []);

  const pasoAnterior = useCallback(() => {
    setPaso((prev) => Math.max(prev - 1, 1));
  }, []);

  // Toggling de tratamientos
  const toggleActividad = useCallback((id: string) => {
    setActividades((prev) =>
      prev.map((a) => (a.id === id ? { ...a, seleccionada: !a.seleccionada } : a))
    );
  }, []);

  // Modal y adición de actividad personalizada
  const abrirModalNuevaActividad = useCallback(() => {
    setMostrarModalNueva(true);
  }, []);

  const cerrarModalNuevaActividad = useCallback(() => {
    setMostrarModalNueva(false);
    setNuevaActividadNombre('');
    setNuevaActividadFinalidad('');
  }, []);

  const agregarActividadPersonalizada = useCallback(
    (nombreOverride?: string, finalidadOverride?: string) => {
      const nombre = (nombreOverride !== undefined ? nombreOverride : nuevaActividadNombre).trim();
      const finalidad = (finalidadOverride !== undefined ? finalidadOverride : nuevaActividadFinalidad).trim();
      if (!nombre) return;
      const nueva: ActividadRAT = {
        id: `act-custom-${Date.now()}`,
        categoria: 'clientes',
        nombre,
        finalidad: finalidad || 'Finalidad operativa definida por la empresa',
        titulares: ['Clientes o Usuarios'],
        datosTratados: ['Nombre', 'RUT', 'Email', 'Teléfono'],
        contieneSensibles: false,
        categoriasSensibles: [],
        baseLicitud: 'Art. 13 letra a) - Ejecución de contrato o relación laboral/comercial',
        justificacionLegal: 'Tratamiento necesario para el desarrollo de la actividad comercial.',
        almacenamiento: 'Sistemas informáticos internos de la empresa',
        plazoConservacion:
          'Durante la vigencia de la relación + 3 años de prescripción ordinaria.',
        destinatarios: 'Uso interno de la empresa.',
        medidasSeguridad: ['Acceso restringido mediante usuario y clave'],
        seleccionada: true,
      };

      setActividades((prev) => [...prev, nueva]);
      cerrarModalNuevaActividad();
    },
    [nuevaActividadNombre, nuevaActividadFinalidad, cerrarModalNuevaActividad]
  );

  // Filtros y conteos
  const actividadesSeleccionadas = useMemo(() => {
    return actividades.filter((a) => a.seleccionada);
  }, [actividades]);

  const actividadesFiltradas = useMemo(() => {
    if (filtroCategoria === 'todas') return actividades;
    return actividades.filter((a) => a.categoria === filtroCategoria);
  }, [actividades, filtroCategoria]);

  const conDatosSensiblesCount = useMemo(() => {
    return actividadesSeleccionadas.filter((a) => a.contieneSensibles).length;
  }, [actividadesSeleccionadas]);

  // Exportación
  const generarJSONString = useCallback(() => {
    return exportarRATaJSON(datosEmpresa, actividades);
  }, [datosEmpresa, actividades]);

  const exportarJSON = useCallback(() => {
    const jsonStr = generarJSONString();
    if (typeof window === 'undefined') return;
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    const cleanRut = (datosEmpresa.rutEmpresa || 'empresa')
      .replace(/\./g, '')
      .replace(/-/g, '_');
    link.download = `RAT_${cleanRut}_APDP.json`;
    link.click();
    URL.revokeObjectURL(url);
  }, [generarJSONString, datosEmpresa.rutEmpresa]);

  const reset = useCallback(() => {
    setPaso(1);
    setDatosEmpresa(initialEmpresaData);
    setActividades(options.initialActividades ?? ACTIVIDADES_PREDEFINIDAS_RAT);
    setFiltroCategoria('todas');
    cerrarModalNuevaActividad();
  }, [initialEmpresaData, options.initialActividades, cerrarModalNuevaActividad]);

  return {
    paso,
    setPaso,
    siguientePaso,
    pasoAnterior,
    irAPaso,
    puedeContinuarPaso1,
    datosEmpresa,
    setDatosEmpresa,
    actualizarDatosEmpresa,
    actualizarCampoEmpresa,
    validacionEmpresa,
    actividades,
    setActividades,
    toggleActividad,
    filtroCategoria,
    setFiltroCategoria,
    actividadesFiltradas,
    actividadesSeleccionadas,
    totalSeleccionadas: actividadesSeleccionadas.length,
    totalActividades: actividades.length,
    conDatosSensiblesCount,
    mostrarModalNueva,
    setMostrarModalNueva,
    nuevaActividadNombre,
    setNuevaActividadNombre,
    nuevaActividadFinalidad,
    setNuevaActividadFinalidad,
    abrirModalNuevaActividad,
    cerrarModalNuevaActividad,
    agregarActividadPersonalizada,
    generarJSONString,
    exportarJSON,
    reset,
  };
}
