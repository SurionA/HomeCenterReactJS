import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row } from 'react-bootstrap';
import Loader from 'react-loader';

import CONSTANTS from '../constants';
import wrapCurrentWeather from './utils/wrapCurrentWeather';
import wrapForecastWeather from './utils/wrapForecastWeather';
import CitySelect from './Components/CitySelect';
import { WeatherDisplayCurrent, WeatherDisplayForecast } from './Components';

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeId: process.env.REACT_APP_OPENWEATHERMAP_CITY_ID,
      currentWeather: undefined,
      foreCastWeather: undefined,
    };

    this.loadWeatherData = this.loadWeatherData.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
  }

  componentDidMount() {
    this.loadWeatherData();
  }

  onChangeCity(cityId) {
    this.setState(
      {
        placeId: cityId,
        currentWeather: undefined,
        foreCastWeather: undefined,
      },
      this.loadWeatherData
    );
  }

  async loadWeatherData() {
    const { urlParams, baseUrl, uri } = CONSTANTS.resources.openweathermap;

    const params = {
      ...urlParams,
      placeId: this.state.placeId,
    };

    try {
      const currentWeatherResult = await axios.get(baseUrl + uri.current, {
        params: {
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          id: params.placeId,
          lang: params.lang,
          units: params.units,
        },
      });

      this.setState({
        currentWeather: wrapCurrentWeather(currentWeatherResult.data),
      });

      const forecastWeatherResult = await axios.get(baseUrl + uri.forecast, {
        params: {
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          id: params.placeId,
          lang: params.lang,
          units: params.units,
        },
      });

      this.setState({
        foreCastWeather: wrapForecastWeather(forecastWeatherResult.data),
      });
    } catch (err) {
      this.setState({
        currentWeather: undefined,
        foreCastWeather: undefined,
      });

      console.log('Error while fecth weather data: ', err);
    }
  }

  render() {
    return (
      <Grid>
        <Row className="section" data-e2e-id="CitySelect">
          <CitySelect onChangeCity={this.onChangeCity} />
        </Row>
        {this.state.currentWeather ? (
          <Row className="section" data-e2e-id="WeatherDisplayCurrent">
            <WeatherDisplayCurrent weatherData={this.state.currentWeather} />
          </Row>
        ) : (
          <Loader color="#fff" />
        )}
        {this.state.foreCastWeather ? (
          <Row className="section" data-e2e-id="WeatherDisplayForecast">
            <WeatherDisplayForecast foreCastWeatherData={this.state.foreCastWeather} />
          </Row>
        ) : (
          <Loader color="#fff" />
        )}
      </Grid>
    );
  }
}
