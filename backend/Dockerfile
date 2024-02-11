## Dependencies
FROM node:20-alpine as dependencies
WORKDIR /home/app
COPY package*.json ./
COPY tsconfig.json ./
RUN npm ci

## Builder
FROM node:20-alpine as builder
WORKDIR /home/app
COPY --from=dependencies /home/app/node_modules ./node_modules
COPY . .
RUN npm run build

## Runner
FROM node:20-alpine AS runner
WORKDIR /home/app
COPY --from=builder /home/app/node_modules ./node_modules
COPY --from=builder /home/app/dist ./dist
EXPOSE 5000
CMD ["node", "dist/src/main.js"]