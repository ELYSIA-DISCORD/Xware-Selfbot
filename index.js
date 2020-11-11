const Discord = require("discord.js");
const bot = new Discord.Client();
const {token, prefix, botID, whitelisted, nitro_sniper} = require("./botconfig.json");
const colors = require("colors");
const axios = require("axios");
const moment = require("moment");
const figlet = require("figlet");

console.clear()
console.log(colors.red("WARNING: Use at your own risk!"))
console.log(colors.rainbow("Logging in..."))
bot.on("ready", async() => {
    console.clear()
    console.log(colors.green(`
    
██╗░░██╗░██╗░░░░░░░██╗░█████╗░██████╗░███████╗
╚██╗██╔╝░██║░░██╗░░██║██╔══██╗██╔══██╗██╔════╝
░╚███╔╝░░╚██╗████╗██╔╝███████║██████╔╝█████╗░░
░██╔██╗░░░████╔═████║░██╔══██║██╔══██╗██╔══╝░░
██╔╝╚██╗░░╚██╔╝░╚██╔╝░██║░░██║██║░░██║███████╗
╚═╝░░╚═╝░░░╚═╝░░░╚═╝░░╚═╝░░╚═╝╚═╝░░╚═╝╚══════╝
    `))
    console.log(colors.green(`${bot.user.tag} has logged in with an ID of ${botID}`))
    console.log(colors.green(`Self bot by DaGamingMan2018. https://github.com/DaGamingMan2018`))
    console.log(colors.green("To view bot commands use the command: cmds (Or if you renamed the command use that cmd)"))
    bot.user.setActivity("with Discord API", {type: "PLAYING"})
})


