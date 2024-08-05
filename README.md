# AndreasDiscordBot
A Discord bot that talks like a paladin from Curse of Strahd (This is an old D&D character that I created).

## Hosting the Bot
1. Make sure you have Node.js and Docker installed.
2. Assign the correct credentials to the .env file.
3. Run `docker pull redis`.
4. Run `docker run --name some-redis -d redis` or

`docker run --name some-redis -d redis redis-server --save 60 1 --loglevel warning` if you want persistent storage.
6. Run `node deploy-commands.js` (This creates the slash commands on the Discord server/guild for each command in ./commands).
7. Run `node index.js`.

## Notes
Feel free to create a fork of this, but at least give me credit for it. This is just a toy project, by the way.
