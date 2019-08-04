FROM node:lts-alpine

LABEL maintainer="luqimin"

RUN apk --no-cache add tzdata  && \
    ln -sf /usr/share/zoneinfo/Asia/Shanghai /etc/localtime && \
    echo "Asia/Shanghai" > /etc/timezone

ENV NODE_ENV $NODE_ENV
ENV EGG_SERVER_ENV $EGG_SERVER_ENV

COPY ./package.json /app/package.json
WORKDIR /app

RUN npm install --production --silent

COPY ./ /app/

RUN npm run build

EXPOSE 3000
CMD npm run p
