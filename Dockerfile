FROM node:18.16@sha256:c0a8990273163b3c17685bf98986c6e21d574cda0cbb97440147e9f73e71e973 as builder
#FROM registry.access.redhat.com/ubi8/nodejs-16@sha256:720a3a2594a1804b5ecd7046a5ce4be82885bfa7c83df4c9bcade0e1e00db078 as build

RUN mkdir /project
WORKDIR /project
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build --optimization
RUN npm prune

FROM nginxinc/nginx-unprivileged
COPY --from=builder /project/dist/sample-app /usr/share/nginx/html/
#COPY nginx/nginx.conf /etc/nginx/conf.d/default.conf
