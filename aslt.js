require('dotenv');
const { Client, Modal, MessageActionRow, TextInputComponent, Collection, MessageEmbed } = require('discord.js')
const client = new Client({ intents: 32767 });
const fs = require('fs');
const moment = require('moment');
const { Routes } = require('discord-api-types/v9')
const {REST}  = require('@discordjs/rest');
const config = require('./config.json');
const rest = new REST({ version: '9' }).setToken(config.botToken);const commands = [];



client.commands = new Collection()

fs.readdirSync('./commands').forEach(async file => {
  const command = require(`./commands/${file}`);
  commands.push(command.data.toJSON());
  client.commands.set(command.data.name, command);
})

client.on('interactionCreate', async(interaction) => {
	let client = interaction.client
	if(!interaction.isCommand()) return;
	if(interaction.member.bot) return;
	fs.readdirSync('./commands').forEach(file => {
        const command = require(`./commands/${file}`);
        if(interaction.commandName.toLowerCase() === command.data.name.toLowerCase()) {
        command.run(client, interaction)
    }
	})
  });


client.on("ready", async () => {
	try { await rest.put (
			Routes.applicationCommands(client.user.id),
			{ body: commands },
		);
	} catch (error) {
		console.error(error);
	} console.log(`${client.user.username} Aktif Edildi!`);
});



	client.on('interactionCreate', interaction => {
		if (!interaction.isModalSubmit()) return;
		if (interaction.customId === 'cemasltSistemler') {
		    interaction.reply({ content: 'Başarıyla İletildi , Teşekkürler.' });
			let cemyazı1 = interaction.fields.getTextInputValue('yazı1');
			let cemyazı2 = interaction.fields.getTextInputValue('yazı2');
			let cemloglama = new MessageEmbed()
			.setDescription(`:identification_card: ▹ **__${interaction.member} Adlı Kullanıcı__**\n\n:fog: ▹ **${cemyazı1}** \n\n:printer: ▹ \`${cemyazı2}\``)
			.setFooter({ text: "CEMASLT SİSTEMLER " });
		    client.channels.cache.get(config.LoglamaKanalı).send( { embeds: [cemloglama] })
		}
	});


client.login(config.botToken);