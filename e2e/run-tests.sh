#!/bin/bash

# Pastoralist E2E Tests Runner
# This script runs all e2e tests in Docker containers

set -e

echo "🐑 Starting Pastoralist E2E Tests"
echo "================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Detect docker compose command (legacy vs new)
if command -v docker-compose &> /dev/null; then
    DOCKER_COMPOSE="docker-compose"
elif docker compose version &> /dev/null; then
    DOCKER_COMPOSE="docker compose"
else
    echo -e "${RED}❌ Neither 'docker-compose' nor 'docker compose' found${NC}"
    exit 1
fi

echo "Using: $DOCKER_COMPOSE"

# Function to run a test scenario
run_test() {
    local test_name=$1
    echo -e "${YELLOW}Running $test_name tests...${NC}"
    
    if $DOCKER_COMPOSE run --rm $test_name; then
        echo -e "${GREEN}✅ $test_name tests passed${NC}"
        return 0
    else
        echo -e "${RED}❌ $test_name tests failed${NC}"
        return 1
    fi
}

# Build all images
echo "🔨 Building Docker images..."
$DOCKER_COMPOSE build

# Run all test scenarios
failed_tests=()

# Run NPM tests
if ! run_test "npm-test"; then
    failed_tests+=("npm-test")
fi

# Run Yarn tests
if ! run_test "yarn-test"; then
    failed_tests+=("yarn-test")
fi

# Run PNPM tests
if ! run_test "pnpm-test"; then
    failed_tests+=("pnpm-test")
fi

# Run Patches tests
if ! run_test "patches-test"; then
    failed_tests+=("patches-test")
fi

# Run Peer Dependencies tests
if ! run_test "peer-deps-test"; then
    failed_tests+=("peer-deps-test")
fi

# Run Monorepo tests
if ! run_test "monorepo-test"; then
    failed_tests+=("monorepo-test")
fi

# Run Bun tests
if ! run_test "bun-test"; then
    failed_tests+=("bun-test")
fi

if ! run_test "security-test"; then
    failed_tests+=("security-test")
fi
echo ""
echo "🐑 Test Results Summary"
echo "======================"

if [ ${#failed_tests[@]} -eq 0 ]; then
    echo -e "${GREEN}🎉 All tests passed!${NC}"
    exit 0
else
    echo -e "${RED}❌ Some tests failed:${NC}"
    for test in "${failed_tests[@]}"; do
        echo -e "${RED}  - $test${NC}"
    done
    exit 1
fi
