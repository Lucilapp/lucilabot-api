import pkg from 'whatsapp-web.js';
import { io } from "socket.io-client";
const { Client, LocalAuth } = pkg;
import qrcode from 'qrcode-terminal';
import ReplyService from './reply-service.js';
import MessageService from './message-service.js';
import ChatService from './chat-service.js';
import { ID_MENSAJE_CONEXION_CHAT, ID_MENSAJE_ERROR_INTERNO, ID_MENSAJE_RESPUESTA_INVALIDA, ID_MENSAJE_TIMEOUT } from '../config/constants.js';
const whatsappClient = new Client({
    authStrategy: new LocalAuth
})
var socket = null;

whatsappClient.on('qr', (qr) => {
    qrcode.generate(qr, {small:true})
})
whatsappClient.on('ready', () => console.log('Client Ready'))

whatsappClient.on("message", async(msg) =>{
    try {
        if(msg.from != 'status@broadcast'){

            const wppContact = await msg.getContact();
            const wppChat = await msg.getChat();
            const replysvc = new ReplyService();
            const msgsvc = new MessageService();
            const chatsvc = new ChatService();
            var chatConnecting = false;
            var chatAlreadyConnected = false;
            if (wppContact.number === '5491126447860') {
                (async () => {
                    const bot = async () => {
                        try {
                            if(!chatConnecting && !chatAlreadyConnected){
                                // Fase 1: Decidir el siguiente mensaje
                                let reply = await replysvc.checkChat(wppContact.number, msg.body);
                    
                                // Fase 2: Verificar si se debe guardar la respuesta
                                const chat = chatsvc.getChatByPhoneNumber(wppContact.number)[0];
                                let lastMessage = chat ? chat.lastMessage : null; 
                                if (lastMessage !== null) {
                                    if(lastMessage.dbInput){
        
                                    }
                                    // Grabar respuesta
                                }
                    
                                // Fase 3: Mandar el siguiente mensaje
                                await wppChat.sendMessage(reply.text);  // Asegúrate de que sendMessage sea asíncrona
                    
                                // Fase 4: Actualizar el último mensaje en el chat
                                await chatsvc.updateChatLastMessage(wppContact.number, reply.Id);
                                if(reply.Id === ID_MENSAJE_CONEXION_CHAT){
                                    chatConnecting = true;
                                    bot();
                                }
                                else if(!reply.replyable && reply.Id !== ID_MENSAJE_ERROR_INTERNO.toString() && reply.Id !== ID_MENSAJE_TIMEOUT.toString()){
                                    bot();
                                }
                            }
                            else {
                                if(chatConnecting){
                                //Si empieza el chat con el joven
                                socket = io('http://localhost:5000')
                                
                                chatConnecting = false;
                                chatAlreadyConnected = true;
                                // socket.on('connect', () => {
                                //     wppChat.sendMessage(msgsvc.getMessageById(ID_MENSAJE_CONEXION_CHAT))
                                // })
                                bot();
                                }
                                else if (chatAlreadyConnected){
                                    socket.emit('messageSend', 'wpp', msg);
                                } 
                            }
                            
                        } catch (error) {
                            console.error("Error en alguna de las fases:", error);
                        }
                    }
                    if(!chatConnected){
                        bot();
                    }
                })();

            }
            
            
        }
    } catch (error) {
        console.log(error)
    }
})

export default whatsappClient;