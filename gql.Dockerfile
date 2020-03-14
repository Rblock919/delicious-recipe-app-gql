FROM node:12-alpine as node

RUN mkdir /app
WORKDIR /app

# ENV PATH /app/node_modules/.bin:$PATH

COPY . /app/
#RUN rm -rf /app/node_modules
# The below is to download the dependencies needed to install and use app dependencies, such as python
# Alpine node does not provide these but installing them on top on alpine-node still results in much smaller img size
RUN apk --no-cache --update --virtual build-dependencies add \
    python \
    make \
    g++ \
    && npm install \
    && apk del build-dependencies

EXPOSE 4000
CMD [ "npm", "run", "start.dev" ]
