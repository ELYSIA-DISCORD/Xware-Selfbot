const Discord = require("discord.js");
const bot = new Discord.Client();
const {token, prefix, botID, whitelisted, nitro_sniper} = require("./botconfig.json");
const colors = require("colors");
const axios = require("axios");
const moment = require("moment");


console.clear()
console.log(colors.red("WARNING: Use at your own risk!"))
console.log(colors.rainbow("Logging in..."))
bot.on("ready", async() => {
    console.clear()
    console.log(colors.rainbow(`
    ░░░░░██╗░█████╗░██╗░░░██╗  ░██████╗███████╗██╗░░░░░███████╗██████╗░░█████╗░████████╗
    ░░░░░██║██╔══██╗╚██╗░██╔╝  ██╔════╝██╔════╝██║░░░░░██╔════╝██╔══██╗██╔══██╗╚══██╔══╝
    ░░░░░██║███████║░╚████╔╝░  ╚█████╗░█████╗░░██║░░░░░█████╗░░██████╦╝██║░░██║░░░██║░░░
    ██╗░░██║██╔══██║░░╚██╔╝░░  ░╚═══██╗██╔══╝░░██║░░░░░██╔══╝░░██╔══██╗██║░░██║░░░██║░░░
    ╚█████╔╝██║░░██║░░░██║░░░  ██████╔╝███████╗███████╗██║░░░░░██████╦╝╚█████╔╝░░░██║░░░
    ░╚════╝░╚═╝░░╚═╝░░░╚═╝░░░  ╚═════╝░╚══════╝╚══════╝╚═╝░░░░░╚═════╝░░╚════╝░░░░╚═╝░░░
    `))
    console.log(colors.green(`${bot.user.tag} has logged in with an ID of ${botID}`))
    console.log(colors.green(`Self bot by Jai#5827 with an ID of 415387271240613898`))
    console.log(colors.green("To view bot commands use the command: cmds (Or if you renamed the command use that cmd)"))
    bot.user.setActivity("with Discord API", {type: "PLAYING"})
})


bot.on("message", message => {
    let messageArray = message.content.split(" ")
    let cmd = messageArray[0].replace(prefix, "")
    let args = messageArray.slice(1)
    if(!message.content.startsWith(prefix)) return;
    if(whitelisted.includes(message.author.id)){
        if(cmd === prefix + "hi") {
            message.reply("Hello")
        }
        if(cmd === "dmall") {
            if(!args.join(" ")) return message.reply("Please put in a message")
            let users = message.guild.members.forEach(u => {
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
                user.send(embed)
                console.log(`Successfully dm'ed ${user}`)
        }
        if(cmd === "createchannels") {
            setInterval(() => {
                message.guild.createChannel("RAIDED BY JAY", {
                type: "text"
                })
                })
        }
        if(cmd === "createroles") {
            setInterval(() => {
                message.guild.createRole({
                    name:" RAIDED BY JAY",
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
            embed.addField("advanceping", "Ghost ping a user but it will say a test you said")
            embed.addField("pingall", "Ghost pings whole server with a text you said")
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
            if(!args.join(" ")) return message.reply("What u want me to say :(")
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
                    message.channel.send(`${msg}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||<@!${userID}>`)
                }
            }else{
                if(cmd === "pingall"){
                    let msg = args.join(" ")
                    if(!msg){
                        return message.reply("No message")
                    } else{
                        message.channel.send(`${msg}||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||​||||||||||||@everyone`)
                    }
                }
            }
        }
    } else {
        return message.reply("how about no")
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