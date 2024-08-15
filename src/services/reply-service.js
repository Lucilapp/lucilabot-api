import { ID_MENSAJE_INICIO, ID_MENSAJE_REGISTRO, ID_MENSAJE_TIMEOUT } from "../config/constants.js";
import { addChatToArray, getChatArray, getChatsByPhoneNumber } from "../globals/chatsArray.js";
import { Chat } from "../dto/chatDto.js";
import AccountService from "./account-service.js";
import ControlService from  "./control-service.js";
import MessageService from "./message-service.js";
import ChatService from "./chat-service.js";

export default class ReplyService {
    initialize = async (phoneNumber) => {
        //Aca tiene que verificar si es un cliente nuevo o ya esta registrado, y continuar acordemente
        const acc = new AccountService();
        const msg = new MessageService();
        let reply;
        if(acc.getAccount(phoneNumber)){
            reply = msg.getMessageById(ID_MENSAJE_INICIO);
        }
        else{
            reply = msg.getMessageById(ID_MENSAJE_REGISTRO);
        }
    }

    continueChat = (chat, clientReply) => {
        const msg = new MessageService();
        let reply;
        //Si ya se paso del tiempo máximo, le tira timeout
        if(!control.checkTimeOut(filteredChatsArray[0])) {
            reply = msg.getMessageById(ID_MENSAJE_TIMEOUT);
        }
        else { 
            let lastMessage = msg.getMessageById(chat.lastStep);
            if(lastMessage.replyable){
                reply = msg.getNextMessageByOption(lastMessage.ID, clientReply);
                if(reply === null){
                    //Decir que debe responder de nuevo
                }
            }
            else{
                reply = msg.getNextMessage(lastMessage.ID);
            }
        }
        return reply;
    }

    checkChat = async (phoneNumber, clientReply) => {
        const chats = await getChatsByPhoneNumber(phoneNumber);
        const control = new ControlService();
        let reply = {
            message: null,
            chat: null
        };
        //Si no hay ningun chat inicia uno nuevo
        if (chats === null){
            reply.message = this.newChat(phoneNumber);
        }
        //Si hay mas de un chat al mismo tiempo con ese numero, error interno
        else if(chats.length > 1){
            reply.message = control.internalError();
        }
        else{
            reply.chat = chats[0];
            reply.message = this.continueChat(chats[0], clientReply);
        }
        return reply;
    }

    newChat = async (phoneNumber) => {
        const chat = new Chat(phoneNumber, Date.now(), null);
        console.log(`chat que va a montar ${chat}`)
        addChatToArray(chat);
        const chatsvc = new ChatService();
        console.log(`chat como se monto ${chatsvc.getChatArray()}`)
        let reply = this.initialize(phoneNumber);
        return reply;
    }
}