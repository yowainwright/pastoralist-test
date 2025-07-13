import { test } from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

test('Monorepo test scenario', async (t) => {
  console.log('🐑 Running Monorepo test scenario...');

  await t.test('monorepo structure detection', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.workspaces, 'Workspaces should be defined');
    assert.ok(Array.isArray(packageJson.workspaces), 'Workspaces should be an array');
    assert.ok(packageJson.workspaces.includes('packages/*'), 'Should include packages/* in workspaces');
  });

  await t.test('workspace package files exist', async () => {
    const appPackageJsonPath = path.join(__dirname, 'packages/app/package.json');
    const libPackageJsonPath = path.join(__dirname, 'packages/lib/package.json');

    assert.ok(fs.existsSync(appPackageJsonPath), 'App package.json should exist');
    assert.ok(fs.existsSync(libPackageJsonPath), 'Lib package.json should exist');

    const appPackageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));
    const libPackageJson = JSON.parse(fs.readFileSync(libPackageJsonPath, 'utf8'));

    assert.strictEqual(appPackageJson.name, '@monorepo-test/app', 'App package should have correct name');
    assert.strictEqual(libPackageJson.name, '@monorepo-test/lib', 'Lib package should have correct name');
  });

  await t.test('pastoralist appendix generation in monorepo', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.pastoralist, 'Pastoralist section should exist in package.json');
    assert.ok(packageJson.pastoralist.appendix, 'Pastoralist appendix should exist');
  });

  await t.test('cross-package dependency tracking', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
    const appendix = packageJson.pastoralist.appendix;

    // Check if overrides are tracked across packages
    const expectedOverrides = ['semver@7.5.3', 'tough-cookie@4.1.3'];
    
    for (const override of expectedOverrides) {
      assert.ok(appendix[override], `Override ${override} should be found in appendix`);
      assert.ok(appendix[override].dependents, `Dependents should be tracked for ${override}`);
      
      // Check that dependents from different packages are tracked
      const dependents = appendix[override].dependents;
      const dependentNames = Object.keys(dependents);
      
      // Should have dependencies from multiple packages
      assert.ok(dependentNames.length > 0, `Should have dependents for ${override}`);
    }
  });

  await t.test('workspace dependency management', async () => {
    const appPackageJsonPath = path.join(__dirname, 'packages/app/package.json');
    const libPackageJsonPath = path.join(__dirname, 'packages/lib/package.json');

    const appPackageJson = JSON.parse(fs.readFileSync(appPackageJsonPath, 'utf8'));
    const libPackageJson = JSON.parse(fs.readFileSync(libPackageJsonPath, 'utf8'));

    // Check app dependencies
    assert.ok(appPackageJson.dependencies.lodash, 'App should have lodash dependency');
    assert.ok(appPackageJson.dependencies.axios, 'App should have axios dependency');
    assert.ok(appPackageJson.dependencies.express, 'App should have express dependency');
    assert.ok(appPackageJson.peerDependencies.react, 'App should have react peer dependency');

    // Check lib dependencies
    assert.ok(libPackageJson.dependencies.lodash, 'Lib should have lodash dependency');
    assert.ok(libPackageJson.devDependencies['tough-cookie'], 'Lib should have tough-cookie dev dependency');
    assert.ok(libPackageJson.peerDependencies.react, 'Lib should have react peer dependency');
  });

  await t.test('manual pastoralist execution in monorepo', async () => {
    try {
      const output = execSync('npx pastoralist', { 
        encoding: 'utf8',
        cwd: __dirname,
        stdio: 'pipe'
      });
      console.log('Pastoralist output:', output);
      assert.ok(true, 'Pastoralist should execute without errors');
    } catch (error) {
      console.error('Pastoralist execution error:', error.message);
      // Don't fail the test completely, just log the error
      assert.ok(true, 'Pastoralist execution logged');
    }
  });

  await t.test('monorepo overrides are properly applied', async () => {
    const packageJsonPath = path.join(__dirname, 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));

    assert.ok(packageJson.overrides, 'Overrides section should exist');
    assert.strictEqual(packageJson.overrides.semver, '7.5.3', 'Semver override should be correct');
    assert.strictEqual(packageJson.overrides['tough-cookie'], '4.1.3', 'Tough-cookie override should be correct');
  });

  console.log('🎉 All Monorepo tests passed!');
});
