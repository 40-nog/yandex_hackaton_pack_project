FROM node:14.17.0-alpine

WORKDIR /app

COPY package.json package-lock.json /app/

RUN npm install

COPY . /app

RUN npm run build

ENV PORT=3000

CMD ["npm", "start"]