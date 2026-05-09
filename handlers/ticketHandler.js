const {
  PermissionsBitField,
  EmbedBuilder,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
} = require('discord.js');

const TICKET_TYPES = {
  ticket_ban:        { name: 'ban-appeal',      label: 'Апелляция бана' },
  ticket_mute:       { name: 'mute-appeal',     label: 'Апелляция мута' },
  ticket_media:      { name: 'media',           label: 'Медиа' },
  ticket_report:     { name: 'discord-report',  label: 'Жалоба на игрока' },
  ticket_bug:        { name: 'bug-report',      label: 'Баг-репорт' },
  ticket_connection: { name: 'connection',      label: 'Проблема с подключением' },
};

// Строим модальное окно для каждого типа тикета
function buildModal(customId) {
  const modal = new ModalBuilder().setCustomId(`modal_${customId}`);

  if (customId === 'ticket_ban') {
    modal.setTitle('Апелляция бана');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('username')
          .setLabel('Ваш никнейм')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите ваш ник в Minecraft. (Bedrock начинается с \'.\')')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('platform')
          .setLabel('Платформа и версия')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Пример: Java 1.21.1 или Bedrock 1.30.3')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('ban_id')
          .setLabel('ID бана (необязательно)')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Необязательно: #3F132FD')
          .setRequired(false),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('explanation')
          .setLabel('Объяснение')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Постарайтесь объяснить, почему вас следует разбанить')
          .setRequired(true),
      ),
    );
  }

  else if (customId === 'ticket_mute') {
    modal.setTitle('Апелляция мута');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('username')
          .setLabel('Ваш никнейм')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите ваш ник в Minecraft. (Bedrock начинается с \'.\')')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('platform')
          .setLabel('Платформа и версия')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Пример: Java 1.21.1 или Bedrock 1.30.3')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('explanation')
          .setLabel('Объяснение')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Постарайтесь объяснить, почему вас следует размутить')
          .setRequired(true),
      ),
    );
  }

  else if (customId === 'ticket_media') {
    modal.setTitle('Медиа');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('username')
          .setLabel('Ваш никнейм')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите ваш ник в Minecraft. (Bedrock начинается с \'.\')')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('video_link')
          .setLabel('Ссылка на видео')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите URL здесь')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('requirements')
          .setLabel('Какие требования вы выполнили?')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Перечислите каждое выполненное требование.')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('full_ip')
          .setLabel('Показан ли полный IP в видео/стриме?')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Да/Нет')
          .setRequired(true),
      ),
    );
  }

  else if (customId === 'ticket_report') {
    modal.setTitle('Жалоба на игрока');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('user_id')
          .setLabel('Введите ID пользователя')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Если не знаете как найти — погуглите: как получить ID пользователя Discord')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('video_proof')
          .setLabel('Ссылка на видео-доказательство')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите URL здесь — обязательно.')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('report_reason')
          .setLabel('На что жалоба')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Укажите, какое правило нарушил пользователь.')
          .setRequired(true),
      ),
    );
  }

  else if (customId === 'ticket_bug') {
    modal.setTitle('Баг-репорт');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('username')
          .setLabel('Ваш никнейм')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите ваш ник в Minecraft. (Bedrock начинается с \'.\')')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('bug_description')
          .setLabel('Опишите баг')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Опишите проблему здесь')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('recording')
          .setLabel('Ссылка на запись (обязательно)')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Вставьте ссылку (желательно скрытое видео на YouTube)')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('whereami')
          .setLabel('Введите /whereami в игре и вставьте результат')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('(Без этого тикет не будет рассмотрен)')
          .setRequired(true),
      ),
    );
  }

  else if (customId === 'ticket_connection') {
    modal.setTitle('Проблема с подключением');
    modal.addComponents(
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('username')
          .setLabel('Ваш никнейм')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Введите ваш ник в Minecraft. (Bedrock начинается с \'.\')')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('platform')
          .setLabel('Укажите платформу и версию')
          .setStyle(TextInputStyle.Short)
          .setPlaceholder('Пример: Java 1.21.1 или Bedrock 1.30.3')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('whereami')
          .setLabel('Весь текст из /whereami')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Заполните реальной информацией')
          .setRequired(true),
      ),
      new ActionRowBuilder().addComponents(
        new TextInputBuilder()
          .setCustomId('issue')
          .setLabel('Опишите проблему')
          .setStyle(TextInputStyle.Paragraph)
          .setPlaceholder('Опишите суть проблемы')
          .setRequired(true),
      ),
    );
  }

  return modal;
}

