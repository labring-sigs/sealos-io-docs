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
RUN npm config set python /usr/bin/python3

COPY . .
# Replace relative image paths with CDN URLs
RUN chmod +x ./scripts/replace-image-paths.sh && ./scripts/replace-image-paths.sh
RUN npm install && npm run build

FROM base AS runner
RUN apk add --no-cache curl cairo-dev \
    pango-dev \
    libjpeg-turbo \
    giflib-dev \
    librsvg-dev \
    build-base \
    python3 \
    pkgconf
ENV NODE_ENV=production
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs
WORKDIR /app
ENV npm_config_python=/usr/bin/python3

COPY ./package*.json ./
COPY ./next* ./
COPY ./postcss.config.js ./
COPY ./tsconfig.json ./
COPY ./source.config.ts ./

# Install only production dependencies
RUN npm ci --only=production && npm cache clean --force

# Copy built application
COPY --from=builder --chown=nextjs:nodejs /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next

USER nextjs

ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000

EXPOSE 3000

CMD ["npm", "start"]
