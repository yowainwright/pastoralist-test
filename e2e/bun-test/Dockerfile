FROM oven/bun:1.1-alpine

WORKDIR /app

# Copy and build pastoralist from source
COPY ../../pastoralist ./pastoralist-src
RUN cd pastoralist-src && npm ci && npm pack
RUN npm install -g ./pastoralist-src/pastoralist-*.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN bun install

# Explicitly run postinstall to ensure pastoralist runs
RUN bun run postinstall

# Run tests
CMD ["bun", "test"]
