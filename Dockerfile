FROM node:20-alpine AS base

FROM base AS builder
RUN apk add --no-cache \
    libc6-compat \
    git \
    build-base \
    python3 \
    pkgconf \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev \
    librsvg-dev \
    freetype-dev \
    harfbuzz-dev \
    fribidi-dev \
    udev \
    ttf-opensans \
    fontconfig \
    curl
WORKDIR /app
ENV npm_config_python=/usr/bin/python3

ARG NEXT_PUBLIC_APP_URL
ARG NEXT_PUBLIC_OPEN_SOURCE_URL
ARG NEXT_PUBLIC_DEFAULT_LOCALE

ENV NEXT_PUBLIC_APP_URL=$NEXT_PUBLIC_APP_URL
ENV NEXT_PUBLIC_OPEN_SOURCE_URL=$NEXT_PUBLIC_OPEN_SOURCE_URL
ENV NEXT_PUBLIC_DEFAULT_LOCALE=$NEXT_PUBLIC_DEFAULT_LOCALE
ENV NEXT_TELEMETRY_DISABLED=1
ENV DOCKER_BUILD=true

COPY . .
# Replace relative image paths with CDN URLs
RUN chmod +x ./scripts/replace-image-paths.sh && ./scripts/replace-image-paths.sh
RUN npm install && npm run build
# Remove development dependencies to reduce final image size
RUN npm prune --production

FROM base AS runner
# Runtime libraries for canvas and image processing support
RUN apk add --no-cache curl \
    cairo \
    pango \
    libjpeg-turbo \
    giflib \
    librsvg \
    fontconfig \
    freetype \
    harfbuzz \
    fribidi
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
WORKDIR /app

# Copy built application and node_modules from builder
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder --chown=nextjs:nodejs /app/node_modules ./node_modules
COPY --from=builder --chown=nextjs:nodejs /app/package.json ./package.json

USER nextjs

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
