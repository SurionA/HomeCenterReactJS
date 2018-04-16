import React from 'react';
import renderer from 'react-test-renderer';
import WeatherDisplayCurrent from './';

it('renders correctly WeatherDisplayCurrent component', () => {
  const weatherData = {
    name: 'City Name',
    humidity: 65,
    temperature: 15,
    icon: 800,
  };
  const tree = renderer.create(<WeatherDisplayCurrent weatherData={weatherData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
