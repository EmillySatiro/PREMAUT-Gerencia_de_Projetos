# Dockerfile para Next.js (frontend)

# Imagem base oficial Node.js
FROM node:20-alpine

# Diretório de trabalho
WORKDIR /app

# Copia os arquivos de dependências
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do código
COPY . .

# Build do projeto
RUN npm run build

# Expõe a porta padrão do Next.js
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]