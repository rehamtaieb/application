# Stage 1: Build Angular app
FROM node:14.21.3-alpine as node
WORKDIR /app
COPY . .
RUN npm cache clean --force
RUN npm install --force
ARG PROFILE
ENV PROFILE $PROFILE

RUN echo "Environment: ${PROFILE}"
RUN npm run build-${PROFILE} 

# Stage 2: Serve Angular app using Nginx
FROM nginx:alpine
COPY --from=node /app/dist/crudtuto-Front /usr/share/nginx/html
COPY --from=node /app/dist/crudtuto-Front/nginx.conf /etc/nginx/conf.d/default.conf


EXPOSE 80  

