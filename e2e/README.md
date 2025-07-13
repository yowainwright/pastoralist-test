# Pastoralist E2E Tests

This directory contains comprehensive end-to-end tests for Pastoralist using Docker containers to ensure consistent testing environments.

## Test Scenarios

### 1. NPM Test (`npm-test/`)
- Tests basic NPM functionality with overrides
- Verifies appendix generation and dependency tracking
- Tests postinstall hook execution

### 2. Yarn Test (`yarn-test/`)
- Tests Yarn resolutions functionality
- Verifies Yarn-specific dependency management
- Tests with multiple dependencies

### 3. PNPM Test (`pnpm-test/`)
- Tests PNPM overrides functionality
- Verifies PNPM-specific dependency management
- Tests with more complex dependency trees

### 4. Patches Test (`patches-test/`)
- Tests automatic patch detection
- Verifies patch tracking in appendix
- Tests unused patch detection
- Includes sample patches for lodash, axios, and unused packages

### 5. Peer Dependencies Test (`peer-deps-test/`)
- Tests peerDependencies support
- Verifies peer dependencies are tracked separately
- Tests integration with overrides

### 6. Monorepo Test (`monorepo-test/`)
- Tests monorepo/workspace functionality
- Verifies cross-package dependency tracking
- Tests with npm workspaces structure

## Running Tests

### Run All Tests
```bash
cd e2e
./run-tests.sh
```

### Run Individual Test Scenarios
```bash
cd e2e

# Run specific test
docker-compose run --rm npm-test
docker-compose run --rm yarn-test
docker-compose run --rm pnpm-test
docker-compose run --rm patches-test
docker-compose run --rm peer-deps-test
docker-compose run --rm monorepo-test
```

### Build Images Only
```bash
cd e2e
docker-compose build
```

### Clean Up
```bash
cd e2e
docker-compose down
docker-compose down --volumes  # Also remove volumes
```

## Test Structure

Each test scenario includes:
- **Dockerfile**: Sets up Node.js 24 environment with appropriate package manager
- **package.json**: Defines dependencies, overrides/resolutions, and test scripts
- **test.js**: ESM test file using node:test and node:assert
- Additional files as needed (patches, workspace packages, etc.)

## Features Tested

- ✅ **Overrides/Resolutions**: NPM overrides, Yarn resolutions, PNPM overrides
- ✅ **Patch Detection**: Automatic detection of patch files
- ✅ **Patch Tracking**: Tracking patches in appendix
- ✅ **Unused Patch Detection**: Alerting about unused patches
- ✅ **Peer Dependencies**: Support for peerDependencies
- ✅ **Monorepo Support**: Workspace/monorepo functionality
- ✅ **Dependency Tracking**: All dependency types (dependencies, devDependencies, peerDependencies)
- ✅ **Appendix Generation**: Proper appendix creation and maintenance
- ✅ **Cross-package Dependencies**: Tracking dependencies across packages

## Requirements

- Docker
- Docker Compose
- The pastoralist package should be available at `../../..` (relative to e2e directory)

## Notes

- All tests use Node.js 24 and ESM modules
- Tests use the native node:test and node:assert modules
- Each test scenario runs in an isolated Docker container
- Tests are designed to be deterministic and repeatable
- The main pastoralist package is linked as `file:../../..` in each test scenario
