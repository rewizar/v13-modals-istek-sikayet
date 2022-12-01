const { MessageEmbed, Modal, TextInputComponent, MessageActionRow, Options, Collector } = require("discord.js");
const { SlashCommandBuilder } = require("@discordjs/builders");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("istekönerişikayet")
    .setDescription("Önünüze gelen katagoriyi uygun olarak doldurunuz."),


    run: async (client, interaction) => { 

        const modal = new Modal()
        .setCustomId('cemasltSistemler')
        .setTitle('CEMASLT SİSTEMLER');

    const modelleme = new TextInputComponent()
        .setCustomId('yazı1')
        .setLabel("İSTEK/ÖNERİ/ŞİKAYET, Bir Katagori Seç !")
        .setStyle('SHORT');
    const yazıkanalı = new TextInputComponent()
        .setCustomId('yazı2')
        .setLabel("Boş Bırakılan Alana Yazabilirsin.")

        .setStyle('PARAGRAPH');

    const firstActionRow = new MessageActionRow().addComponents(modelleme);
    const secondActionRow = new MessageActionRow().addComponents(yazıkanalı);
    modal.addComponents(firstActionRow, secondActionRow);
    await interaction.showModal(modal);

    
	

    }
 };