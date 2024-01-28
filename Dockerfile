FROM node:lts

WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install glob rimraf

RUN npm install

COPY . .

CMD ["npm", "run", "start:dev"]