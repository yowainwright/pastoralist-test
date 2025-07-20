import { test, expect } from 'bun:test';
import fs from 'fs';
import { execSync } from 'child_process';

test('Bun test scenario', async () => {
  console.log('🐑 Running Bun test scenario...');

  // Check pastoralist execution
  const packageJsonPath = 'package.json';
  const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

  expect(packageJson.pastoralist).toBeDefined();
  expect(packageJson.pastoralist.appendix).toBeDefined();

  const appendix = packageJson.pastoralist.appendix;
  const expectedOverrides = ['follow-redirects@1.14.0', 'fast-deep-equal@3.1.1'];

  for (const override of expectedOverrides) {
    expect(appendix[override]).toBeDefined();
    expect(appendix[override].dependents).toBeDefined();
  }

  // Manual execution
  try {
    const output = execSync('bun run postinstall', { 
      encoding: 'utf8',
      stdio: 'pipe'
    });
    console.log('Pastoralist output:', output);
    expect(true).toBe(true); // Pastoralist should execute without errors
  } catch (error) {
    throw new Error(`Error running pastoralist: ${error.message}`);
  }

  console.log('🎉 All Bun tests passed!');
});