// Создаём тикет-канал и постим туда данные из формы
async function createTicketChannel(interaction, ticketType, fields) {
  const { guild, user } = interaction;

  const channelName = `${ticketType.name}-${user.username.toLowerCase().replace(/[^a-z0-9]/g, '')}`;
  const existing = guild.channels.cache.find(c => c.name === channelName);
  if (existing) {
    return interaction.reply({
      content: `❌ У тебя уже открыт тикет: ${existing}`,
      ephemeral: true,
    });
  }

  const category = guild.channels.cache.get(process.env.CATEGORY_ID);
  const staffRoleId = process.env.STAFF_ROLE_ID;

  const permissionOverwrites = [
    {
      id: guild.id,
      deny: [PermissionsBitField.Flags.ViewChannel],
    },
    {
      id: user.id,
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.AttachFiles,
        PermissionsBitField.Flags.EmbedLinks,
      ],
    },
  ];

  if (staffRoleId) {
    permissionOverwrites.push({
      id: staffRoleId,
      allow: [
        PermissionsBitField.Flags.ViewChannel,
        PermissionsBitField.Flags.SendMessages,
        PermissionsBitField.Flags.ManageChannels,
        PermissionsBitField.Flags.AttachFiles,
      ],
    });
  }

  const channel = await guild.channels.create({
    name: channelName,
    parent: category || null,
    permissionOverwrites,
  });

  // Формируем описание из полей формы
  const fieldLines = fields.map(f => `**${f.label}:**\n${f.value}`).join('\n\n');

  const embed = new EmbedBuilder()
    .setTitle(`${ticketType.label}`)
    .setDescription(`${user} открыл тикет.\n\n${fieldLines}`)
    .setColor(0x5865F2)
    .setFooter({ text: `Тип: ${ticketType.label}` })
    .setTimestamp();

  const closeRow = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
      .setCustomId('close_ticket')
      .setLabel('Закрыть тикет')
      .setEmoji('🔒')
      .setStyle(ButtonStyle.Danger),
  );

  const mention = staffRoleId ? `${user} <@&${staffRoleId}>` : `${user}`;

  await channel.send({
    content: mention,
    embeds: [embed],
    components: [closeRow],
  });

  await interaction.reply({
    content: `✅ Тикет создан: ${channel}`,
    ephemeral: true,
  });
}

module.exports = {
  // Обработка кнопок — открывает модальное окно
  async handleButton(interaction) {
    const { customId } = interaction;

    if (customId === 'close_ticket') {
      await interaction.reply({ content: '🔒 Тикет закрывается через 5 секунд...' });
      await new Promise(r => setTimeout(r, 5000));
      await interaction.channel.delete().catch(() => {});
      return;
    }

    if (!TICKET_TYPES[customId]) return;

    const modal = buildModal(customId);
    await interaction.showModal(modal);
  },

  // Обработка сабмита модальных окон
  async handleModal(interaction) {
    const { customId, guild, user } = interaction;

    // customId вида "modal_ticket_ban"
    const ticketKey = customId.replace('modal_', '');
    const ticketType = TICKET_TYPES[ticketKey];
    if (!ticketType) return;

    let fields = [];

    if (ticketKey === 'ticket_ban') {
      fields = [
        { label: 'Ваш никнейм',           value: interaction.fields.getTextInputValue('username') },
        { label: 'Платформа и версия',    value: interaction.fields.getTextInputValue('platform') },
        { label: 'ID бана',               value: interaction.fields.getTextInputValue('ban_id') || '—' },
        { label: 'Объяснение',            value: interaction.fields.getTextInputValue('explanation') },
      ];
    } else if (ticketKey === 'ticket_mute') {
      fields = [
        { label: 'Ваш никнейм',           value: interaction.fields.getTextInputValue('username') },
        { label: 'Платформа и версия',    value: interaction.fields.getTextInputValue('platform') },
        { label: 'Объяснение',            value: interaction.fields.getTextInputValue('explanation') },
      ];
    } else if (ticketKey === 'ticket_media') {
      fields = [
        { label: 'Ваш никнейм',                            value: interaction.fields.getTextInputValue('username') },
        { label: 'Ссылка на видео',                        value: interaction.fields.getTextInputValue('video_link') },
        { label: 'Выполненные требования',                 value: interaction.fields.getTextInputValue('requirements') },
        { label: 'Полный IP в видео/стриме?',             value: interaction.fields.getTextInputValue('full_ip') },
      ];
    } else if (ticketKey === 'ticket_report') {
      fields = [
        { label: 'ID пользователя',  value: interaction.fields.getTextInputValue('user_id') },
        { label: 'Видео-доказательство', value: interaction.fields.getTextInputValue('video_proof') },
        { label: 'Причина жалобы',   value: interaction.fields.getTextInputValue('report_reason') },
      ];
    } else if (ticketKey === 'ticket_bug') {
      fields = [
        { label: 'Ваш никнейм',       value: interaction.fields.getTextInputValue('username') },
        { label: 'Описание бага',        value: interaction.fields.getTextInputValue('bug_description') },
        { label: 'Ссылка на запись',     value: interaction.fields.getTextInputValue('recording') },
        { label: 'Вывод /whereami',      value: interaction.fields.getTextInputValue('whereami') },
      ];
    } else if (ticketKey === 'ticket_connection') {
      fields = [
        { label: 'Ваш никнейм',       value: interaction.fields.getTextInputValue('username') },
        { label: 'Платформа и версия',   value: interaction.fields.getTextInputValue('platform') },
        { label: 'Вывод /whereami',      value: interaction.fields.getTextInputValue('whereami') },
        { label: 'Описание проблемы',    value: interaction.fields.getTextInputValue('issue') },
      ];
    }

    await createTicketChannel(interaction, ticketType, fields);
  },
};
