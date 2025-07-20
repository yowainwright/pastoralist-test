FROM node:24-alpine

WORKDIR /app

# Install latest pastoralist from npm
RUN npm install -g pastoralist

# Copy all files first
COPY . .

# Install dependencies
RUN yarn install

# Explicitly run postinstall to ensure pastoralist runs
RUN yarn postinstall

# Run tests
CMD ["yarn", "test"]
