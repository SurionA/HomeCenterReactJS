import React, { Fragment } from "react";
import PropTypes from "prop-types";
import { Row } from "react-bootstrap";
import { iconStyle, temperatureStyle } from "./styles";

function WeatherDisplayCurrent({ weatherData }) {
  return (
    <Fragment>
      <Row>
        <h3 className="title">{weatherData.name}</h3>
      </Row>
      <Row>
        <div style={iconStyle} className={`wi wi-icon-${weatherData.icon}`} />
      </Row>
      <Row style={temperatureStyle}>
        {Math.round(parseInt(weatherData.temperature, 10))}°
      </Row>
    </Fragment>
  );
}

WeatherDisplayCurrent.propTypes = {
  weatherData: PropTypes.shape({
    name: PropTypes.string,
    humidity: PropTypes.number,
    temperature: PropTypes.number,
    icon: PropTypes.number
  })
};

WeatherDisplayCurrent.defaultProps = {
  weatherData: PropTypes.shape({
    name: "DefaultName"
  })
};
export default WeatherDisplayCurrent;
