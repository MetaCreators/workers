FROM node:21.1.0-alpine

WORKDIR /src

COPY package* .
RUN npm install

COPY . .


RUN npm run build

CMD [ "node","dist/index.js" ]