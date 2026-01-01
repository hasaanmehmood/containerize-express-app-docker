# ---------- Build stage ----------
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./

# Install ALL deps (including dev) for build
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

# ---------- Runtime stage ----------
FROM gcr.io/distroless/nodejs18

WORKDIR /app

# Copy only production deps
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/dist ./dist

ENV PORT=3000
EXPOSE 3000

# distroless already has node as entrypoint
CMD ["dist/index.js"]
