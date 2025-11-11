FROM node:22-alpine AS deps

WORKDIR /app

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN if [ -f pnpm-lock.yaml ]; then \
      pnpm install --frozen-lockfile; \
    else \
      pnpm install --no-frozen-lockfile; \
    fi

#
FROM deps AS prisma-builder

COPY prisma ./prisma

RUN npx prisma generate

#
FROM prisma-builder AS app-builder

COPY src ./src
COPY tsconfig.json ./tsconfig.json

RUN pnpm build


# ------------------------------
# Runner stage (distroless)
# ------------------------------
FROM node:22-alpine AS runner
# FROM gcr.io/distroless/nodejs22-debian12:nonroot AS runner

WORKDIR /app

ENV NODE_ENV=production

COPY --from=prisma-builder /app/prisma ./prisma
COPY --from=app-builder /app/dist ./dist
COPY --from=app-builder /app/node_modules ./dist/node_modules

CMD ["node", "dist/main.js"]