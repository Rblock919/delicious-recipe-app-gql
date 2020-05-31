FROM node:12.14-alpine as builder

RUN mkdir /app
WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:12.14-alpine as node

WORKDIR /app

COPY package*.json ./

RUN apk --no-cache --update --virtual build-dependencies add \
  python \
  make \
  g++ \
  && npm install --only=production \
  && apk del build-dependencies

ENV PATH /app/node_modules/.bin:$PATH

COPY --from=builder /app/dist ./dist

EXPOSE 3000

CMD ["npm", "start"]
