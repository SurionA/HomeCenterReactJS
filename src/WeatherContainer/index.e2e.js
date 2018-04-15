// / <reference types="cypress"/>
describe('WeatherContainer', () => {
  it('should display default value', () => {
    cy.visit('/');

    cy
      .get('[data-e2e-id="CitySelect"]')
      .children('h3')
      .should('contain', 'Sélectionner une ville');

    cy
      .get('[data-e2e-id="CitySelect"]')
      .get('span')
      .contains('Abbeville')
      .should('have.length', 1);

    cy
      .get('[data-e2e-id="WeatherDisplayCurrent"]')
      .children('.row')
      .should('have.length', 3);

    cy
      .get('[data-e2e-id="WeatherDisplayCurrent"]')
      .children('.row')
      .children('h3')
      .should('contain', 'Abbeville');

    cy
      .get('[data-e2e-id="WeatherDisplayForecast"]')
      .children('.container')
      .children('.col-md-4')
      .should('have.length', 3);

    cy
      .get('[data-e2e-id="WeatherDisplayForecast"]')
      .children('.container')
      .children('.col-md-4')
      .children('.row')
      .should('have.length', 12);
  });

  it('should update with "Abrest" value', () => {
    cy.visit('/');

    cy
      .get('[data-e2e-id="CitySelect"]')
      .find('.Select-input')
      .children('input')
      .click({ force: true });

    cy
      .get('.VirtualizedSelectOption')
      .contains('Abrest')
      .click();

    cy
      .get('[data-e2e-id="CitySelect"]')
      .get('span')
      .contains('Abrest')
      .should('have.length', 1);

    cy
      .get('[data-e2e-id="WeatherDisplayCurrent"]')
      .children('.row')
      .children('h3')
      .should('contain', 'Abrest');

    cy
      .get('[data-e2e-id="WeatherDisplayForecast"]')
      .children('.container')
      .children('.col-md-4')
      .should('have.length', 3);

    cy
      .get('[data-e2e-id="WeatherDisplayForecast"]')
      .children('.container')
      .children('.col-md-4')
      .children('.row')
      .should('have.length', 12);
  });
});
