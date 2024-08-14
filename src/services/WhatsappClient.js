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
            const init = new InitializationService();
            let reply = init.initialize()
            
        }
    } catch (error) {
        console.log(error)
    }
})

export default whatsappClient;