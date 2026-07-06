// Dynamic OG image generation for vinayakkulkarni.dev
// Uses @cf-wasm/og/workerd — only works on Cloudflare Workers, not Node.js dev

// Satori element helper — plain JS objects, no React.
// Satori requires display:flex on divs with 2+ children, and chokes on children:[].
function el(
  type: string,
  style: Record<string, unknown>,
  ...children: unknown[]
) {
  const flat = children.flat().filter((c) => c != null && c !== false);
  const props: Record<string, unknown> = { style };
  if (flat.length === 1 && typeof flat[0] === 'string') {
    props.children = flat[0];
  } else if (flat.length > 0) {
    props.children = flat;
  }
  return { type, props };
}

// A scatter of stars for the deep-space backdrop (GIS/cartography + starfield brand).
// Deterministic positions so the card is stable across renders and cache-friendly.
const stars = [
  { top: '38px', left: '120px', size: '3px', opacity: 0.8 },
  { top: '92px', left: '340px', size: '2px', opacity: 0.5 },
  { top: '64px', left: '560px', size: '2px', opacity: 0.6 },
  { top: '140px', left: '760px', size: '3px', opacity: 0.7 },
  { top: '48px', left: '980px', size: '2px', opacity: 0.5 },
  { top: '210px', left: '180px', size: '2px', opacity: 0.4 },
  { top: '300px', left: '1080px', size: '3px', opacity: 0.6 },
  { top: '470px', left: '90px', size: '2px', opacity: 0.5 },
  { top: '520px', left: '420px', size: '2px', opacity: 0.45 },
  { top: '560px', left: '900px', size: '3px', opacity: 0.7 },
  { top: '440px', left: '1120px', size: '2px', opacity: 0.5 },
  { top: '250px', left: '650px', size: '2px', opacity: 0.4 },
];

export default defineEventHandler(async (event: H3Event) => {
  const query = getQuery(event);

  const title = (query.title as string) || 'Vinayak Kulkarni';
  const description =
    (query.description as string) ||
    'GIS Engineer & Co-Founder building geospatial infrastructure.';

  const element = el(
    'div',
    {
      display: 'flex',
      flexDirection: 'column',
      width: '100%',
      height: '100%',
      background:
        'radial-gradient(120% 120% at 15% 0%, #10182a 0%, #0a0e1a 45%, #060810 100%)',
      fontFamily: 'sans-serif',
      position: 'relative',
      overflow: 'hidden',
    },
    // Deep-space star field
    ...stars.map((s) =>
      el('div', {
        position: 'absolute',
        top: s.top,
        left: s.left,
        width: s.size,
        height: s.size,
        borderRadius: '50%',
        backgroundColor: `rgba(226,232,240,${s.opacity})`,
      }),
    ),
    // Aurora-teal glow top-right (the maps / starfield accent)
    el('div', {
      position: 'absolute',
      top: '-120px',
      right: '-80px',
      width: '420px',
      height: '420px',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, rgba(45,212,191,0.18) 0%, transparent 70%)',
    }),
    // Faint indigo glow bottom-left
    el('div', {
      position: 'absolute',
      bottom: '-140px',
      left: '-60px',
      width: '460px',
      height: '460px',
      borderRadius: '50%',
      background:
        'radial-gradient(circle, rgba(99,102,241,0.14) 0%, transparent 70%)',
    }),
    // Latitude/longitude graticule — the cartographer signature
    el('div', {
      position: 'absolute',
      top: '0',
      left: '0',
      width: '100%',
      height: '100%',
      backgroundImage:
        'linear-gradient(rgba(45,212,191,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(45,212,191,0.04) 1px, transparent 1px)',
      backgroundSize: '72px 72px',
    }),
    // Left accent bar
    el('div', {
      position: 'absolute',
      top: '64px',
      left: '0',
      width: '4px',
      height: '128px',
      borderRadius: '0 4px 4px 0',
      background: 'linear-gradient(180deg, #2dd4bf, #6366f1, transparent)',
    }),
    // Content layer
    el(
      'div',
      {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: '100%',
        height: '100%',
        padding: '60px 64px',
        position: 'relative',
      },
      // Badge
      el(
        'div',
        { display: 'flex', alignItems: 'center', gap: '12px' },
        el(
          'div',
          {
            display: 'flex',
            alignItems: 'center',
            padding: '6px 18px',
            backgroundColor: 'rgba(45,212,191,0.1)',
            border: '1px solid rgba(45,212,191,0.3)',
            borderRadius: '9999px',
            fontSize: '14px',
            fontWeight: 600,
            color: '#2dd4bf',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
          },
          'GIS Engineer · Cartographer',
        ),
      ),
      // Title + Description
      el(
        'div',
        { display: 'flex', flexDirection: 'column', gap: '20px' },
        el(
          'div',
          {
            fontSize: title.length > 42 ? '52px' : '64px',
            fontWeight: 800,
            color: '#f8fafc',
            lineHeight: 1.05,
            letterSpacing: '-0.035em',
          },
          title,
        ),
        ...(description
          ? [
              el(
                'div',
                {
                  fontSize: '24px',
                  color: '#94a3b8',
                  lineHeight: 1.4,
                  maxWidth: '860px',
                },
                description,
              ),
            ]
          : []),
      ),
      // Branding footer
      el(
        'div',
        {
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        },
        el(
          'div',
          { display: 'flex', alignItems: 'center', gap: '16px' },
          el(
            'div',
            {
              fontSize: '30px',
              fontWeight: 700,
              color: '#f8fafc',
              letterSpacing: '-0.02em',
            },
            'Vinayak Kulkarni',
          ),
          el('div', {
            width: '5px',
            height: '5px',
            borderRadius: '50%',
            backgroundColor: '#2dd4bf',
          }),
          el(
            'div',
            {
              fontSize: '15px',
              fontWeight: 500,
              color: '#64748b',
              letterSpacing: '0.02em',
            },
            'MapLibre · Planetiler · PMTiles · Vue',
          ),
        ),
        el(
          'div',
          { fontSize: '18px', color: '#64748b', fontWeight: 500 },
          'vinayakkulkarni.dev',
        ),
      ),
    ),
  );

  try {
    const { ImageResponse } = await import('@cf-wasm/og/workerd');
    const response = await ImageResponse.async(element, {
      width: 1200,
      height: 630,
    });

    const buffer = await response.arrayBuffer();

    setResponseHeaders(event, {
      'Content-Type': 'image/png',
      'Cache-Control': 'public, max-age=31536000, s-maxage=31536000, immutable',
    });

    return Buffer.from(buffer);
  } catch (err) {
    throw createError({
      statusCode: 500,
      message: `OG generation failed: ${err instanceof Error ? err.message : String(err)}`,
    });
  }
});
