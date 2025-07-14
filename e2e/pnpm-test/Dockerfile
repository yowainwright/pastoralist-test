FROM node:24-alpine

WORKDIR /app

# Install pnpm and pastoralist
RUN npm install -g pnpm pastoralist

# Copy all files first
COPY . .

# Install dependencies
RUN pnpm install

# Explicitly run postinstall to ensure pastoralist runs
RUN pnpm run postinstall

# Run tests
CMD ["pnpm", "test"]
