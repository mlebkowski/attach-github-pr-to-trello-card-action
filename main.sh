#!/usr/bin/env bash

set -ueo pipefail

extract-trello-cards() {
  grep -oE 'https://trello.com/c/\w+' \
    | cut -d/ -f 5 \
    | sort \
    | uniq
}

trello-request() {
  declare card="$1" request="${2:-GET}" query="${3:-}"
  curl --silent --request "$request" \
    "https://api.trello.com/1/cards/$card/attachments?key=$TRELLO_KEY&token=$TRELLO_TOKEN&$query"
}

count-attachments-by-url() {
  declare url="$1"
  jq --arg URL "$url" -r '[ .[] | select(.url == $URL) ] | length'
}

upsert-pull-request-on-card() {
  declare card="$1" url="$2"
  local count=$(trello-request "$card" | count-attachments-by-url "$url")

  if [[ $((count)) -gt 0 ]]; then
    echo "Card already is associated with this PR"
    return;
  fi

  echo "Attaching PR $url to https://trello.com/c/$card";

  trello-request "$card" POST "url=$url" >/dev/null
}

main() {
  declare event="$1"
  local body="$(echo "$event" | jq -r .pull_request.body)"
  local url="$(echo "$event" | jq -r .pull_request.html_url)"

  echo "$body" | extract-trello-cards | while read shortLink; do
    upsert-pull-request-on-card "$shortLink" "$url"
  done
}

main "$GITHUB_EVENT"
