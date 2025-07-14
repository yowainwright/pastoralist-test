FROM node:24-alpine

WORKDIR /app

# Install npm and patch-package
RUN npm install -g npm@latest patch-package

# Copy and install local pastoralist package
COPY pastoralist-1.4.0-1.tgz ./
RUN npm install -g pastoralist-1.4.0-1.tgz

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test files and patches
COPY . .

# Run tests
CMD ["npm", "test"]
