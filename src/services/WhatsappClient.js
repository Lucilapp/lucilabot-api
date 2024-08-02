const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")

const whatsappClient = new Client({
    authStrategy: new LocalAuth
})

whatsappClient.on('qr', (qr) => qrcode.generate(qr, {small:true}))
whatsappClient.on('ready', () => console.log('Client Ready'))

whatsappClient.on("message", async(msg) =>{
    try {
        if(msg.from != 'status@broadcast'){
            const contact = await msg.getContact();
            const chat = await msg.getChat();
            const chatid = chat.lastMessage.id._serialized;
            if(msg.body === "hola"){
                msg.reply("hola, soy lucila, mucho gusto!")
            }
            if(msg.body === "soy yuco"){
                msg.reply("sos un boludo")
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = whatsappClient