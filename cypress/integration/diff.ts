describe('See sentence diff', () => {
  beforeEach(() => {
    cy.visit('/data-load');

    cy.get('input[type=file]').selectFile('cypress/fixtures/test_lessons.txt');

    cy.get('[data-testid="store-lessons-button"]').click();

    //cy.visit('/');
    cy.visit('/trans-test');

    cy.get('[data-testid="lesson-number"]').type("1");
  });

  it('Should show the diff', () => {
    cy.title().should('equal', 'SpanishApp');

    cy.get('[data-testid="spanish-attempt"]').type("Hola, comi éstasaies{enter}");
  });
});
