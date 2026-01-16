const sdk = require('node-appwrite');

module.exports = async (req, res) => {
  const client = new sdk.Client();
  client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject(process.env.APPWRITE_PROJECT_ID)
    .setKey(process.env.APPWRITE_API_KEY);

  const databases = new sdk.Databases(client);

  const body = JSON.parse(req.body);

  // Handle Slack URL verification
  if (body.type === 'url_verification') {
    return res.json({ challenge: body.challenge });
  }

  // Handle message events
  if (body.event && body.event.type === 'message') {
    const event = body.event;
    await databases.createDocument(
      'default', // databaseId - adjust if different
      'messages', // collectionId - adjust if different
      sdk.ID.unique(),
      {
        text: event.text,
        username: event.user,
        timestamp: event.ts
      }
    );
  }

  res.json({ ok: true });
};