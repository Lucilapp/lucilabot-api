import { ID_MENSAJE_INICIO, ID_MENSAJE_REGISTRO, ID_MENSAJE_TIMEOUT } from "../config/constants.js";
import { addChatToArray, getChatArray, getChatsByPhoneNumber } from "../globals/chatsArray.js";
import AccountService from "./account-service.js";
import ControlService from  "./control-service.js";
import MessageService from "./message-service.js";

export default class InitializationService {
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

    checkChat = async (phoneNumber, clientReply, lastMessageID) => {
        const chats = getChatsByPhoneNumber(phoneNumber);
        const control = new ControlService();
        let reply = {
            message: null,
            chat: null
        };
        //Si hay mas de un chat al mismo tiempo con ese numero, error interno
        if(chats.length > 1){
            reply.message = control.internalError();
        }
        //Si no hay ningun chat inicia uno nuevo
        else if (chats.length === 0){
            reply.message = this.newChat(phoneNumber);
        }
        else{
            reply.chat = chats[0];
            reply.message = this.continueChat(chats[0], clientReply);
        }
        return reply;
    }

    newChat = async (phoneNumber) => {
        const chat = new Chat(phoneNumber, Date.now());
        addChatToArray(chat);
        let reply = this.initialize(phoneNumber);
    }
}