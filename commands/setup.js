const {
  SlashCommandBuilder,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('Создать панель тикетов в этом канале'),

  async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle('CloudSMP | Поддержка')
      .setDescription(
        'Тикеты помогают связаться с командой поддержки CloudSMP.\n' +
        '**Открывайте тикет только если вам нужна помощь, ' +
        'и не создавайте несколько тикетов по одной и той же проблеме.**'
      )
      .setColor(0x5865F2)
      .setImage('https://website.donutsmp.org/store.png');

    // Строка 1: Ban Appeal + Mute Appeal (красные)
    const row1 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_ban')
        .setLabel('Апелляция бана')
        .setEmoji('📋')
        .setStyle(ButtonStyle.Danger),
      new ButtonBuilder()
        .setCustomId('ticket_mute')
        .setLabel('Апелляция мута')
        .setEmoji('🔇')
        .setStyle(ButtonStyle.Danger),
    );

    // Строка 2: Media + Discord Report (синие)
    const row2 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_media')
        .setLabel('Медиа')
        .setEmoji('🎬')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ticket_report')
        .setLabel('Жалоба на игрока')
        .setEmoji('⚠️')
        .setStyle(ButtonStyle.Primary),
    );

    // Строка 3: Bug Report + Connection Issues (синие)
    const row3 = new ActionRowBuilder().addComponents(
      new ButtonBuilder()
        .setCustomId('ticket_bug')
        .setLabel('Баг-репорт')
        .setEmoji('🐛')
        .setStyle(ButtonStyle.Primary),
      new ButtonBuilder()
        .setCustomId('ticket_connection')
        .setLabel('Проблема с подключением')
        .setEmoji('📱')
        .setStyle(ButtonStyle.Primary),
    );

    await interaction.channel.send({
      embeds: [embed],
      components: [row1, row2, row3],
    });

    await interaction.reply({
      content: '✅ Панель тикетов создана!',
      ephemeral: true,
    });
  },
};
