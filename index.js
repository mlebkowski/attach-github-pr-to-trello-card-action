const { TrelloSdk } = require("./trello-sdk");
const { upsertPullRequestOnCard } = require("./upsert-pull-request-on-card");
const { getInput, findInput, getEventPayload } = require("./actions-helpers");
const { attachTrelloCards } = require("./attach-trello-cards");

const isReq = ["1", "on", "yes", "true"].includes(
  findInput("required").toLowerCase(),
);
const trello = new TrelloSdk(
  getInput("trello-api-key"),
  getInput("trello-token"),
);

const { html_url: url, body } = getEventPayload().pull_request;
const updateCard = upsertPullRequestOnCard.bind(null, trello, url);
const print = (messages) => console.log(messages.join("\n"));
const error = (message) => console.error(message);

(async () => await attachTrelloCards(body, updateCard, isReq, print, error))();
