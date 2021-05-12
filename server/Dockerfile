FROM node:14.16.0

RUN mkdir /server

WORKDIR /server

COPY package*.json ./

COPY . .

EXPOSE 4000

CMD npm run start