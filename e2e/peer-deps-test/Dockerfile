FROM node:24-alpine

WORKDIR /app

# Install npm and pastoralist
RUN npm install -g npm@latest pastoralist

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy test files
COPY . .

# Run tests
CMD ["npm", "test"]
