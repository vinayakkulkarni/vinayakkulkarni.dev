import { createHash } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('..', import.meta.url));
const indexPath = join(root, 'public/.well-known/agent-skills/index.json');

const index = JSON.parse(await readFile(indexPath, 'utf-8'));

let failed = false;

for (const skill of index.skills) {
  const url = new URL(skill.url);
  const artifactPath = join(root, 'public', url.pathname);
  const bytes = await readFile(artifactPath);
  const actual = `sha256:${createHash('sha256').update(bytes).digest('hex')}`;
  const ok = actual === skill.digest;
  console.log(`${ok ? 'OK ' : 'DRIFT'} ${skill.name}`);
  if (!ok) {
    console.log(`  index:   ${skill.digest}`);
    console.log(`  artifact:${actual}`);
    failed = true;
  }
}

if (failed) {
  console.error(
    'Digest drift detected. Format the SKILL.md first, then re-run `shasum -a 256` and update index.json.',
  );
  process.exit(1);
}
console.log(`All ${index.skills.length} skill digests match.`);
