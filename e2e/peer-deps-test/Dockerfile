FROM node:24-alpine

WORKDIR /app

# Install npm
RUN npm install -g npm@latest

# Copy and build pastoralist from source
COPY ../../pastoralist ./pastoralist-src
RUN cd pastoralist-src && npm ci && npm pack
RUN npm install -g ./pastoralist-src/pastoralist-*.tgz

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test files
COPY . .

# Run tests
CMD ["npm", "test"]
