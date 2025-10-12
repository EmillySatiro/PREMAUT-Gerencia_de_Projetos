# Dockerfile - Backend (Produção)
FROM node:22-alpine AS builder

WORKDIR /app

# Copia package.json e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante do código e builda
COPY . .
RUN npm run build

# --- Runner final ---
FROM node:22-alpine AS runner
WORKDIR /app

# Copia apenas o necessário do builder
COPY --from=builder /app/package*.json ./
RUN npm install --omit=dev

COPY --from=builder /app/dist ./dist

EXPOSE 3001
ENV TZ=America/Sao_Paulo

CMD ["node", "dist/index.js"]