bot.on("message", message => {
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].replace(prefix, "")
    let args = messageArray.slice(1)
    if(!message.content.startsWith(prefix)) return;
    if(whitelisted.includes(message.author.id)){
        if(cmd === "hi") {
            message.reply("Hello")
        }
        if(cmd === "dmall") {
            if(!args.join(" ")) return message.reply("Please put in a message")
            let users = message.guild.members.forEach(u => {
                message.delete()
                if(u.user.bot) return console.log(colors.rainbow(`Couldn't send a message to ${u.user.tag}`))
                if(u.user.id === botID) return;
                u.user.send(args.join(" "))
                console.log(`Sent a message to ${u.user.tag} with the following message: ${args.join(" ")}`)
            })
        }
        if(cmd === "nitro") {
            let embed = new Discord.RichEmbed()
            let user = message.guild.members.get(args[0])
            if(!user) return message.reply("Please put a users ID")
                embed.setTitle("🎉 Congratulations!")
                embed.setColor("RANDOM")
                embed.setDescription("You have been lucky enough to get **Free** Discord **Nitro**! To get it simply press this **[Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**")
                embed.setImage("https://cdn.discordapp.com/attachments/739274510544404480/757460356384948254/BlaringPointedInvisiblerail-size_restricted.gif")
                embed.setFooter(`${bot.user.username}`)
                user.user.send(embed)
                console.log(`Successfully dm'ed ${user}`)
        }
        if(cmd === "createchannels") {
            setInterval(() => {
                message.guild.createChannel("XWARE WAS HERE", {
                type: "text"
                })
                })
        }
        if(cmd === "createroles") {
            setInterval(() => {
                message.guild.createRole({
                    name:"XWARE SELF BOT",
                    color: "RANDOM"
                })
                })
        }
        if(cmd === "cmds") {
            let embed = new Discord.RichEmbed()
            embed.setTitle("Self bot commands")
            embed.setColor("BLUE")
            embed.addField("nitro <userID>", "Sends the user a fake Nitro Link")
            embed.addField("dmall <args>", "Dm every single member (Filters bots) whatever you say")
            embed.addField("createchannels", "Creates a whole ton of channels")
            embed.addField("createroles", "Creates a whole ton of roles")
            embed.addField("ping", "Shows the message edit speed and the websocket latency")
            embed.addField("ghostping", "Ghost pings a user")
            embed.addField("spam", "Spam an amount of messages you desire")
            embed.addField("avatar", "Get a mentioned users avatar")
            embed.addField("embedmsg", "Creates an embed with your text in it")
            embed.addField("nitromsg", "Shows a free nitro gift message ;)")
            embed.addField("sendall", "Sends every channel a text you say")
            embed.addField("advanceping", "Ghost ping a user but it will say a text you said")
            embed.addField("pingall", "Ghost pings whole server with a text you said")
            embed.addField("nitroall", "Sends everyone in a server nitro message")
            embed.addField("ascii", "Send a text and make it ascii")
            embed.setFooter("Self bot commands")
            message.channel.send(embed)
        }
        if(cmd === "ping") {
            message.channel.send("Pinging...").then(msg => {
                let embed = new Discord.RichEmbed()
                embed.setTitle("Pong!")
                embed.addField("MessageEdit", `${msg.createdTimestamp - message.createdTimestamp}ms`)
                embed.addField("Websocket Latency", `${bot.ping}ms`)
                msg.edit(embed)
                msg.edit("")
                })
        }
        if(cmd === "ghostping") {
            let userID = args[0]
            if(!userID) return message.reply("Please put a users ID")
            message.channel.send(`<@!${userID}>`).then(m => {
                m.delete()
            })
            if(message.deletable) {
                message.delete()
            } else {
                return console.log(colors.red("Could not delete message!"))
            }
        }
        if(cmd === "spam") {
            if (!args[0] || !/\d{1,2}/ig.test(args[0])) {
              return message.channel.send("Please specify the number of messages to spam.")
            } else {
              var spamAmount = args[0]
            }
            if (!args[1]) {
              return message.channel.send("I can't spam nothing.")
            } else {
              args.splice(0, 1)
              var spamContent = args.join(" ")
            }
            for (var i = 0; i < spamAmount; i++) {
              message.channel.send(spamContent)
            }
        }
        if(cmd === "avatar") {
            let user = message.mentions.users.first();
            if(user){
                message.channel.send(user.displayAvatarURL)
            } else {
                message.reply("Please mention a user to get there avatar!")
            }
        }
        if(cmd === "embedmsg") {
            let embed = new Discord.RichEmbed()
            embed.setDescription(`${args.join(" ")}`)
            embed.setThumbnail(`${bot.user.displayAvatarURL}`)
            embed.setColor("RANDOM")
            embed.setFooter(`${bot.user.tag}`)
            message.channel.send(embed)
        }
        if(cmd === "nitromsg") {
            let embed = new Discord.RichEmbed()
                embed.setTitle("🎉 Congratulations!")
                embed.setColor("RANDOM")
                embed.setDescription("You have been lucky enough to get **Free** Discord **Nitro**! To get it simply press this **[Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**")
                embed.setImage("https://cdn.discordapp.com/attachments/739274510544404480/757460356384948254/BlaringPointedInvisiblerail-size_restricted.gif")
                embed.setFooter(`${bot.user.username}`)
                message.channel.send(embed)
        }
        if(cmd === "sendall"){
            if(!args.join(" ")) return message.reply("Please provide some text!")
            let channels = message.guild.channels.filter(ch => ch.type === "text").forEach(ch => ch.send(args.join(" ")))
        }
        if(cmd === "msg"){
            if(!args.join(" ")){
                return message.reply("Nothing")
            } else {
                message.channel.send(`${args.join(" ")}`)
            }
        }else{
            if(cmd === "advanceping"){
                let msg = args.slice(1).join(" ")
                let userID = args[0]
                if(!userID){
                    return message.reply("No user id Specified")
                } else {
                    message.delete()
                    message.channel.send(`${msg}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@!${userID}>`)
                }
            }else{
                if(cmd === "pingall"){
                    let msg = args.join(" ")
                    if(!msg){
                        return message.reply("No message")
                    } else{
                        message.delete()
                        message.channel.send(`${msg}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||@everyone`)
                    }
                } else {
                    if(cmd === "nitroall") {
                        let embed = new Discord.RichEmbed()
                        let users = message.guild.members.forEach(m => {
                            if(m.user.id === botID) return;
                            if(m.user.bot) return console.log(colors.rainbow(`Couldn't send a message to ${m.user.tag}`))
                            embed.setTitle("🎉 Congratulations!")
                            embed.setColor("RANDOM")
                            embed.setDescription("You have been lucky enough to get **Free** Discord **Nitro**! To get it simply press this **[Link](https://www.youtube.com/watch?v=dQw4w9WgXcQ)**")
                            embed.setImage("https://cdn.discordapp.com/attachments/739274510544404480/757460356384948254/BlaringPointedInvisiblerail-size_restricted.gif")
                            embed.setFooter(`${bot.user.username}`)
                            message.delete()
                            m.user.send(embed)
                            console.log(`Successfully dm'ed ${m}`)
                        })
                    } else {
                        if(cmd === "ascii") {
                            const msg = args.join(" ")
                            if(!msg) return message.reply("Please provide text")
                            message.delete()
                            figlet.text(msg, function (err, data) {
                                if(err){
                                    console.log("Something went wrong")
                                    console.dir(err)
                                }
                                if(data.length > 2000) return message.reply("Please provide text shorter then 2000 Characters")
                                message.channel.send('```' + data + '```')
                            })
                        } else {
                            if(cmd === "help"){
                                let embed = new Discord.RichEmbed()
                                embed.setTitle("Help")
                                embed.setColor("BLUE")
                                embed.setDescription("This is a Selfbot (Automated User). To use commands. Use the Command: **cmds** to view commands\nWarning: Use at your own **risk** or your account can get **disabled!**\n Link to Github: [**Link**](https://github.com/DaGamingMan2018/Xware-Selfbot)")
                                embed.setThumbnail(message.author.displayAvatarURL)
                                message.channel.send(embed)
                            }
                        }
                    }
                }
            }
        }
    } else {
        return;
    }
})



