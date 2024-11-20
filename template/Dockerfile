FROM alpine:latest

RUN apk update && \
    apk add --no-cache nodejs-lts npm icu-data-full jq && \
    rm -rf /var/cache/apk/*

WORKDIR /app

COPY . /app
RUN npm install

EXPOSE 5173

CMD ["npm", "run", "dev", "--host"]
