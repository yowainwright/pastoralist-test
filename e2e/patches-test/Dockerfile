FROM node:24-alpine

WORKDIR /app

# Install npm, patch-package, and pastoralist
RUN npm install -g npm@latest patch-package pastoralist@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test files and patches
COPY . .

# Run tests
CMD ["npm", "test"]
