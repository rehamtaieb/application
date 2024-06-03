# Stage 1: Build Angular app
FROM node:14.21.3-alpine as node
WORKDIR /app
COPY . .
RUN sudo chmod 666 /var/run/docker.sock
RUN npm cache clean --force
RUN npm install --force
ARG configuration=production
RUN npm run build -- --configuration=$configuration   # Note the double dash before the --configuration argument

# Stage 2: Serve Angular app using Nginx
FROM nginx:alpine
COPY --from=node /app/dist/crudtuto-Front /usr/share/nginx/html
EXPOSE 80   # Specify the port to expose, typically 80 for HTTP traffic

