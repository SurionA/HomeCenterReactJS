import React from 'react';
import renderer from 'react-test-renderer';
import ForecastBlock from './';

it('renders correctly ForecastBlock component', () => {
  const weatherData = {
    temperature_max: 16,
    temperature_min: 12,
    icon: 800,
    dt: 123,
    dayShortName: 'Mon',
  };
  const tree = renderer.create(<ForecastBlock weatherData={weatherData} />).toJSON();
  expect(tree).toMatchSnapshot();
});
