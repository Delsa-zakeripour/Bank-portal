# ───────── Stage 1: builder ─────────
FROM node:24-alpine AS builder

WORKDIR /app

# Dependency manifests first so the npm ci layer stays cached until they change
COPY package.json package-lock.json ./
RUN npm ci

COPY . .

RUN npx prisma generate

# Placeholder values: next build only checks these exist; real values are passed at runtime
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV AUTH_SECRET="build-time-not-real"

RUN npm run build

# ───────── Stage 2: runner ─────────
FROM node:24-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

# Standalone server with only the traced node_modules
COPY --from=builder /app/.next/standalone ./
# Static assets are not included in standalone output
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

USER node

EXPOSE 3000

CMD ["node", "server.js"]
