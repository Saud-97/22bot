//todo, make temp role
// add perm view channel for the role when a member joins a channel that he doesn't have view channel in and give that member the temp role.

const Discord = require('discord.js');
const client = new Discord.Client();

client.once('ready', () => {
  console.log('Ready!');

//client.user.setActivity('22 Community Thrive ', { type: 'WATCHING' });
    client.user.setStatus('DND');
client.user.setPresence({ activity: { name: 'S97 Commands', type: 'LISTENING' }, status: 'idle' })
//  client.user.setPresence({ activity: { name: 'with S97 Code'}, status: 'idle' })
  .then(
  //console.log
)
  .catch(console.error);
  
});

client.on('message', message => {
  /*
  if (message.content == "clear" || message.content == "CLEAR" || message.content == "lsp" || message.content == "مسح") {
        if (message.member.hasPermission("MANAGE_MESSAGES")) {
            message.channel.messages.fetch()
               .then(function(list){
                    message.channel.bulkDelete(100);
                  message.reply("done");
                }, function(err){message.channel.send("ERROR: ERROR CLEARING CHANNEL.")})                        
        }
    }
  */
  
  if(message.channel.id == "754972017530372117" && !(message.content.startsWith("-اقترح"))){
    if(!message.author.bot)       message.delete();
    

  }
  
  if (message.content.toLowerCase() === '.') {
    // send back "Pong." to the channel the message was sent in
    

message.reply('وقف يامزعج 🙂').then(msg => {
    msg.delete({ timeout: 5000 })
message.delete(1)
  })
  .catch(/*Your Error handling if the Message isn't returned, sent, etc.*/);


  }

  if(message.channel.id == "733457493623177266" && message.content.startsWith("rename")){
    var arr = message.content.replace("rename ","").split(" ",2)
    var userid = arr[0]
    var name = message.content.replace("rename "+userid+" ","")
    try {
     message.guild.members.cache.get(userid).setNickname("²² | "+name.replace("²² | "," "))
    // message.react("👍")
     message.channel.send("Done renaming <@!"+userid+">"); 
     setTimeout(function(){
    //  message.delete()
    }, 1000);

    } catch (error) {
      console.log(error)
    }
  }
  
});

client.on('voiceStateUpdate', (oldState, newState) => {
  let oldID;
  let newID;
  if (oldState.channelID) oldID = oldState.channelID;
  if (newState.channelID) newID = newState.channelID;
  if (oldID == newID) return;
  if (oldID) {
    var member = oldState.member;

    // remove perms from oldID if it had added before.
    var oldPerms = client.channels.cache.get(oldID).permissionsFor(member);
    var check = oldPerms.has(['VIEW_CHANNEL', 'PRIORITY_SPEAKER']);
    if (check) {
      try {
        client.channels.cache.get(oldID).permissionOverwrites.get(member.id).delete();
 
        
        console.log(member.nickname + " have been revoked access to view video")
      } catch{
      }
    }
  }

  if (newID) {
    var member = newState.member;
    var newPerms = client.channels.cache.get(newID).permissionsFor(member);

    var check = newPerms.has(['VIEW_CHANNEL']);
    if (!check) {
      client.channels.cache.get(newID).updateOverwrite(member, {
        VIEW_CHANNEL: true,
        PRIORITY_SPEAKER: true
      }).catch(console.error);
      console.log(member.displayName + " have been given access to view video")

    }
  }
});








client.login('NzM0OTQzMjcxMDQ2MDg2NjU3.XxZMsg.Kb6BhP4BI0-tC0ZpWuLIUIVhnVs');
