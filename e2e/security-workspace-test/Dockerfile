FROM node:24-alpine

WORKDIR /app

RUN apk add --no-cache git
RUN npm install -g npm@latest pastoralist pnpm

COPY . .

RUN pnpm install

RUN npm run postinstall

CMD ["npm", "test"]