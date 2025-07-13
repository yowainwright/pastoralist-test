FROM node:24-alpine

WORKDIR /app

# Install npm and pastoralist
RUN npm install -g npm@latest pastoralist@latest

# Copy package files
COPY package*.json ./
COPY packages/app/package*.json ./packages/app/
COPY packages/lib/package*.json ./packages/lib/

# Install dependencies
RUN npm install

# Copy test files
COPY . .

# Run tests
CMD ["npm", "test"]
