FROM node:current-alpine AS builder

WORKDIR /app
COPY package*.json /app/
RUN npm install

COPY . /app
RUN npm run build --prod

FROM nginx:alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/adoc-editor-web/ /usr/share/nginx/html
EXPOSE 80
