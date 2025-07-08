# Multi-stage build for Node.js backend
FROM node:18-alpine AS base

# Install security updates and necessary packages
RUN apk update && apk upgrade && apk add --no-cache dumb-init

# Create app directory
WORKDIR /app

# Create non-root user
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodeuser -u 1001

# Copy package files
COPY package*.json ./

# Install dependencies
FROM base AS deps
RUN npm ci --only=production && npm cache clean --force

# Copy source code
FROM base AS runner
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Create uploads directory and set permissions
RUN mkdir -p uploads && \
    chown -R nodeuser:nodejs . && \
    chmod -R 755 .

# Switch to non-root user
USER nodeuser

# Expose port
EXPOSE 3001

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:3001/health || exit 1

# Use dumb-init to handle signals properly
ENTRYPOINT ["dumb-init", "--"]

# Start the application
CMD ["npm", "start"]