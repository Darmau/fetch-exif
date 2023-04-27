FROM node:lts-slim
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 1216
CMD ["npm", "start"]