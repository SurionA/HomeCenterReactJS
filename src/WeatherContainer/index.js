import React, { Component } from 'react';
import axios from 'axios';
import { Grid, Row } from 'react-bootstrap';
import Loader from 'react-loader';

import CONSTANTS from '../constants';
import WrapCurrentWeather from './WrapCurrentWeather';
import WrapForecastWeather from './WrapForecastWeather';
import CitySelect from '../CitySelect';
import { WeatherDisplayCurrent, WeatherDisplayForecast } from '../WeatherDisplay';

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);
    this.loadWeatherData = this.loadWeatherData.bind(this);
    this.onChangeCity = this.onChangeCity.bind(this);
    this.state = {
      placeId: process.env.REACT_APP_OPENWEATHERMAP_CITY_ID,
      currentWeather: {},
      foreCastWeather: [],
      loaded: false,
    };
  }

  componentDidMount() {
    this.loadWeatherData();
  }

  onChangeCity(cityId) {
    this.setState(
      {
        placeId: cityId,
        loaded: false,
      },
      this.loadWeatherData,
    );
  }

  async loadWeatherData() {
    const params = {
      ...CONSTANTS.resources.openweathermap.url_params,
      placeId: this.state.placeId,
    };
    let currentWeatherResult;
    let forecastWeatherResult;

    try {
      currentWeatherResult = await axios.get(
        CONSTANTS.resources.openweathermap.baseUrl + CONSTANTS.resources.openweathermap.uri.current,
        {
          params: {
            appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
            id: params.placeId,
            lang: params.lang,
            units: params.units,
          },
        },
      );

      forecastWeatherResult = await axios.get(
        CONSTANTS.resources.openweathermap.baseUrl +
          CONSTANTS.resources.openweathermap.uri.forecast,
        {
          params: {
            appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
            id: params.placeId,
            lang: params.lang,
            units: params.units,
          },
        },
      );
    } catch (err) {
      console.log('Error while fecth weather data: ', err);
    }

    this.setState({
      currentWeather: WrapCurrentWeather(currentWeatherResult.data),
      foreCastWeather: WrapForecastWeather(forecastWeatherResult.data),
      loaded: true,
    });
  }

  render() {
    return (
      <Grid>
        <Row className="section">
          <CitySelect onChangeCity={this.onChangeCity} />
        </Row>
        <Row className="section">
          <Loader color="#fff" loaded={this.state.loaded}>
            <WeatherDisplayCurrent weatherData={this.state.currentWeather} />
          </Loader>
        </Row>
        <Row className="section">
          <Loader color="#fff" loaded={this.state.loaded}>
            <WeatherDisplayForecast foreCastWeatherData={this.state.foreCastWeather} />
          </Loader>
        </Row>
      </Grid>
    );
  }
}
