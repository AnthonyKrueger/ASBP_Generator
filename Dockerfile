FROM node:14.17.0 as build

WORKDIR /usr/src/app
COPY . .
RUN npm install

FROM node:14.17.0 as release

WORKDIR /usr/src/app 
COPY --from=build /usr/src/app/ .
CMD ["node", "server.js"]