
FROM node:8.10.0

LABEL maintainer="SurionA <frere.maxime@gmail.com>"
LABEL description="Provides an image with basic nodejs service"


RUN mkdir -p /srv/openweatherapp/
COPY ./ /srv/openweatherapp/

RUN ls -la /srv
RUN ls -la /srv/openweatherapp/

RUN cd /srv/openweatherapp/ && rm -rf node_modules && npm i

EXPOSE 3000

CMD cd /srv/openweatherapp/ && npm start