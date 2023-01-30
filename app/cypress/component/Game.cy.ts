import { Game, user as userType } from "../../utils/types/game";

describe("Game Class", () => {
  it("successfully creates a new game", () => {
    const gameCode = "fh6sd";
    const user: userType = {
      userId: "34203a59-39dd-4d81-bf17-06ed793d6804",
      gameCode: gameCode,
      power: 100,
    };
    const game = new Game(gameCode, [user]);

    expect(game.gameCode).to.equal(gameCode);
    expect(game.users.length).to.equal(1);
    expect(game.users[0]).to.equal(user);
  });

  it("sucessfully adds users", () => {
    const gameCode = "fh6sd";
    const user: userType = {
      userId: "34203a59-39dd-4d81-bf17-06ed793d6804",
      gameCode: gameCode,
      power: 100,
    };
    const user2: userType = {
      userId: "fd946d2c-01b6-425f-839e-b666c12d5255",
      gameCode: gameCode,
      power: 100,
    };
    const game = new Game(gameCode, [user]);

    game.addUser(user2);
    expect(game.users.length).to.equal(2);
    expect(game.users[0]).to.equal(user);
    expect(game.users[1]).to.equal(user2);
  });

  it("sucessfully removes users", () => {
    const gameCode = "fh6sd";
    const user: userType = {
      userId: "34203a59-39dd-4d81-bf17-06ed793d6804",
      gameCode: gameCode,
      power: 100,
    };
    const user2: userType = {
      userId: "fd946d2c-01b6-425f-839e-b666c12d5255",
      gameCode: gameCode,
      power: 100,
    };
    const game = new Game(gameCode, [user]);

    game.addUser(user2);
    game.removeUser(user2);
    expect(game.users.length).to.equal(1);
    expect(game.users[0]).to.equal(user);
    expect(game.users[1]).to.undefined;
  });

  it("updates the timestamp once there is a change", () => {
    const gameCode = "fh6sd";
    const user: userType = {
      userId: "34203a59-39dd-4d81-bf17-06ed793d6804",
      gameCode: gameCode,
      power: 100,
    };
    const user2: userType = {
      userId: "fd946d2c-01b6-425f-839e-b666c12d5255",
      gameCode: gameCode,
      power: 100,
    };
    const game = new Game(gameCode, [user]);

    let timestamp = game.timestamp;
    cy.wait(1);
    game.addUser(user2);
    expect(timestamp).to.not.equal(game.timestamp);

    timestamp = game.timestamp;
    cy.wait(1);
    game.removeUser(user2);
    expect(timestamp).to.not.equal(game.timestamp);

    timestamp = game.timestamp;
    cy.wait(1);
    game.gameCode;
    expect(timestamp).to.not.equal(game.timestamp);

    timestamp = game.timestamp;
    cy.wait(1);
    game.users;
    expect(timestamp).to.not.equal(game.timestamp);
  });
});

export {};
