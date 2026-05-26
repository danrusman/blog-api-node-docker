# 1. Usa uma imagem leve do Node
FROM node:18-alpine

# 2. Cria a pasta da aplicação dentro do container
WORKDIR /app

# 3. Copia apenas os arquivos de dependências primeiro (otimiza o cache)
COPY package*.json ./

# 4. Instala as bibliotecas
RUN npm install

# 5. Copia todo o restante do seu código (src, rotas, etc)
COPY . .

# 6. Informa que a app usa a porta 3000
EXPOSE 3000

# 7. Comando para ligar o servidor
CMD ["npm", "start"]
