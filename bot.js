const TelegramBot = require('node-telegram-bot-api');

// replace the value below with the Telegram token you receive from @BotFather
const token = '423549430:AAGiSdHPVKjuzvQoltBsHqXQpziX5bv9p2I';

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});

// Matches "/echo [whatever]"
bot.onText(/\/echo (.+)/, (msg, match) => {
  // 'msg' is the received Message from Telegram
  // 'match' is the result of executing the regexp above on the text content
  // of the message

  const chatId = msg.chat.id;
  const resp = match[1]; // the captured "whatever"

  // send back the matched "whatever" to the chat
  bot.sendMessage(chatId, resp);
});

// Listen for any kind of message. There are different kinds of
// messages.
bot.on('message', (msg) => {
  const chatId = msg.chat.id;
  var link = '';
  var lat = '';
  var lon = '';
  if(msg.entities != undefined){
    msg.entities.forEach(function(e){
          //console.log(e);
      if(e.type == 'text_link'){

        link = e.url.substring(e.url.indexOf('http://maps'),e.url.length);
        http://maps.google.com/maps?q=45.4413057289,12.3293683679
        var latlon = link.substring(link.indexOf('?q=')+3, link.length).split(',');
        lat = latlon[0];
        lon = latlon[1];
        //link = e.url.match('.*(?=http://)');
      }
    })
  }
  if(link.length == 0){
    link = 'Nessun url trovato';
  }

  // send a message to the chat acknowledging receipt of their message
  bot.sendMessage(chatId, link);
  bot.sendLocation(chatId, latitude=lat, longitude=lon);
});
