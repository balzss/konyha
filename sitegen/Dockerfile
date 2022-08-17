FROM node:16-alpine

WORKDIR /usr/src/app

COPY sitegen .

RUN npm install

EXPOSE 7777

CMD [ "node", "index.js" ]
