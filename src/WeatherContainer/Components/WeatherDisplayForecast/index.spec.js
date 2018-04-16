import React from 'react';
import renderer from 'react-test-renderer';
import WeatherDisplayForecast from './';

it('renders correctly WeatherDisplayForecast component', () => {
  const foreCastWeatherData = [
    {
      temperature_max: 16,
      temperature_min: 12,
      icon: 800,
      dt: 123,
      dayShortName: 'Mon',
    },
    {
      temperature_max: 13,
      temperature_min: 9,
      icon: 800,
      dt: 456,
      dayShortName: 'Thus',
    },
    {
      temperature_max: 14,
      temperature_min: 13,
      icon: 800,
      dt: 789,
      dayShortName: 'Wen',
    },
  ];
  const tree = renderer.create(<WeatherDisplayForecast foreCastWeatherData={foreCastWeatherData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
