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
    const expectedOverrides = ['follow-redirects@1.14.0', 'cookie@0.5.0', 'bytes@3.1.0'];

    for (const override of expectedOverrides) {
      assert.ok(appendix[override], `Override ${override} should be found in appendix`);
      assert.ok(appendix[override].dependents, `Dependents should be tracked for ${override}`);
    }
  });

  await t.test('pnpm specific dependency tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasAxiosDependency = Object.keys(packageJson.dependencies || {}).includes('axios');
    const hasExpressDependency = Object.keys(packageJson.dependencies || {}).includes('express');
    const hasBodyParserDependency = Object.keys(packageJson.dependencies || {}).includes('body-parser');

    assert.ok(hasAxiosDependency, 'Axios dependency should be found');
    assert.ok(hasExpressDependency, 'Express dependency should be found');
    assert.ok(hasBodyParserDependency, 'Body-parser dependency should be found');
  });

  await t.test('pnpm overrides are properly applied', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.pnpm, 'PNPM section should exist');
    assert.ok(packageJson.pnpm.overrides, 'PNPM overrides section should exist');
    assert.strictEqual(packageJson.pnpm.overrides['follow-redirects'], '1.14.0', 'Follow-redirects override should be correct');
    assert.strictEqual(packageJson.pnpm.overrides.cookie, '0.5.0', 'Cookie override should be correct');
    assert.strictEqual(packageJson.pnpm.overrides.bytes, '3.1.0', 'Bytes override should be correct');
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
