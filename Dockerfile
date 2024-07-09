FROM node:16-alpine as builder
WORKDIR /app
COPY ./package.json ./
RUN npm install

COPY . .
RUN npm run build

FROM nginx:1.26.0-alpine
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
CMD [ "nginx", "-g", "daemon off;" ]