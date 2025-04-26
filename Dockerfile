FROM node:20-alpine AS base

FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package*.json ./
RUN npm ci

FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCU687LeYH-480qcPia30RKcio48szfHek
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flipcards-448722.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=flipcards-448722
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flipcards-448722.appspot.com
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=356140602370
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:356140602370:web:ae7ddab5d7254b7dc7831b


RUN npm run build

FROM base AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyCU687LeYH-480qcPia30RKcio48szfHek
ENV NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=flipcards-448722.firebaseapp.com
ENV NEXT_PUBLIC_FIREBASE_PROJECT_ID=flipcards-448722
ENV NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=flipcards-448722.appspot.com
ENV NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=356140602370
ENV NEXT_PUBLIC_FIREBASE_APP_ID=1:356140602370:web:ae7ddab5d7254b7dc7831b

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 101 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

USER nextjs
EXPOSE 8080

ENV PORT 8080

CMD ["npm", "start"]
