import type { H3Event } from 'h3';
import { OpenPanel } from '@openpanel/sdk';

/**
 * Server-side OpenPanel tracker. The Nuxt module's SDK is client-only, so
 * server code talks to the self-hosted instance directly via @openpanel/sdk,
 * authenticated with the private clientSecret. The SDK retries and logs its
 * own failures, so this never rejects. On Cloudflare Workers, pass the
 * returned promise to `event.waitUntil` or the isolate drops the request.
 */
export async function trackOpenPanelEvent(
  event: H3Event,
  name: string,
  properties?: Record<string, unknown>,
): Promise<void> {
  const { clientId, clientSecret } = useRuntimeConfig(event).openpanel;

  if (!clientId || !clientSecret) {
    return;
  }

  const op = new OpenPanel({
    clientId,
    clientSecret,
    apiUrl: 'https://events.geoql.in/api',
    sdk: 'node',
  });

  await op.track(name, properties);
}
