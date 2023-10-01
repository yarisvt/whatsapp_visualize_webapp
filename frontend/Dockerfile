FROM node:18.18.0-alpine

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN npm install npm serve -g --silent
RUN npm ci --omit=dev --silent

COPY . .

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
