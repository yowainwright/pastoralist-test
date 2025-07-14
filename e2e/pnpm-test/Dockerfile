FROM node:24-alpine

WORKDIR /app

# Install pnpm
RUN npm install -g pnpm

# Copy and install local pastoralist package
COPY pastoralist-1.4.0-1.tgz ./
RUN npm install -g pastoralist-1.4.0-1.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN pnpm install

# Explicitly run postinstall to ensure pastoralist runs
RUN pnpm run postinstall

# Run tests
CMD ["pnpm", "test"]
