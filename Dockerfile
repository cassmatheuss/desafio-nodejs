FROM node:latest

WORKDIR /usr/src/app

COPY package*.json ./
COPY prisma ./prisma/

RUN npm i
RUN npx prisma generate

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "start:prod" ]