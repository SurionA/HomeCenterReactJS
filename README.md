# OpenWeather app

## Requirement

* `node 8.10.0`
* [nvm](https://github.com/creationix/nvm)

## Start

### DEVELOPMENT

To start with a development environnement:

```shell
nvm install v8.10.0
nvm use v8.10.0
npm i
npm start
```

### BUILD

```shell
npm run build
```

### TEST

```shell
npm run build
```

### PRETTIER

```shell
npm run prettier
```

### PRODUCTION

### Docker container

Build the docker image from the [Dockerfile](Dockerfile)

```shell
docker build -t local/open-weather-app .
```

Then run the container

```shell
docker run -d -p 9229:9229 local/open-weather-app
```
