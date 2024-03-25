const extractTrelloCards = require("./extract-trello-cards");
const TrelloSdk = require("./trello-sdk");
const upsertWithDependencies = require("./upsert-pull-request-on-card");
const { getInput, getEventPayload } = require("./actions-helpers");

const trello = new TrelloSdk(
  getInput("trello-api-key"),
  getInput("trello-token"),
);

const { html_url: url, body } = getEventPayload().pull_request;
const updateCard = upsertWithDependencies.bind(null, trello, url);
const print = (messages) => console.log(messages.join("\n"));

Promise.all(extractTrelloCards(body).map(updateCard)).then(print);
