import { hydrate } from "@grammyjs/hydrate";    
require('dotenv').config();
const { Bot, GrammyError, HttpError, Keyboard} = require('grammy');
const menuKeyboard = new InlineKeyboard()
.text('Узнать статус заказа', 'order-status')
.text('Обратиться в поддержку', 'support');
const backKeyboard = new InlineKeyboard().text('< Назад в меню', 'back');
const bot = new Bot(process.env.BOT_API_KEY); // <-- обратите внимание: BOT_API_KEY, не BOT_APL_KEY
const shareKeyboard = new Keyboard()
.requestLocation('Геолокация')
.requestContact('Контакт')
.requestPoll('Опрос')
.placeholder('Я хочу поделиться...')
.resized();
bot.command('share', async (ctx) => {
 await ctx.reply('Какими данными хочешь поделиться?', {
   reply_markup: shareKeyboard,
 });
});
bot.command('keyboard', async (ctx) => { await ctx.reply('Как настроение?', {
reply_markup: shareKeyboard,
});
});
bot.command('menu', async (ctx) => {
 await ctx.reply('Выберите пункт меню', {
reply_markup: menuKeyboard,
});
});
bot.callbackQuery('order-status', async (ctx) => {
await ctx.callbackQuery.message.editText('Статус заказа: В пути', {
reply_markup: backKeyboard,
});
await ctx.api.editMessageText await ctx.answerCallbackQuery();
});
bot.callbackQuery('support', async (ctx) => {
await ctx.callbackQuery.message.editText('Напишите Ваш вопрос', { reply_markup: backKeyboard,
});
await ctx.answerCallbackQuery();
});
bot.callbackQuery('back', async (ctx) => {
await ctx.callbackQuery.message.editText('Выберите пункт меню', { reply_markup: menuKeyboard,
});
await ctx.answerCallbackQuery();
});
bot.command('start', async (ctx) => {
    await ctx.reply('Привет! Бот работает!');
});
bot.command(['say_hello', 'hello', 'say_hi'], async (ctx) => {

await ctx.reply('Hello');

});
bot.catch((err)=>{const ctx =err.ctx;
    console.error(`Error while update ${ctx.update.update_id}:`); const e=err.error;
    if (e instanceof GrammyError) {
        console.error('Error in request:', e.description);
    }
    else if (e instanceof HttpError) { console.error('could not connect to telegramm:', e)}
    else {
        console.error('Unknown eroro',e)
    }
})
bot.api.setMyCommands([
{ command: 'start', description: 'Запуск бота' },
{ command: 'say_hello', description: 'Получить приветствие' },
{ command: 'hello', description: 'Получить приветствие' },
{ command: 'say_hi', description: 'Получить приветствие' },
])
bot.on(':voice', async (ctx) => {
    await ctx.reply('Голос');
});
bot.on('::email', async (ctx)=>{
    await ctx.reply('Соси')
})
bot.hears(/пизд/, async (ctx) => {
await ctx.reply('Ругаемся?');
});
bot.hears('ID', async (ctx) => {
 await ctx.reply(`Ваш telegram ID: ${ctx.from.id}`);
})
bot.on('message').filter(
  (ctx) => ctx.from.id === 8513722942, 
 async (ctx) => {
await ctx.reply('Привет, админ!');
},
);
bot.start();
console.log('Бот запущен...');