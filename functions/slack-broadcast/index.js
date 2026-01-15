export default async function(req, res) {
  const body = JSON.parse(req.body);

  await fetch("https://cloud.appwrite.io/v1/functions/69687c8e001e2e994c2a/executions", {
    method: "POST",
    headers: {
      "X-Appwrite-Project": process.env.APPWRITE_PROJECT_ID,
      "X-Appwrite-Key": process.env.APPWRITE_API_KEY,
      "Content-Type": "application/json"
    },
    body: JSON.stringify(body)
  });

  res.json({ ok: true });
}