import { faker } from "@faker-js/faker";
import formSelectors from "../selectors/formSelectors";

describe("Form Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  function fillAndSubmitForm() {
    const fullName = faker.person.fullName();
    const email = faker.internet.email();
    const cpf = faker.string.numeric(11);
    const phone = faker.phone.number("(##) #####-####");
    const cep = faker.string.numeric(8);
    const street = faker.location.street();
    const number = faker.string.numeric(3);
    const complement = faker.word.words(2);
    const neighborhood = faker.location.city();
    const city = faker.location.city();
    const observation = faker.lorem.sentence();

    cy.get(formSelectors.nameField).clear().type(fullName);
    cy.get(formSelectors.emailField).clear().type(email);
    cy.get(formSelectors.cpfField).clear().type(cpf);
    cy.get(formSelectors.phoneField).clear().type(phone);
    cy.get(formSelectors.cepField).clear().type(cep);
    cy.get(formSelectors.streetField).clear().type(street);
    cy.get(formSelectors.numberField).clear().type(number);
    cy.get(formSelectors.complementField).clear().type(complement);
    cy.get(formSelectors.neighborhoodField).clear().type(neighborhood);
    cy.get(formSelectors.cityField).clear().type(city);
    cy.get(formSelectors.observationField).clear().type(observation);
    cy.get(formSelectors.dropdown).click();
    cy.get(formSelectors.option0).click();

    cy.get(formSelectors.submitButton).click();
    cy.url().should("include", "/");
  }

  it("Should navigate to the form page", () => {
    cy.get(formSelectors.homeButton).click();
    cy.url().should("include", "/form");
  });

  it("Should submit two forms with faker`s data", () => {
    cy.get(formSelectors.homeButton).click();
    cy.url().should("include", "/form");

    for (let i = 0; i < 2; i++) {
      fillAndSubmitForm();
      cy.get(formSelectors.homeButton).click();
      cy.url().should("include", "/form");
    }
  });

  it("Should submit a form, view the provider, and return home", () => {
    cy.get(formSelectors.homeButton).click();
    cy.url().should("include", "/form");

    cy.get(formSelectors.switchActive).click();
    fillAndSubmitForm();

    cy.get(formSelectors.viewProviderButton).click();
    cy.get(formSelectors.providerNameText).should(
      "contain",
      "Nome do Prestador"
    );

    cy.get(formSelectors.homeButton).click();
    cy.url().should("include", "/");
  });

  it("Should create a provider, return home, and delete it", () => {
    cy.get(formSelectors.homeButton).click();
    cy.url().should("include", "/form");

    cy.get(formSelectors.switchActive).click();
    fillAndSubmitForm();

    cy.get(formSelectors.deleteProviderButton).click();
    cy.get(formSelectors.deleteProviderButton).should("not.exist");
  });
});
