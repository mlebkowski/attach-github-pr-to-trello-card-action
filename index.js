const { TrelloSdk } = require("./trello-sdk");
const { upsertWithDependencies } = require("./upsert-pull-request-on-card");
const { getInput, getEventPayload } = require("./actions-helpers");
const { attachTrelloCards } = require("./attach-trello-cards");

const isReq = ["1", "on", "yes", "true"].includes(
  getInput("required").toLowerCase(),
);
const trello = new TrelloSdk(
  getInput("trello-api-key"),
  getInput("trello-token"),
);

const { html_url: url, body } = getEventPayload().pull_request;
const updateCard = upsertWithDependencies.bind(null, trello, url);
const print = (messages) => console.log(messages.join("\n"));
const error = (message) => console.error(message);

(async () => await attachTrelloCards(body, updateCard, isReq, print, error))();
