/**
 * Icono de relleno compartido por las stories de Storybook — mismo
 * criterio que PlaceholderIcon en App.tsx: QuickActionTile y StatItem
 * exigen la prop `icon` sin default (ver metadata de cada uno, sección
 * "notes" — el asset real de Figma no se pudo descargar por el bloqueo
 * de egress de red). No reproduce ningún asset real de Figma.
 */
export function PlaceholderIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
