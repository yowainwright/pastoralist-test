FROM node:24-alpine

WORKDIR /app

# Install pnpm and pastoralist
RUN npm install -g pnpm pastoralist@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN pnpm install

# Copy test files
COPY . .

# Run tests
CMD ["pnpm", "test"]
