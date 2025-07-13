import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('PNPM test scenario', async (t) => {
  console.log('🐑 Running PNPM test scenario...');

  await t.test('pastoralist appendix generation with pnpm', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.pastoralist, 'Pastoralist section should exist in package.json');
    assert.ok(packageJson.pastoralist.appendix, 'Pastoralist appendix should exist');
  });

  await t.test('pnpm overrides tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const appendix = packageJson.pastoralist.appendix;
    const expectedOverrides = ['semver@7.5.3', 'tough-cookie@4.1.3'];

    for (const override of expectedOverrides) {
      assert.ok(appendix[override], `Override ${override} should be found in appendix`);
      assert.ok(appendix[override].dependents, `Dependents should be tracked for ${override}`);
    }
  });

  await t.test('pnpm specific dependency tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasLodashDependency = Object.keys(packageJson.dependencies || {}).includes('lodash');
    const hasAxiosDependency = Object.keys(packageJson.dependencies || {}).includes('axios');
    const hasExpressDependency = Object.keys(packageJson.dependencies || {}).includes('express');

    assert.ok(hasLodashDependency, 'Lodash dependency should be found');
    assert.ok(hasAxiosDependency, 'Axios dependency should be found');
    assert.ok(hasExpressDependency, 'Express dependency should be found');
  });

  await t.test('pnpm overrides are properly applied', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.pnpm, 'PNPM section should exist');
    assert.ok(packageJson.pnpm.overrides, 'PNPM overrides section should exist');
    assert.strictEqual(packageJson.pnpm.overrides.semver, '7.5.3', 'Semver override should be correct');
    assert.strictEqual(packageJson.pnpm.overrides['tough-cookie'], '4.1.3', 'Tough-cookie override should be correct');
  });

  await t.test('manual pastoralist execution with pnpm', async () => {
    try {
      const output = execSync('npx pastoralist', { 
        encoding: 'utf8',
        cwd: __dirname,
        stdio: 'pipe'
      });
      console.log('Pastoralist output:', output);
      assert.ok(true, 'Pastoralist should execute without errors');
    } catch (error) {
      assert.fail(`Error running pastoralist: ${error.message}`);
    }
  });

  console.log('🎉 All PNPM tests passed!');
});
