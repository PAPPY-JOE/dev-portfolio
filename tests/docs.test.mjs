import test from 'node:test';
import assert from 'node:assert/strict';
import { verifyRecords } from '../scripts/check-docs.mjs';

test('documentation gate rejects a missing journal or incomplete dated record', () => {
  assert.throws(() => verifyRecords([]));
  assert.throws(() => verifyRecords(['docs/PROJECT_JOURNAL.md']));
  assert.throws(() => verifyRecords(['docs/PROJECT_JOURNAL.md', 'docs/changes/2026-11-01-test.md'], () => '## Date\n2026-11-01'));
});
test('documentation gate accepts a complete record', () => {
  const content = ['Date', 'Change', 'Why', 'Tests', 'Screenshots', 'Unresolved issues', 'Review and merge outcome'].map(heading => `## ${heading}\nRecorded evidence.\n`).join('\n');
  assert.doesNotThrow(() => verifyRecords(['docs/PROJECT_JOURNAL.md', 'docs/changes/2026-11-01-test.md'], () => content));
});
