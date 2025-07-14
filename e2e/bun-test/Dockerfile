FROM oven/bun:1.1-alpine

WORKDIR /app

# Install pastoralist globally
COPY pastoralist-1.4.0-1.tgz ./
RUN bun install -g pastoralist-1.4.0-1.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN bun install

# Explicitly run postinstall to ensure pastoralist runs
RUN bun run postinstall

# Run tests
CMD ["bun", "test"]
