
const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers
    ]
});

client.once('ready', () => {
    console.log(`✅ Бот запущен как ${client.user.tag}`);
});

client.on('guildMemberAdd', async member => {
    // Название роли, которую бот должен выдать
    const roleName = 'member'; 
    const role = member.guild.roles.cache.find(role => role.name === roleName);

    if (role) {
        try {
            await member.roles.add(role);
            console.log(`🎉 Роль "${role.name}" выдана пользователю ${member.user.tag}`);
        } catch (err) {
            console.error('❌ Ошибка при выдаче роли:', err);
        }
    } else {
        console.warn(`⚠️ Роль "${roleName}" не найдена на сервере.`);
    }
});

client.login(process.env.TOKEN);
