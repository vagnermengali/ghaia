FROM node

WORKDIR /api

COPY package.json /api

RUN yarn

RUN npx prisma generate

COPY . /api