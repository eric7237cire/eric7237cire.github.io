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

    cy.get('[data-testid="spanish-attempt"]').type("la; commmi      éstas  Bienytú{enter}");

    cy.get('[data-testid="diff"] ins').should(insElements => {
      expect(insElements.length).to.equal(7);
      expect(insElements.first().text()).to.equal('¿Ho');
      expect(insElements.last().text()).to.equal('?');
    });






  });
});
