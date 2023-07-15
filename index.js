const token = '513924ee9b67e58b-5dd90bd61293e8da-b476d2526bc0e0e9';

const express = require('express');
const ViberBot = require('viber-bot').Bot;
const BotEvents = require('viber-bot').Events;

const app = express();

const bot = new ViberBot({
    authToken: "api-key",
    name: "Override API",
    avatar: "https://cdn3.iconfinder.com/data/icons/customer-support-7/32/40_robot_bot_customer_help_support_automatic_reply-512.png" // It is recommended to be 720x720, and no more than 100kb.
});

// Perfect! Now here's the key part:
bot.on(BotEvents.MESSAGE_RECEIVED, (message, response) => {
    // Echo's back the message to the client. Your bot logic should sit here.
    response.send(message);
});

// Wasn't that easy? Let's create HTTPS server and set the webhook:

const port = 8080;


const webhookUrl = "https://webhook.site/8c78c265-0027-4aba-835d-ec23056d8563";

app.use('/viber/webhook', bot.middleware());

app.listen(port, () => {
    console.log(`Application running on port: ${port}`);
    bot.setWebhook(`${webhookUrl}/viber/webhook`).catch(error => {
        console.log('Can not set webhook on following server. Is it running?');
        console.error(error);
        process.exit(1);
    });
});