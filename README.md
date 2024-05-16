# Attach Github Pull requests to Trello cards

Every time a Trello card is mentioned in a Github Pull request,
attach the URL of that PR to a given card.

## Inputs

| name           | required | description                                                                                                                                                                                      |
|----------------|----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| trello-api-key | **yes**  | Trello API key [created for your PowerUp](https://trello.com/power-ups/admin)                                                                                                                    |
| trello-token   | **yes**  | A token with write scope [generated with that API key](https://trello.com/1/authorize?expiration=never&scope=read,write&response_type=token&key={apikey}) (replace `{apikey}` with actual value) |
| required       | **no**   | Should the action fail if no Trello cards are found                                                                                                                                              |

## Example usage

```yaml
on:
  pull_request:
    types: [ "opened", "edited" ]

jobs:
  trello:
    runs-on: ubuntu-latest

    steps:
      - uses: mlebkowski/attach-github-pr-to-trello-card-action@v1
        with:
          trello-api-key: ${{ secrets.TRELLO_API_KEY }}
          trello-token: ${{ secrets.TRELLO_TOKEN }}
          required: false
```
