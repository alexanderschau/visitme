FROM docker.io/library/node:lts-alpine

WORKDIR /app
COPY . /app
RUN yarn
RUN yarn build

CMD ["/app/server.mjs"]