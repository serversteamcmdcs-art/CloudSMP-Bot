require('dotenv').config();
const { REST, Routes } = require('discord.js');
const setup = require('./commands/setup');

const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

(async () => {
  try {
    console.log('Регистрация slash-команд...');
    await rest.put(
      Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
      { body: [setup.data.toJSON()] }
    );
    console.log('✅ Команды успешно зарегистрированы!');
  } catch (err) {
    console.error('❌ Ошибка:', err);
  }
})();
