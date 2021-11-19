describe("Blog app", function () {
  it("user can login", function () {
    cy.contains("login").click();
    cy.get("#username").type("steelcasedude");
    cy.get("#password").type("chairsrock33");
    cy.get("#login-button").click();

    cy.contains("Now is the Time");
  });

  it.only("login fails with wrong password", function () {
    cy.contains("login").click();
    cy.get("#username").type("mluukkai");
    cy.get("#password").type("wrong");
    cy.get("#login-button").click();

    // cy.contains("wrong credentials");
    cy.get(".error").should("contain", "wrong credentials");
    cy.get(".error").should("have.css", "color", "rgb(255, 0, 0)");
    cy.get(".error").should("have.css", "border-style", "solid");
    cy.get("html").should("not.contain", "Matti Luukkainen logged in");
  });

  describe("when logged in", function () {
    beforeEach(function () {
      cy.request("POST", "http://localhost:3003/api/login", {
        username: "mluukkai",
        password: "salainen"
      }).then((response) => {
        localStorage.setItem(
          "loggedNoteappUser",
          JSON.stringify(response.body)
        );
        cy.visit("http://localhost:3000");
      });
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
