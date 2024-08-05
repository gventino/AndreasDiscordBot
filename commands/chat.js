const { SlashCommandBuilder } = require('discord.js');
const run  = require('./utility/gemini');
const { store } =  require('./utility/database');

module.exports = {
	data: new SlashCommandBuilder()
                .setName('chat')
                .setDescription('The bot will talk with you.')
                .addStringOption(option =>
                    option.setName('input')
                          .setDescription('The input to echo back')
                          .setRequired(true)
                ),
    async execute(interection) {
        try {
            await interection.deferReply();
            const username = interection.user.username;
            const question = interection.options.getString('input');
            const answer = await run(question, username);
            
            const questionObj = {
                user: username,
                question: question,
                answer: answer,
            };

            await store(questionObj);
            
            interection.editReply(answer);
        }
        catch(err) {
            await interection.editReply({ content: 'Estou com alguns problemas amigo. Um momento!', ephemeral: true });
            console.log(err);
        }
    },
}