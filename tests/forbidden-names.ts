import { createHash } from 'node:crypto';

// Unreleased and private products must never appear on the portfolio. This
// repo is public, so the names are stored only as SHA-256 hex digests of the
// lowercase word or hostname. Remove a digest only on the owner's word.
const FORBIDDEN_DIGESTS: ReadonlySet<string> = new Set([
  '43daf55a26ade264c25dfcd151281ce46940f5508a573b17b2ba18d4fe41f6f5',
  '7559a9a1a2623c9ec9bb334230a1005eaa7f4aebbf8fb9266313e49d57f84fea',
  '85d808232e01037fa6a8055cd090c1173854d72f6513f23ebcee6a3260d31660',
  '72165796b67119a7b57759b350a2663346c1cefbf4a17c88d9bbb2fe7f35d478',
  'e2520c990efb01e3dd6542f071a56d7b1c8eb66dad3da1e89db544c56ddee0cf',
]);

function sha256(value: string): string {
  return createHash('sha256').update(value).digest('hex');
}

// Every candidate in a dotted token: each label (word), plus each hostname
// suffix with two or more labels ("a.b.c" -> "a.b.c", "b.c").
function candidates(token: string): string[] {
  const labels = token.split('.').filter(Boolean);
  const suffixes = labels.slice(0, -1).map((_, i) => labels.slice(i).join('.'));
  return [...labels, ...suffixes];
}

// Returns the digests of forbidden names found in `text` (empty = clean).
// Digests, not names, so a failure message never prints the name either.
export function forbiddenNameDigests(text: string): string[] {
  const found = new Set<string>();
  for (const [token] of text
    .toLowerCase()
    .matchAll(/[a-z0-9-]+(?:\.[a-z0-9-]+)*/g)) {
    for (const candidate of candidates(token)) {
      const digest = sha256(candidate);
      if (FORBIDDEN_DIGESTS.has(digest)) found.add(digest);
    }
  }
  return [...found];
}
