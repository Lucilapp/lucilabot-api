import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import InitializationService from './initialization-service.js';
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
                chat.sendMessage("Funciona");
            }
        }
    } catch (error) {
        console.log(error)
    }
})

export default whatsappClient;