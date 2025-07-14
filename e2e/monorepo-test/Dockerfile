FROM node:24-alpine

WORKDIR /app

# Install npm
RUN npm install -g npm@latest

# Copy and build pastoralist from source
COPY ../../pastoralist ./pastoralist-src
RUN cd pastoralist-src && npm ci && npm pack
RUN npm install -g ./pastoralist-src/pastoralist-*.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN npm install

# Explicitly run postinstall to ensure pastoralist runs
RUN npm run postinstall

# Run tests
CMD ["npm", "test"]
