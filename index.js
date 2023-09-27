const { Client, GatewayIntentBits, Partials } = require("discord.js");
const axios = require("axios");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

const token = process.env.DISCORD_TOKEN;

if (!token) {
  throw new Error("Discord token not found. Please check your .env file.");
}

client.setMaxListeners(0);
client
  .login(token)
  .then(() => {
    console.log(`${client.user.username} Online.`);
  })
  .catch((err) => {
    console.log(err);
  });

// Event to listen to messages in the chat
client.on("messageCreate", async (message) => {
  if (message.content.includes("price of ")) {
    try {
      const token = message.content.slice(9);
      const response = await axios.get(
        `https://api.coingecko.com/api/v3/simple/price?ids=${token}&vs_currencies=usd`
      );
      const tokenPrice = response.data.bitcoin.usd;

      message.channel.send(`El precio actual del ${token} es $${tokenPrice}`);
    } catch (error) {
      console.error(`Error al obtener el precio de ${token}: `, error);
    }
  }
});
