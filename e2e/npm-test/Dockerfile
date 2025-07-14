FROM node:24-alpine

WORKDIR /app

# Install npm
RUN npm install -g npm@latest

# Copy and install local pastoralist package
COPY pastoralist-1.4.0-1.tgz ./
RUN npm install -g pastoralist-1.4.0-1.tgz

# Copy all files first
COPY . .

# Install dependencies
RUN npm install

# Explicitly run postinstall to ensure pastoralist runs
RUN npm run postinstall

# Run tests
CMD ["npm", "test"]
