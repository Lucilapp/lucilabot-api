import pkg from 'whatsapp-web.js';
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import ReplyService from './reply-service.js';
import MessageService from './message-service.js';
import ChatService from './chat-service.js';
const whatsappClient = new Client({
    authStrategy: new LocalAuth
})

whatsappClient.on('qr', (qr) => {
    qrcode.generate(qr, {small:true})
})
whatsappClient.on('ready', () => console.log('Client Ready'))

whatsappClient.on("message", async(msg) =>{
    try {
        if(msg.from != 'status@broadcast'){

            const contact = await msg.getContact();
            const chat = await msg.getChat();
            const replysvc = new ReplyService();
            const msgsvc = new MessageService();
            const chatsvc = new ChatService();

            //primero decide el siguente mensaje
            let reply = replysvc.checkChat(contact.number, msg.body);

            //se tiene que fijar si tiene que guardar la respuesta
            let lastMessage = chatsvc.getChatByPhoneNumber(contact.number).lastMessage;
            if(lastMessage !== null && lastMessage.dbInput){
                //grabar respuesta
            }

            //tiene que mandar el siguente mensaje
            chat.sendMessage(reply.text);

            //post reply
            chatsvc.updateChatLastMessage(contact.number, reply.ID);
        }
    } catch (error) {
        console.log(error)
    }
})

export default whatsappClient;