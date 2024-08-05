const { GoogleGenerativeAI } = require("@google/generative-ai");
const fs = require('fs');
require('dotenv').config();

async function run(question) {
    const genAI = new GoogleGenerativeAI(process.env.GEMINI_TOKEN);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
    let data = JSON.parse(fs.readFileSync('./commands/utility/prompt.json'));
    
    for(const item of data.questions) {
        const collection = `A pessoa ${item.user} perguntou anteriormente isto:\n
                                ${item.question}\n
                                Você respondeu o seguinte:\n
                                ${item.answer}\n`;
        data.prompt += collection;    
    }    
    const prompt = data.prompt + data.final_prompt + question;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
}

module.exports = run;