bot.on("message", message => {
    const start = process.hrtime();
    const difference = process.hrtime(start);

    function nitroData(code) {
        console.log(`- CHANNEL: ${colors.yellow(`${message.channel.name}`)}`)
        console.log(`- SERVER: ${colors.yellow(`${message.guild.name}`)}`)
        console.log(`- AUTHOR: ${colors.yellow(`${message.author.tag}`)}`)
        console.log(`- ELAPSED: ${colors.yellow(`${difference[0] > 0 ? `${difference[0]}s ` : ""}${difference[1] / 1e6}ms`)}`)
        console.log(`- CODE: ${colors.yellow(`${code}`)}`)
        console.log()  
    }
    if(message.content.includes("https://discord.gift/" || "discord.gift")) {
        if(nitro_sniper === true) {

        var Nitro = /(discord\.(gift)|discord\.com\/gift)\/.+[a-z]/

        var NitroUrl = Nitro.exec(message.content);
        var NitroCode = NitroUrl[0].split('/')[1];

        axios({
            method: 'POST',
            url: `https://discord.com/api/v6/entitlements/gift-codes/${NitroCode}/redeem`,
            headers:
            {
                'Authorization': token
            }
        }).then(() => {
            console.log(colors.green(`[${moment().format("LTS")} - Valid nitro code was successfully redeemed]`))
            nitroData(NitroCode)
        })
        .catch(ex => {
        console.log(colors.red(`[${moment().format("LTS")} - Unknown nitro code was either redeemed or invalid/fake]`))
        nitroData(NitroCode)
        })
        } else {
            return;
        } 
    }
})









bot.login(token)