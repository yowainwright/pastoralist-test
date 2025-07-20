FROM oven/bun:1.1-alpine

WORKDIR /app

# Install pastoralist from npm using bun
RUN bun install -g pastoralist

# Copy all files first
COPY . .

# Install dependencies
RUN bun install

# Explicitly run postinstall to ensure pastoralist runs
RUN bun run postinstall

# Run tests
CMD ["bun", "test"]
