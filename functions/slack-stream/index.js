let clients = [];

module.exports = async (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache, no-transform");
  res.setHeader("Connection", "keep-alive");

  // Required for Appwrite to start streaming
  res.flushHeaders();

  // Add this client
  clients.push(res);

  // Keep-alive ping every 15 seconds
  const keepAlive = setInterval(() => {
    res.write(":\n\n");
  }, 15000);

  // Remove client on disconnect
  req.on("close", () => {
    clearInterval(keepAlive);
    clients = clients.filter(c => c !== res);
  });
};

// Broadcast helper
module.exports.broadcast = (data) => {
  const payload = `data: ${JSON.stringify(data)}\n\n`;
  clients.forEach(client => client.write(payload));
};