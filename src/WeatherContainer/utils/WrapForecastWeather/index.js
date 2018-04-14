import CONSTANT from '../../../constants';
import moment from '../../../utils/moment';

function WrapForecastWeather(data) {
  const baseDateTime = moment.unix(data.list[0].dt);
  const baseTimeInMinutes = baseDateTime.minutes() + baseDateTime.hours() * 60;

  return data.list
    .map(dailyForecast => ({
      temperature_max: Math.round(dailyForecast.main.temp_max),
      temperature_min: Math.round(dailyForecast.main.temp_min),
      icon: dailyForecast.weather[0] && dailyForecast.weather[0].id,
      dt: dailyForecast.dt,
      dayShortName: moment.unix(dailyForecast.dt).format('ddd'),
    }))
    .filter(dailyForecast => {
      const forecastDate = moment.unix(dailyForecast.dt).format('DD MM YYYY');
      const currentDate = moment().format('DD MM YYYY');

      return currentDate !== forecastDate;
    })
    .filter(dailyForecast => {
      const forecastTime = moment.unix(dailyForecast.dt);
      const timeInMinutes = forecastTime.minutes() + forecastTime.hours() * 60;

      return timeInMinutes === baseTimeInMinutes;
    })
    .slice(0, CONSTANT.resources.forecast.numberToShow);
}

export default WrapForecastWeather;
