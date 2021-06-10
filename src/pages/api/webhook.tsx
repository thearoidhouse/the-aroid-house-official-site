{
  /* NOTE:
  Remember to change webhook location when domain has changed

  curl -X POST https://api.telegram.org/bot<YOUR-BOT-TOKEN>/setWebhook -H "Content-type: application/json" -d '{"url": "https://project-name.username.vercel.app/api/webhook"}'
*/
}
import type { NextApiRequest, NextApiResponse } from "next";

import { MongoTelegramRepo } from "domain/infrastructure/MongoTelegramRepository";
import { connectToDatabase } from "src/libs/mongodb";

import TelegramBot from "node-telegram-bot-api";

module.exports = async (request: NextApiRequest, response: NextApiResponse) => {
  // https://github.com/yagop/node-telegram-bot-api/issues/319#issuecomment-324963294
  // Fixes an error with Promise cancellation
  process.env.NTBA_FIX_319 = "test";
  const { db } = await connectToDatabase();
  const telegramRepo = MongoTelegramRepo.create(db);

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

      // Only admin can send /add {userName} {chatID} command
      const isAdmin = id == process.env.TELEGRAM_ADMIN;
      if (isAdmin && message.startsWith("/add")) {
        const newUserName = message.split(" ")[1]; // {userName}
        const newChatID = message.split(" ")[2]; // {chatID}

        telegramRepo.addUser(newUserName, newChatID);

        await bot.sendMessage(
          id,
          `Successfully added: ${newUserName} ${newChatID}`
        );

        return response.send("OK");
      }

      // Return chatID back to user on /getID
      if (message.startsWith("/getID")) {
        await bot.sendMessage(id, `Your chatID is : ${id}`);
        return response.send("OK");
      }
    }
  } catch (error) {
    // If there was an error sending our message then we
    // can log it into the Vercel console
    console.error("Error sending message");
    console.log(error.toString());
  }

  // Acknowledge the message with Telegram
  // by sending a 200 HTTP status code
  return response.send("OK");
};
