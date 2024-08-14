import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import InitializationService from './initialization-service.js';
import MessageService from './message-service.js';
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
            const msgsvc = new MessageService();
            let reply = init.checkChat(contact.number);
            //se tiene que fijar si tiene que guardar la respuesta
            if((await msgsvc.getMessageById(reply.chat.laststep)).replyable){
                
            }
            //tiene que mandar el siguente mensaje
            
        }
    } catch (error) {
        console.log(error)
    }
})

export default whatsappClient;