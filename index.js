require('dotenv').config();
const { Client, GatewayIntentBits, Collection } = require('discord.js');
const fs = require('fs');
const http = require('http');
const ticketHandler = require('./handlers/ticketHandler');

// Минимальный HTTP-сервер для Render (требует открытый порт)
const PORT = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200);
  res.end('CloudSMP Bot is running!');
}).listen(PORT, () => {
  console.log(`🌐 HTTP сервер запущен на порту ${PORT}`);
});

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ]
});

client.commands = new Collection();

const commandFiles = fs.readdirSync('./commands').filter(f => f.endsWith('.js'));
for (const file of commandFiles) {
  const cmd = require(`./commands/${file}`);
  client.commands.set(cmd.data.name, cmd);
}

client.once('ready', () => {
  console.log(`✅ Бот запущен как ${client.user.tag}`);
});

client.on('interactionCreate', async interaction => {
  if (interaction.isChatInputCommand()) {
    const cmd = client.commands.get(interaction.commandName);
    if (cmd) await cmd.execute(interaction);
  }

  if (interaction.isButton()) {
    await ticketHandler.handleButton(interaction);
  }

  if (interaction.isModalSubmit()) {
    await ticketHandler.handleModal(interaction);
  }
});

client.login(process.env.TOKEN);
