import TB from 'node-telegram-bot-api'
import dotenv from 'dotenv'

dotenv.config()
const token = process.env.TOKEN
/**
 *  !get token from process.env variable
 */
const bot = new TB(token, { polling: true })

export const botStart = async () => {
  try {
    /**
     *  !Bot to reply if user didn't ask or didn't contact the user
     */

    bot.on('message', msg => {
      console.log(msg)
      if (
        !msg.text
          .toString()
          .toLowerCase()
          .includes('?') &&
        !msg.text
          .toString()
          .toLowerCase()
          .includes('@') &&
        !msg.reply_to_message
      ) {
        bot.sendMessage(
          msg.chat.id,
          `Уважаемый @${msg.from.username}, пожалуйста задайте вопрос, ответьте или напишите обращаясь к пользователю.`,
          { reply_to_message_id: msg.message_id }
        )
      }
    })
  } catch (e) {
    console.error(e)
  }
}
