import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { Row } from 'react-bootstrap';

import { iconStyle, temperatureStyle } from './styles';

function ForecastBlock({ weatherData }) {
  return (
    <Fragment>
      <Row>
        <h3 className="title">{weatherData.dayShortName}</h3>
      </Row>
      <Row>
        <div style={iconStyle} className={`wi wi-icon-${weatherData.icon}`} />
      </Row>
      <Row style={temperatureStyle}>{Math.round(parseInt(weatherData.temperature_max, 10))}°</Row>
      <Row style={temperatureStyle}>{Math.round(parseInt(weatherData.temperature_min, 10))}°</Row>
    </Fragment>
  );
}

ForecastBlock.propTypes = {
  weatherData: PropTypes.shape({
    temperature_max: PropTypes.number,
    temperature_min: PropTypes.number,
    icon: PropTypes.number,
    dt: PropTypes.number,
    dayShortName: PropTypes.string,
  }),
};

ForecastBlock.defaultProps = {
  weatherData: PropTypes.shape({}),
};

export default ForecastBlock;
