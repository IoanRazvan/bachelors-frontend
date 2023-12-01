FROM node:18.18.2-buster as builder

WORKDIR /src
COPY . .
RUN npm i --force
RUN npm run build

FROM node:18.18.2-buster
WORKDIR /src
COPY server/* .
COPY --from=builder /src/dist .
RUN npm install
EXPOSE 4200
CMD [ "node", "index.js" ]