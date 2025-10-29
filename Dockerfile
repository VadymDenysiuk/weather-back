FROM node:20-alpine AS deps
WORKDIR /app
COPY package*.json ./
RUN npm ci

FROM deps AS build
WORKDIR /app
COPY . .
RUN npx tsc -p tsconfig.build.json

FROM node:20-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production PORT=8080
COPY package*.json ./
RUN npm ci --omit=dev

# важливо: кладемо runtime-конфіг
COPY tsconfig.runtime.json ./tsconfig.json
COPY --from=build /app/dist ./dist

EXPOSE 8080
CMD ["node", "-r", "tsconfig-paths/register", "dist/main.js"]
