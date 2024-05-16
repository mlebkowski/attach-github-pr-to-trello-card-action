const extractTrelloCards = require("./extract-trello-cards");

function attachTrelloCards(
  body,
  updater,
  isRequired,
  successCallback,
  failCallback,
) {
  const cards = extractTrelloCards(body).map(updater);
  if (!cards.length && isRequired) {
    return Promise.reject(
      failCallback(
        "No cards found in the description and the required flag was turned on",
      ),
    );
  }

  return Promise.all(cards).then(successCallback);
}
module.exports = { attachTrelloCards };
