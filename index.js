const { SlashCommandBuilder, StringSelectMenuBuilder, StringSelectMenuOptionBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, MessageMentions: { USERS_PATTERN }, ThreadChannel, ComponentType, Client, MessageEmbed, GatewayIntentBits, ActivityType } = require("discord.js");
const express = require('express');
const bodyParser = require("body-parser");

const config = require('./config.json');
const BotToken = config.token;
const staffLogAuthKey = config.staffLogAuthKey;

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent
	],
});

const app = express();

/*const exampleEmbed = new MessageEmbed()
	.setColor('#0047AB')
  .setTitle('**What region are you from?**')
  .setDescription(':sunflower: Africa \n:blossom: America \n:cherry_blossom: Asia \n:tulip: Europe \n:hibiscus: Oceania Ping').setImage('https://cdn.discordapp.com/attachments/935142724707975239/944643929737924678/Celestella.png');
*/

//var offTopic = client.channels.cache.get("944619497325744248");
//offTopic.send({ embeds: [exampleEmbed] });

let logChannel
client.once('ready', () => {
  console.log('Ready!');
  client.user.setPresence({
    activities: [{
      name: `TGOB`, 
      type: ActivityType.Listening 
    }],
    status: 'Ready',
  });
  logChannel = client.channels.cache.get("1280624433865949357");
});


  


client.login(BotToken);

const listener = app.listen(2500, () => {
  console.log("Listening to port")
});

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(bodyParser.json());


const timer = ms => new Promise(res => setTimeout(res, ms))

app.post("/", async(request, response,) => {
  console.log("Request recieved")
  if (request.headers.authorization == staffLogAuthKey) {
    console.log("Request authorized")
    async function main() {
      console.log(request.body)
      for (const [key, value] of Object.entries(request.body)) {
        let profilePicUrl = "https://www.roblox.com/headshot-thumbnail/image?userId="
        fetch("https://thumbnails.roblox.com/v1/users/avatar-headshot?userIds=" + value.UserId + "&size=180x180&format=Png&isCircular=false")
        .then((response) => response.json())
        .then((json) => {
          if (json.data[0].state == 'Completed') {
            profilePicUrl = json.data[0].imageUrl

            const logEmbed = new EmbedBuilder()
            .setColor('#0047AB')
            .setTitle('**' + value.UserName + '**')
            .setDescription("Minutes in zone+chatting: " + value.MinutesInZone + "\n Minutes in game: " + value.MinutesPlayed)
            .setThumbnail(profilePicUrl);
            logChannel.send({embeds : [logEmbed]})
          }
        });
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



