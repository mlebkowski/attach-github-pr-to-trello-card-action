const { attachTrelloCards } = require("./attach-trello-cards");

describe("attachTrelloCards", () => {
  const identity = (x) => x;
  const updater = identity;

  it("calls the success callback", async () => {
    const body = "https://trello.com/c/123/ https://trello.com/c/345/";
    const isRequired = false;
    const successCallback = jest.fn(identity);
    const failCallback = jest.fn();

    const sut = attachTrelloCards(
      body,
      updater,
      isRequired,
      successCallback,
      failCallback,
    );

    await expect(sut).resolves.toBeTruthy();
    expect(successCallback).toHaveBeenCalledTimes(1);
    expect(successCallback).toHaveBeenCalledWith(["123", "345"]);
    expect(failCallback).not.toHaveBeenCalled();
  });

  it("calls the success callback if not required", async () => {
    const body = "";
    const isRequired = false;
    const successCallback = jest.fn(identity);
    const failCallback = jest.fn();

    const sut = attachTrelloCards(
      body,
      updater,
      isRequired,
      successCallback,
      failCallback,
    );

    await expect(sut).resolves.toEqual([]);
    expect(successCallback).toHaveBeenCalled();
    expect(failCallback).not.toHaveBeenCalled();
  });

  it("calls the fail callback if required required", async () => {
    const body = "No trello cards here, move on!";
    const isRequired = true;
    const successCallback = jest.fn();
    const failCallback = jest.fn(() => "Error");

    const sut = attachTrelloCards(
      body,
      updater,
      isRequired,
      successCallback,
      failCallback,
    );

    await expect(sut).rejects.toBeTruthy();
    expect(successCallback).not.toHaveBeenCalled();
    expect(failCallback).toHaveBeenCalledWith(
      "No cards found in the description and the required flag was turned on",
    );
  });
});
