describe("Blog app", function () {
  beforeEach(function () {
    cy.request("POST", "http://localhost:3003/api/testing/reset")
    const user = {
      name: "liam",
      username: "lcarnahan",
      password: "testpassword",
    }
    cy.request("POST", "http://localhost:3003/api/users/", user)
    cy.visit("http://localhost:3000")
  })

  it("Login form is shown", function () {
    cy.contains("Blogs")
    cy.contains("Log into application")
  })

  describe("Login", function () {
    it("succeeds with correct credentials", function () {
      cy.get("#username").type("lcarnahan")
      cy.get("#password").type("testpassword")
      cy.get("#login-button").click()

      cy.contains("liam logged-in")
    })

    it("fails with wrong credentials", function () {
      cy.get("#username").type("lcarnahan")
      cy.get("#password").type("wrongpassword")
      cy.get("#login-button").click()

      cy.get(".error")
        .should("contain", "Wrong username or password")
        .and("have.css", "color", "rgb(255, 0, 0)")
        .and("have.css", "border-style", "solid")

      cy.get("html").should("not.contain", "liam logged-in")
    })
  })

  describe("When logged in", function () {
    beforeEach(function () {
      cy.login({ username: "lcarnahan", password: "testpassword" })
    })

    it("A blog can be created", function () {
      cy.contains("create new blog").click()
      cy.get("#title").type("a new blog created by cypress")
      cy.get("#author").type("liam")
      cy.get("#url").type("cypress.com")
      cy.get("#createButton").click()
      cy.contains("a new blog created by cypress")
    })
  })
})
