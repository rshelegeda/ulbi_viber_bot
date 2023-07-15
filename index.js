const token = '513924ee9b67e58b-5dd90bd61293e8da-b476d2526bc0e0e9';

const ViberBot = require('viber-bot').Bot,
BotEvents = require('viber-bot').Events,
TextMessage = require('viber-bot').Message.Text
express = require('express');

const app = express();

const bot = new ViberBot({
    authToken: token,
    name: "Cat Vet Bot",
    avatar: "https://upload.wikimedia.org/wikipedia/commons/3/3d/Katze_weiss.png"
});

bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(new TextMessage(`Message received.`));
});

const port = 3000;
const EXPOSE_URL = 'https://webhook.site/8c78c265-0027-4aba-835d-ec23056d8563';

app.use("/viber/webhook", bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${EXPOSE_URL}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});