import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import VirtualizedSelect from "react-virtualized-select";
import "react-select/dist/react-select.css";
import "react-virtualized-select/styles.css";

import CITIES from "../Fixtures/cities-fr.json";
import { selectStyle, titleStyle } from "./styles";

export default class CitySelect extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCity: {
        id: CITIES[0].id,
        nm: CITIES[0].nm
      }
    };

    this.onChange = this.onChange.bind(this);
  }

  onChange(city) {
    if (city) {
      this.setState({
        selectedCity: {
          id: city.id,
          nm: city.nm
        }
      });

      this.props.onChangeCity(city.id);
    }
  }

  render() {
    return (
      <Fragment>
        <h3 style={titleStyle}>Sélectionner une ville</h3>
        <VirtualizedSelect
          style={selectStyle}
          options={CITIES}
          value={this.state.selectedCity}
          clearable={false}
          name="select-city"
          onChange={this.onChange}
          searchable
          labelKey="nm"
          valueKey="id"
        />
      </Fragment>
    );
  }
}

CitySelect.propTypes = {
  onChangeCity: PropTypes.func.isRequired
};
