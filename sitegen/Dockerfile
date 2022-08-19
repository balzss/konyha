FROM node:16-alpine

WORKDIR /usr/src/app

COPY . .

RUN yarn install
RUN yarn demo
WORKDIR /usr/src/app/homepage
RUN yarn install
RUN yarn build

WORKDIR /usr/src/app

EXPOSE 7777

CMD [ "node", "index.js" ]
