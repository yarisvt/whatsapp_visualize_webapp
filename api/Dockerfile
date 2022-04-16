FROM node:16.14.2-alpine

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install npm -g --silent
RUN npm ci --only=production --silent

COPY . .

EXPOSE 5000

CMD ["node", "src/server.js"]