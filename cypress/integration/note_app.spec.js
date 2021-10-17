describe("Blog app", function () {
  // beforeEach(function () {
  //   cy.visit("http://localhost:3000");
  // });

  it("front page can be opened", function () {
    cy.visit("http://localhost:3000");
    cy.contains("Blogs");
    // cy.contains("Will This New Trick Work?");
  });

  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("steelcasedude");
    cy.get("#password").type("chairsrock33");
    cy.get("#login-button").click();

    cy.contains("Will This New Trick Work?");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.contains("login").click();
      cy.get("input:first").type("steelcasedude");
      cy.get("input:last").type("chairsrock33");
      cy.get("#login-button").click();
    });
  });

  it("a new note can be created", function () {
    cy.contains("Create New Blog").click();
    cy.get(".title").type("a blog created by cypress");
    cy.get(".author").type("an author created by cypress");
    cy.get(".url").type("a url created by cypress");
    cy.contains("save").click();
    cy.contains("a blog created by cypress");
  });
});
