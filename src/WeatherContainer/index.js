import React, { Component } from "react";
import axios from "axios";
import { Grid, Row } from "react-bootstrap";
import Loader from "react-loader";

import CONSTANTS from "../constants";
import WrapCurrentWeather from "./utils/WrapCurrentWeather";
import WrapForecastWeather from "./utils/WrapForecastWeather";
import CitySelect from "../CitySelect";
import {
  WeatherDisplayCurrent,
  WeatherDisplayForecast
} from "../WeatherDisplay";

export default class WeatherContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      placeId: process.env.REACT_APP_OPENWEATHERMAP_CITY_ID,
      currentWeather: undefined,
      foreCastWeather: undefined
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
        foreCastWeather: undefined
      },
      this.loadWeatherData
    );
  }

  async loadWeatherData() {
    const { url_params, baseUrl, uri } = CONSTANTS.resources.openweathermap;

    const params = {
      ...url_params,
      placeId: this.state.placeId
    };

    try {
      const currentWeatherResult = await axios.get(baseUrl + uri.current, {
        params: {
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          id: params.placeId,
          lang: params.lang,
          units: params.units
        }
      });

      this.setState({
        currentWeather: WrapCurrentWeather(currentWeatherResult.data)
      });

      const forecastWeatherResult = await axios.get(baseUrl + uri.forecast, {
        params: {
          appid: process.env.REACT_APP_OPENWEATHERMAP_API_KEY,
          id: params.placeId,
          lang: params.lang,
          units: params.units
        }
      });

      this.setState({
        foreCastWeather: WrapForecastWeather(forecastWeatherResult.data)
      });
    } catch (err) {
      this.setState({
        currentWeather: undefined,
        foreCastWeather: undefined
      });

      console.log("Error while fecth weather data: ", err);
    }
  }

  render() {
    return (
      <Grid>
        <Row className="section">
          <CitySelect onChangeCity={this.onChangeCity} />
        </Row>
        {this.state.currentWeather ? (
          <Row className="section">
            <WeatherDisplayCurrent weatherData={this.state.currentWeather} />
          </Row>
        ) : (
          <Loader color="#fff" />
        )}
        {this.state.foreCastWeather ? (
          <Row className="section">
            <WeatherDisplayForecast
              foreCastWeatherData={this.state.foreCastWeather}
            />
          </Row>
        ) : (
          <Loader color="#fff" />
        )}
      </Grid>
    );
  }
}
