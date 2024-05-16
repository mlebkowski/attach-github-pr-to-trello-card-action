const { upsertPullRequestOnCard } = require("./upsert-pull-request-on-card");

describe("upsertPullRequestOnCard", () => {
  it("adds attachment by URL", async () => {
    const cardId = "abcde";
    const url = "https://example.com";
    const sdk = new SdkSpy();

    await upsertPullRequestOnCard(sdk, url, cardId);
    expect(sdk.addedAttachments).toEqual([{ cardId, url }]);
  });

  it("does not add twice", async () => {
    const cardId = "abcde";
    const url = "https://example.com";
    const sdk = new SdkSpy({ [cardId]: [{ url }] });

    await upsertPullRequestOnCard(sdk, url, cardId);
    expect(sdk.addedAttachments).toHaveLength(0);
  });
});

class SdkSpy {
  #responses;
  addedAttachments = [];

  constructor(responses = {}) {
    this.#responses = responses;
  }

  async getAttachments(cardId) {
    return this.#responses[cardId] || [];
  }

  async attachUrl(cardId, url) {
    this.addedAttachments.push({ cardId, url });
  }
}
