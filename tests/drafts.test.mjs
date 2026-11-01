import test from 'node:test';
import assert from 'node:assert/strict';
import { withPortfolioDrafts } from '../src/data/portfolioDrafts.ts';

test('Firebase content retains existing work and gains missing hidden drafts', () => {
  const existing = { id: 'existing', title: 'Existing', published: true };
  const input = { hero: { name: 'CMS name' }, projects: [existing] };
  const merged = withPortfolioDrafts(input);
  assert.equal(merged.hero, input.hero);
  assert.equal(merged.projects[0], existing);
  assert.equal(merged.projects.length, 4);
  assert.deepEqual(merged.projects.filter(p => p.published), [existing]);
  assert.equal(input.projects.length, 1);
  assert.deepEqual(withPortfolioDrafts(merged), merged);
});

test('CMS cannot accidentally publish protected drafts', () => {
  const result = withPortfolioDrafts({ projects: [{ id: 'i2-draft', title: 'Edited', published: true }] });
  assert.equal(result.projects[0].title, 'Edited');
  assert.equal(result.projects[0].published, false);
  assert.equal(result.projects.length, 3);
});
