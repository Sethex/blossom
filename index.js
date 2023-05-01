const {Client, MessageEmbed} = require('discord.js');
const express = require('express');
const bodyParser = require("body-parser");

const config = require('./config.json');
const BotToken = config.token;
const staffLogAuthKey = config.staffLogAuthKey;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildMembers,
    GatewayIntentBits.GuildVoiceStates
	],
});

const app = express();

/*const exampleEmbed = new MessageEmbed()
	.setColor('#0047AB')
  .setTitle('**What region are you from?**')
  .setDescription(':sunflower: Africa \n:blossom: America \n:cherry_blossom: Asia \n:tulip: Europe \n:hibiscus: Oceania Ping').setImage('https://cdn.discordapp.com/attachments/935142724707975239/944643929737924678/Celestella.png');
*/
let logChannel


console.log("Yay")
client.once('ready', () => {
  console.log('Ready!');
  client.user.setPresence({
    activities: [{
      name: `Sethex`, 
      type: ActivityType.Listening 
    }],
    status: 'Ready',
  });
  logChannel = client.channels.cache.get("996165862010654831");
});


  //var offTopic = client.channels.cache.get("944619497325744248");
  //offTopic.send({ embeds: [exampleEmbed] });


client.login(BotToken);

const listener = app.listen(1000, () => {
  console.log("Listening to port")
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


const timer = ms => new Promise(res => setTimeout(res, ms))

app.post("/shiftLog/", async(request, response,) => {
  console.log("Request recieved")
  if (request.headers.authorization == staffLogAuthKey) {
    console.log("Request authorized")
    async function main() {
      console.log(request.body)
      for (const [key, value] of Object.entries(request.body)) {
        const logEmbed = new MessageEmbed()
    	  .setColor('#0047AB')
        .setTitle('**' + value.UserName + '**')
        .setDescription("Minutes played: " + value.Minutes)
        .setThumbnail('https://www.roblox.com/headshot-thumbnail/image?userId=' + value.UserId + '&width=420&height=420&format=png');
        logChannel.send({embeds : [logEmbed]})
        
        await timer(100)
      };
    };
    main()
    response.status(201)
    response.json({
        status: "success",
        message: "201 | Shift Logged",
      })
  };
});





// "https://api.blox.link/v1/user/:id" Get roblox user
/*

// Login using your cookie
noblox.changeRank(1, 2, -1)
*/


// inside a command, event listener, etc.



