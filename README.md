# pastoralist-test

A comprehensive testing repository for [Pastoralist](https://github.com/yowainwright/pastoralist) to ensure it works correctly across different scenarios and package managers.

## E2E Tests

This repository includes comprehensive end-to-end tests using Docker containers to test Pastoralist across different scenarios:

### Test Scenarios

- **NPM Test**: Tests basic NPM functionality with overrides
- **Yarn Test**: Tests Yarn resolutions functionality  
- **PNPM Test**: Tests PNPM overrides functionality
- **Patches Test**: Tests automatic patch detection and tracking
- **Peer Dependencies Test**: Tests peerDependencies support
- **Monorepo Test**: Tests monorepo/workspace functionality

### Running Tests

```bash
# Run all e2e tests
npm run test:e2e

# Run individual test scenarios
npm run test:e2e:npm
npm run test:e2e:yarn
npm run test:e2e:pnpm
npm run test:e2e:patches
npm run test:e2e:peer-deps
npm run test:e2e:monorepo
```

### Features Tested

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
- Node.js 24 (for local development)

See [e2e/README.md](e2e/README.md) for detailed test documentation.
