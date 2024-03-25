import { readFileSync } from "fs";

function getInput(name) {
  const val = process.env[`INPUT_${name.replace(/ /g, "_").toUpperCase()}`];
  if (!val) {
    throw new Error(`Input required and not supplied: ${name}`);
  }
  return val.trim();
}

const getEventPayload = () =>
  JSON.parse(readFileSync(process.env.GITHUB_EVENT_PATH, { encoding: "utf8" }));

module.exports = { getInput, getEventPayload };
