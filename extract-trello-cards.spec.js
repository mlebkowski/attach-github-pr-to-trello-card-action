const extractTrelloCards = require("./extract-trello-cards");

describe("extractTrelloCards", () => {
  it("extracts card", () => {
    expect(extractTrelloCards("https://trello.com/c/random/whatever")).toEqual([
      "random",
    ]);
  });
  it("ignores duplicates", () => {
    expect(
      extractTrelloCards(
        "https://trello.com/c/random/whatever https://trello.com/c/random/other",
      ),
    ).toEqual(["random"]);
  });
  it("finds all mentions", () => {
    expect(
      extractTrelloCards(
        "https://trello.com/c/alpha https://trello.com/c/bravo",
      ),
    ).toEqual(["alpha", "bravo"]);
  });
});
