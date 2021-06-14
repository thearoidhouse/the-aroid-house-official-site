{
  /* NOTE:
  Remember to change webhook location when domain has changed

  curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'
*/
}
import type { NextApiRequest, NextApiResponse } from "next";

import TelegramBot from "node-telegram-bot-api";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  // https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
  // Fixes an error with Promise cancellation
  process.env.NTBA_FIX_319 = "test";

  try {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN!);

    const { body } = request;
    if (body.message) {
      // Retrieve the ID for this chat
      // and the text that the user sent
      const {
        chat: { id },
        text: message,
      } = body.message;

      // Return chatID back to user on /getID
      message.startsWith("/getID") && {
        await bot.sendMessage(id, `Your chatID is : ${id}`);
        return response.send("OK");
      }
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  return response.send("OK");
};
