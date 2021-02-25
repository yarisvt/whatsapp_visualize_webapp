FROM node:14.16.0-alpine

WORKDIR '/app'

ENV PATH /app/node_modules/.bin:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install npm serve -g --silent
RUN npm install --silent

COPY . ./

RUN npm run build

EXPOSE 3000

CMD ["serve", "-s", "build", "-l", "3000"]
