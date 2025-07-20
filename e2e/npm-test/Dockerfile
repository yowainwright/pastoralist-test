FROM node:24-alpine

WORKDIR /app

# Install npm and pastoralist
RUN npm install -g npm@latest pastoralist

# Copy all files first
COPY . .

# Install dependencies
RUN npm install

# Explicitly run postinstall to ensure pastoralist runs
RUN npm run postinstall

# Run tests
CMD ["npm", "test"]
