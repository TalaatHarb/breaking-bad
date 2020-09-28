# Stage 1
FROM node:alpine as node-server
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build:chars-lib
RUN npm run build:app:prod

# Stage 2
FROM nginx:alpine
COPY --from=node-server /usr/src/app/dist/breaking-bad-app /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

