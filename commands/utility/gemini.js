const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
const { getByUsername } = require('./database');
require('dotenv').config();


const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
let data = JSON.parse(fs.readFileSync('./commands/utility/prompt.json'));

async function run(question, username) {
    let prompt = data.prompt;
    let questions = await getByUsername(username);
    if(!questions){
        questions = [];
    }
    for(const question of questions) {
        const collection = `A pessoa ${question.user} perguntou anteriormente isto:\n
                                ${question.question}\n
                                Você respondeu o seguinte:\n
                                ${question.answer}\n`;
        prompt += collection;
    }    
    prompt += data.final_prompt + question;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

module.exports = run;