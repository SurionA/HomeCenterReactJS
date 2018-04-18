import React from 'react';
import { Grid, Col } from 'react-bootstrap';
import PropTypes from 'prop-types';

import ForecastBlock from './Components/ForecastBlock';

function WeatherDisplayForecast({ foreCastWeatherData }) {
  return (
    <Grid>
      {foreCastWeatherData.map(weatherData => (
        <Col xs={12} md={4} key={weatherData.dt}>
          <ForecastBlock weatherData={weatherData} />
        </Col>
      ))}
    </Grid>
  );
}

WeatherDisplayForecast.propTypes = {
  foreCastWeatherData: PropTypes.arrayOf(
    PropTypes.shape({
      temperature_max: PropTypes.number,
      temperature_min: PropTypes.number,
      icon: PropTypes.number,
      dt: PropTypes.number,
      dayShortName: PropTypes.string,
    })
  ),
};

WeatherDisplayForecast.defaultProps = {
  foreCastWeatherData: PropTypes.arrayOf(PropTypes.shape({})),
};

export default WeatherDisplayForecast;
