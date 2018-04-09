module.exports = {
  resources: {
    openweathermap: {
      baseUrl: 'http://api.openweathermap.org/data/2.5/',
      uri: {
        current: 'weather',
        forecast: 'forecast',
      },
      url_params: {
        units: 'metric',
        lang: 'fr',
      },
    },
    forecast: {
      numberToShow: 3,
    },
  },
};
