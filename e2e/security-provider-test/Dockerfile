FROM node:18-alpine

WORKDIR /app

# Copy test files
COPY package.json test.js ./

# Install git for repository tests
RUN apk add --no-cache git

# Link local pastoralist
COPY --from=pastoralist /app /pastoralist
RUN npm link /pastoralist

CMD ["npm", "test"]