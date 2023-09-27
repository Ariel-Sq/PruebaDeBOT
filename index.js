const {
  Client,
  GatewayIntentBits,
  Partials,
  Collection,
} = require("discord.js");
const axios = require("axios");
const config = require("./config.json");

const client = new Client({
  intents: [Object.keys(GatewayIntentBits)],
  partials: [Object.keys(Partials)],
});

client.setMaxListeners(0);

client
  .login(config.token)
  .then((result) => {
    console.log(`${client.user.username} Está online.`);
  })
  .catch((err) => {
    console.log(err);
  });

// Evento para escuchar mensajes en el chat
client.on("messageCreate", async (message) => {
  // Verificar si el contenido del mensaje es "bt" (sin importar mayúsculas o minúsculas)
  if (message.content.toLowerCase() === "bt") {
    try {
      const response = await axios.get(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );

      const bitcoinPrecio = response.data.bitcoin.usd;

      // Enviar el precio del Bitcoin como respuesta
      message.channel.send(`El precio actual del Bitcoin es $${bitcoinPrecio}`);
    } catch (error) {
      console.error("Error al obtener el precio del Bitcoin:", error);
    }
  }
});

/*const { Client } = require("discord.js");
const client = new Client({ intents: [3276799] });

const config = require("./config.json");

client.on("messageCreate", async (message) => {
  if (message.content == "hola") {
    message.channel.send("Hola");
  }
});

client.login(config.token);
console.log("El bot esta en linea");*/
