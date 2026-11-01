import { execFileSync } from 'node:child_process';
import { readFileSync } from 'node:fs';

export function verifyRecords(files, read = path => readFileSync(path, 'utf8')) {
  if (!files.includes('docs/PROJECT_JOURNAL.md')) throw new Error('Every PR must update docs/PROJECT_JOURNAL.md.');
  const records = files.filter(path => /^docs\/changes\/\d{4}-\d{2}-\d{2}-.+\.md$/.test(path));
  if (!records.length) throw new Error('Add or update a dated docs/changes/YYYY-MM-DD-topic.md record.');
  for (const path of records) {
    const content = read(path);
    for (const heading of ['Date', 'Change', 'Why', 'Tests', 'Screenshots', 'Unresolved issues', 'Review and merge outcome']) {
      const escaped = heading.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      const match = content.match(new RegExp('^## ' + escaped + '\\r?\\n([\\s\\S]*?)(?=^## |$(?![\\s\\S]))', 'm'));
      if (!match?.[1].trim() || /^(TODO|TBD)\b/.test(match[1].trim())) throw new Error(`${path}: complete the ${heading} section.`);
    }
  }
}
if (process.argv[1]?.replaceAll('\\', '/').endsWith('/check-docs.mjs')) {
  const base = process.env.PR_BASE_SHA;
  if (!/^[a-f0-9]{40}$/.test(base || '')) throw new Error('PR_BASE_SHA must be the verified base commit.');
  const files = execFileSync('git', ['diff', '--name-only', '--diff-filter=AM', base, 'HEAD'], { encoding: 'utf8' }).trim().split(/\r?\n/);
  verifyRecords(files);
  console.log('PR journal and dated change record verified.');
}
