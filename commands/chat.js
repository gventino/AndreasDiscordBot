const { SlashCommandBuilder } = require('discord.js');
const run  = require('./utility/gemini');
const fs = require('fs');

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
            let data = JSON.parse(fs.readFileSync('./commands/utility/prompt.json'));
            const nickname = interection.user.username;
            const question = interection.options.getString('input');
            
            await interection.deferReply();

            const answer = await run(question);
            
            data.questions.push({
                user: nickname,
                question: question,
                answer: answer,
            });
            
            const jsonString = JSON.stringify(data, null, 2);
            try {
                fs.writeFile('./commands/utility/prompt.json', jsonString, (err) => {
                    if (err) {
                        console.error('Error saving the json', err);
                    }
                });
            }
            catch(err){
                console.error(err);
            }
            
            
            await interection.editReply(answer);
        }
        catch(err) {
            await interection.reply({ content: 'Estou com alguns problemas amigo. Um momento!', ephemeral: true });
            console.log(err);
        }
    },
}