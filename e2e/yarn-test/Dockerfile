FROM node:24-alpine

WORKDIR /app

# Install pastoralist (yarn is already installed)
RUN npm install -g pastoralist@latest

# Copy package files
COPY package*.json ./

# Install dependencies
RUN yarn install

# Copy test files
COPY . .

# Run tests
CMD ["yarn", "test"]
