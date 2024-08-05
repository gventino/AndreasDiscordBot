# AndreasDiscordBot
A Discord bot that acts like an old D&D character that I created, a paladin from Curse of Strahd.

It uses Google Gemini to generate the text responses based on the prompt at ```./commands/utility```.

It uses Redis to keep track of the previous conversations with guild members.

(The prompts are in brazilian portuguese btw 🇧🇷)

## Hosting the Bot
1. Make sure you have Node.js and Docker installed.
2. Assign the correct credentials to the .env file.
3. Run `docker pull redis`.
4. Run `docker run --name some-redis -d redis` or

`docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning` if you want persistent storage.

6. Run `node deploy-commands.js` (This creates the slash commands on the Discord server/guild for each command in ```./commands```).
7. Run `node index.js`.

## Notes
Feel free to create a fork of this, but at least give me credit for it. This is just a toy project, by the way.
