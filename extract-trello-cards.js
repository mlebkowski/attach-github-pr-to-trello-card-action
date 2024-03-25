function extractTrelloCards(input) {
  const matches = [...input.matchAll(/https:\/\/trello.com\/c\/([\w\d]+)/g)];
  const unique = new Set(matches.map((m) => m[1]));
  return [...unique];
}

module.exports = extractTrelloCards;
