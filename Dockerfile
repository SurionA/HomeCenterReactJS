
FROM node:8.10.0

LABEL maintainer="SurionA <frere.maxime@gmail.com>"
LABEL description="Provides an image that build and serve reactjs app"

# Build
FROM node:8.10.0 as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm i
COPY . ./
RUN npm run build

# Production
FROM nginx:1.12-alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

