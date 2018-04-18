function wrapCurrentWeather(data) {
  return {
    name: data.name,
    humidity: data.main.humidity,
    temperature: data.main.temp,
    icon: data.weather[0] && data.weather[0].id,
  };
}

export default wrapCurrentWeather;
