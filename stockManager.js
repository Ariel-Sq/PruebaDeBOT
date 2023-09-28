const { Client, GatewayIntentBits, Partials } = require("discord.js");

require("dotenv").config();

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

const pedidos = [];

// Event to listen to messages in the chat
client.on("messageCreate", async (message) => {
  try {
    const keys = message.content.split(" ");

    const stockManager = keys[0];
    const action = keys[1];

    try {
      if (stockManager === "@stockManager" && action === "add") {
        const nombre = keys[2];
        const precio = keys[3];
        const cantidad = keys[4];

        const newPedido = {
          id: pedidos.length + 1,
          nombre,
          precio,
          cantidad,
          estado: "pendiente",
        };

        pedidos.push(newPedido);
        message.channel.send(`Se agrego ${nombre} con éxito.`);
      }
    } catch (error) {
      message.channel.send("Hubo un error al cargar nuevo pedido.");
    }

    try {
      if (stockManager === "@stockManager" && action === "list") {
        pedidos.forEach((pedido) => {
          message.channel.send(
            `ID: ${pedido.id} | Nombre: ${pedido.nombre} | Precio: ${pedido.precio} | Cantidad: ${pedido.cantidad} | Estado: ${pedido.estado}`
          );
        });
      }
    } catch (error) {
      message.channel.send("Hubo un error al obtener la lista.");
    }
  } catch (error) {
    message.channel.send("Ocurrió un error inesperado.");
  }
});
