# Guía de Mantenimiento - leydedatospersonaleschile.cl

Esta guía detalla los procedimientos estándar para mantener, actualizar y escalar la plataforma sin romper la arquitectura de negocio.

---

## 1. Actualización de Parámetros Económicos (UTM)

Cuando el SII publique una nueva actualización del valor mensual de la UTM:
1. Abre `config/business.config.ts`.
2. Modifica la propiedad `utm.valorOficialCLP`:
   ```ts
   export const BUSINESS_CONFIG = {
     utm: {
       valorOficialCLP: 67294, // Actualizar aquí el nuevo valor en pesos chilenos
       fuente: 'Servicio de Impuestos Internos (SII)',
       actualizacion: '2026',
     },
     // ...
   };
   ```
3. Todas las calculadoras, conversiones y proyecciones en pesos chilenos se actualizarán automáticamente en todo el sistema.

---

## 2. Modificación del Test Diagnóstico de Cumplimiento

Para agregar o modificar preguntas, ponderaciones o consejos legales:
1. Abre `config/assessment.config.ts`.
2. Edita el arreglo `COMPLIANCE_QUESTIONS`:
   ```ts
   {
     id: 'ciberseguridad',
     pregunta: '¿Cuenta tu empresa con un protocolo de reporte de incidentes conforme a la Ley 21.663?',
     articulos: 'Ley 21.663',
     ponderacion: 15,
     consejo: 'Las brechas de seguridad deben notificarse en plazos estrictos a la autoridad.',
   }
   ```
3. Si deseas ajustar los umbrales de riesgo (`Avanzado`, `Moderado`, `Crítico`), ajusta `ASSESSMENT_THRESHOLDS` en el mismo archivo.

---

## 3. Adición de Nuevas Actividades Predefinidas al RAT

Para incluir nuevos tratamientos frecuentes para empresas chilenas:
1. Abre `config/rat.config.ts`.
2. Añade un nuevo objeto al arreglo `ACTIVIDADES_PREDEFINIDAS_RAT` siguiendo la interfaz `ActividadRAT` definida en `types.ts`.
3. El asistente del Agente RAT (`RatAgentWizard.tsx`) lo incorporará de inmediato tanto en la vista previa como en la exportación oficial JSON/PDF.

---

## 4. Publicación de Nuevos Artículos y Novedades de la Ley

Para agregar nuevos posts al carrusel del Home y a la biblioteca de recursos:
1. Abre `data/postsData.ts`.
2. Añade una nueva entrada al arreglo `POSTS_ACTUALIDAD_LEY`:
   ```ts
   {
     id: 'post-nuevo-reglamento',
     titulo: 'Publicado el Reglamento sobre Transferencias Internacionales',
     bajada: 'Requisitos para transferir datos a servidores fuera de Chile...',
     categoria: 'Reglamentos',
     tagBadge: 'Oficial',
     fecha: 'Mayo 2026',
     lecturaMin: '4 min lectura',
     resumenPuntos: [...],
     contenidoCompletoHtml: [...],
     articulosRelacionados: ['Art. 25 al 30'],
     enlaceAccionTexto: 'Revisar Compendio',
     enlaceAccionDestino: 'compendio-legal',
   }
   ```

---

## 5. Actualización de Textos, Copys y Configuración

- **Home, Hero y Métricas**: Editar `content/home.ts` (`HERO_CONTENT`, `HOME_TOOLS_CONTENT`, `HOME_CTA_CONTENT`, `HOME_METRICS`).
- **Navegación y Páginas**: Editar `config/site.config.ts` (`SITE_PAGES`, `MAIN_NAV_ITEMS`, `SITE_CONFIG`).
- **Asistente IA y Preguntas Rápidas**: Editar `content/chat.ts` (`PREGUNTAS_RAPIDAS_CHAT`, `MENSAJE_INICIAL_CHAT`).
- **Catálogo ARCOP**: Editar `content/arcop.ts`.
- **Hitos de la Ley y Articulado**: Editar `content/law-21719.ts`.
- **Casos Prácticos Pymes**: Editar `content/cases.ts`.
- **Preguntas Frecuentes**: Editar `content/faq.ts`.

---

## 6. Verificación y Compilación

Antes de desplegar cualquier cambio, ejecuta siempre:

```bash
# Verificar compilación limpia y tipos TypeScript
npm run build
```

El build debe concluir exitosamente sin errores de tipos ni referencias rotas.
