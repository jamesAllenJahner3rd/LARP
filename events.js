module.exports = async function(req, res) {
  let body = {};
  try {
    body = JSON.parse(req.body || "{}");
  } catch (e) {
    console.log("Bad JSON:", req.body);
    return res.json({ ok: false });
  }

  console.log("Incoming payload:", body);

  if (body.type === "url_verification") {
    return res.json({ challenge: body.challenge });
  }

  if (body.type === "event_callback") {
    const event = body.event;
    if (event && event.type === "message" && !event.bot_id) {
      const payload = {
        channel: process.env.SLACK_CHANNEL_ID,
        text: event.text,
        username: "LARP Relay"
      };

      const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
      });

      const json = await slackRes.json();
      console.log("Slack response:", json);
      return res.json({ ok: true });
    }
  }

  if (body.name && body.imageUrl && body.text) {
    const payload = {
      channel: process.env.SLACK_CHANNEL_ID,
      text: body.text,
      username: body.name,
      icon_url: body.imageUrl
    };

    const slackRes = await fetch("https://slack.com/api/chat.postMessage", {
      method: "POST",
      headers: {
        Authorization: "Bearer " + process.env.SLACK_BOT_TOKEN,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    });

    const json = await slackRes.json();
    console.log("Slack response:", json);
    return res.json({ ok: true });
  }

  res.json({ ok: true });
};
