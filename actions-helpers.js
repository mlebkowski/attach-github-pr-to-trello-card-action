const { readFileSync } = require("fs");

function findInput(name) {
  const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`];
  return val ? val.trim() : "";
}

function getInput(name) {
  const val = findInput(name);
  if (!val) {
    throw new Error(`Input required and not supplied: ${name}`);
  }
  return val;
}

const getEventPayload = () =>
  JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));

module.exports = { getInput, findInput, getEventPayload };
