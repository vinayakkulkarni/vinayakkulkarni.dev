/**
 * Automation-browser detection for third-party beacon gating.
 *
 * Headless agent checkers wait for `networkidle` on a short budget, and every
 * third-party beacon adds an unbounded-latency request to that window. Bot
 * traffic also pollutes the dataset. Playwright Chromium and Firefox set
 * `navigator.webdriver` natively, so it is a reliable signal. Real users are
 * never gated.
 *
 * Callers that feed `useHead()` must gate the `useHead` call itself: it also
 * runs during SSR, where this helper is always `false`.
 */
export function isAutomationBrowser(): boolean {
  if (!import.meta.client) return false;
  return navigator.webdriver === true;
}
