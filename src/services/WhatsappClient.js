const { Client, LocalAuth } = require("whatsapp-web.js")
const qrcode = require("qrcode-terminal")
import InitializationService from "./initialization-service"
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
                msg.reply("Hola, soy lucila, mucho gusto!")
            }
            else if(msg.body === "necesito ayuda"){
                msg.reply("Todavía no me programaron por completo, pero en breve podré ayudarte!")
            }
            else
            {
                msg.reply("Esa opcion no la conozco")
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = whatsappClient