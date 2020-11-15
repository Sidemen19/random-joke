const { get } = require('powercord/http');
const { Plugin } = require('powercord/entities');

class RandomJoke extends Plugin {
    startPlugin() {
        powercord.api.commands.registerCommand({
            command: 'joke',
            aliases: ['dadjoke'],
            usage: '{c} [--send]',
            executor: args => this.getJoke(args)
        })
    }

    async getJoke(args) {
        const { body } = await get('https://official-joke-api.appspot.com/jokes/random');
        if (!body) return { result: 'Error occurred while getting joke :(' };

        return {
            send: args.includes('--send'),
            result: `> ${body.setup}\n\n${body.punchline}`
        }
    }

    pluginWillUnload() {
        powercord.api.commands.unregisterCommand('joke');
    }
}

module.exports = RandomJoke;