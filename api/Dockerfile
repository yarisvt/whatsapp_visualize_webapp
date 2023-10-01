FROM node:18.18.0-alpine

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install npm -g --silent
RUN npm ci --only=production --silent

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]