FROM node:16.17.0

WORKDIR /frontend

COPY package.json package-lock.json /frontend

RUN npm install

COPY . /frontend

RUN npm run build

ENV PORT=3000

CMD ["npm", "start"]
