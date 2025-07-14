FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy and build pastoralist from source
COPY ../../pastoralist ./pastoralist-src
RUN cd pastoralist-src && npm ci && npm pack
RUN npm install -g ./pastoralist-src/pastoralist-*.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN pnpm install

# Explicitly run postinstall to ensure pastoralist runs
RUN pnpm run postinstall

# Run tests
CMD ["pnpm", "test"]
