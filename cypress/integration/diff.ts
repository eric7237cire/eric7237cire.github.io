describe('See sentence diff', () => {
  beforeEach(() => {
    cy.visit('/data-load');

    cy.get('input[type=file]').selectFile('cypress/fixtures/test_lessons.txt')
  });

  it('has the correct title', () => {
    cy.title().should('equal', 'SpanishApp');
  });
});
