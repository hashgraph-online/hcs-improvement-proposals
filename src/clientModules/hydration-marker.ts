/**
 * Client module to mark document as hydrated
 * This allows CSS to enable animations only after React hydration is complete,
 * preventing Cumulative Layout Shift (CLS) during the initial render
 */
export function onRouteDidUpdate() {
  if (typeof document !== 'undefined') {
    document.documentElement.classList.add('hydrated');
  }
}
