import { run } from 'bun:test';
import assert from 'node:assert';
import fs from 'fs';
import { execSync } from 'child_process';

run('Bun test scenario', async () => {
  console.log('🐑 Running Bun test scenario...');

  // Check pastoralist execution
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  assert.ok(packageJson.pastoralist, 'Pastoralist section should exist in package.json');
  assert.ok(packageJson.pastoralist.appendix, 'Pastoralist appendix should exist');

  const appendix = packageJson.pastoralist.appendix;
  const expectedOverrides = ['follow-redirects@1.14.0', 'fast-deep-equal@3.1.1'];

  for (const override of expectedOverrides) {
    assert.ok(appendix[override], `Override ${override} should be found in appendix`);
    assert.ok(appendix[override].dependents, `Dependents should be tracked for ${override}`);
  }

  // Manual execution
  try {
    const output = execSync('bun run postinstall', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log('Pastoralist output:', output);
    assert.ok(true, 'Pastoralist should execute without errors');
  } catch (error) {
    assert.fail(`Error running pastoralist: ${error.message}`);
  }

  console.log('🎉 All Bun tests passed!');
});

