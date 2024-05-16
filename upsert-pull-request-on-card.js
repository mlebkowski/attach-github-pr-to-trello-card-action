async function upsertPullRequestOnCard(trello, url, cardId) {
  const attachments = await trello.getAttachments(cardId);
  const isAttached = attachments.some(
    ({ url: attachmentUrl }) => url === attachmentUrl,
  );
  if (isAttached) {
    return `Pull request is already attached to card: ${cardId}`;
  }
  await trello.attachUrl(cardId, url);
  return `Attaching PR ${url} to https://trello.com/c/${cardId}`;
}

module.exports = { upsertPullRequestOnCard };
