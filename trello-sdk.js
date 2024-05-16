class TrelloSdk {
  #key;
  #token;

  constructor(key, token) {
    this.#key = key;
    this.#token = token;
  }

  async getAttachments(cardId) {
    return fetch(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=${this.#key}&token=${this.#token}`,
    ).then((response) => response.json());
  }

  async attachUrl(cardId, url) {
    return fetch(
      `https://api.trello.com/1/cards/${cardId}/attachments?key=${this.#key}&token=${this.#token}&url=${url}`,
      { method: "POST" },
    );
  }
}

module.exports = { TrelloSdk };
