const { get } = require('powercord/http');
const { Plugin } = require('powercord/entities');

class RandomJoke extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'joke',
            aliases: ['dadjoke'],
            usage: '{c}',
            executor: () => {
                return this.getJoke();
            }
        })
    }

    async getJoke() {
        const { body } = await get('https://official-joke-api.appspot.com/jokes/random');
        if (!body) return { result: 'Error occurred while getting joke :(' };

        return {
            result: `> ${body.setup}\n\n${body.punchline}`
        }
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('joke');
    }
}

module.exports = RandomJoke;