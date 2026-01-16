module.exports = async function(req, res) {
  const { name, imageUrl, text } = JSON.parse(req.body);

  const payload = {
    channel: process.env.SLACK_CHANNEL_ID,
    text,
    username: name,
    icon_url: imageUrl,
  };

  console.log("Posting to Slack:", payload);

  const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.SLACK_BOT_TOKEN}`,
      "Content-Type": "application/json; charset=utf-8",
    },
    body: JSON.stringify(payload),
   
  });

  const json = await slackRes.json();
  console.log("Slack response:", json);

  res.json({ ok: true });
};

