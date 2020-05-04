describe("Testing the form", function() {
    it("Visits the page and opens Pizza menu",function() {
        cy.visit("http://localhost:3000/");
        cy.get('[data-cy=pizza-time]').click();
        cy.url().should('include', '/pizza');
    });

    it("Adds text to name", function() {
        cy.get('[data-cy=name]').type("Mark").should("have.value", "Mark");
    })

    it("checks multiple checkboxes", function() {
        cy.get('[type="checkbox"]').check()
    })

    it("Submits form", function() {
        cy.get('[data-cy=sub]').click();
    })
});