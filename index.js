const token = '5156d8ad4767dea8-b566e93670fe3943-6516db643ba6b3e1';

const ViberBot = require('viber-bot').Bot,
BotEvents = require('viber-bot').Events,
TextMessage = require('viber-bot').Message.Text
express = require('express');

const app = express();

const bot = new ViberBot({
    authToken: token,
    name: "reu8botrsh",
    avatar: "https://dl-media.viber.com/1/share/2/long/vibes/icon/image/0x0/7f0b/38ee3765c66c363f149a0cbd2efa2ed895ba162b296397d4fef77e5098607f0b.jpg"
});

bot.on(BotEvents.SUBSCRIBED, response => {
    response.send(new TextMessage(`Hi there ${response.userProfile.name}. I am ${bot.name}! Feel free to ask me anything.`));
});

bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    response.send(new TextMessage(`Message received.`));
});

const port = 3000;
const EXPOSE_URL = 'https://webhook.site/b9a1dad4-2bba-4b16-aa03-06fe55d67c86';
                    

app.use("/viber/webhook", bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${EXPOSE_URL}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});