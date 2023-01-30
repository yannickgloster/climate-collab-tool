import { gameCodeLength } from "../../utils/constants";

describe("Lobby", () => {
  // TODO: Write lobby assertions
  // it("successfully creates lobby", () => {
  //   cy.visit("http://localhost:3000/");

  //   cy.get('[data-cy="newGameButton"]').click();

  // });

  describe("Joining Lobby", () => {
    it("does not allow long lobby codes", () => {
      cy.visit("http://localhost:3000/");

      const lobbyCode = "ab234sdbi0sjd";
      cy.get("#gameCodeTextField")
        .type(lobbyCode)
        .should("have.value", lobbyCode.substring(0, gameCodeLength));
    });
  });
});

export {};
