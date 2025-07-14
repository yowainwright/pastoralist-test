import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Yarn test scenario', async (t) => {
  console.log('🐑 Running Yarn test scenario...');

  await t.test('pastoralist appendix generation with yarn', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.pastoralist, 'Pastoralist section should exist in package.json');
    assert.ok(packageJson.pastoralist.appendix, 'Pastoralist appendix should exist');
  });

  await t.test('resolutions tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const appendix = packageJson.pastoralist.appendix;
    const expectedResolutions = ['follow-redirects@1.14.0', 'cookie@0.5.0'];

    for (const resolution of expectedResolutions) {
      assert.ok(appendix[resolution], `Resolution ${resolution} should be found in appendix`);
      assert.ok(appendix[resolution].dependents, `Dependents should be tracked for ${resolution}`);
    }
  });

  await t.test('yarn specific dependency tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    const hasAxiosDependency = Object.keys(packageJson.dependencies || {}).includes('axios');
    const hasExpressDependency = Object.keys(packageJson.dependencies || {}).includes('express');

    assert.ok(hasAxiosDependency, 'Axios dependency should be found');
    assert.ok(hasExpressDependency, 'Express dependency should be found');
  });

  await t.test('resolutions are properly applied', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.resolutions, 'Resolutions section should exist');
    assert.strictEqual(packageJson.resolutions['follow-redirects'], '1.14.0', 'Follow-redirects resolution should be correct');
    assert.strictEqual(packageJson.resolutions.cookie, '0.5.0', 'Cookie resolution should be correct');
  });

  await t.test('manual pastoralist execution with yarn', async () => {
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

  console.log('🎉 All Yarn tests passed!');
});
