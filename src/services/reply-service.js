import { ID_MENSAJE_INICIO, ID_MENSAJE_REGISTRO, ID_MENSAJE_TIMEOUT } from "../config/constants.js";
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
            reply = await msg.getMessageById(ID_MENSAJE_INICIO);
        }
        else{
            reply = await msg.getMessageById(ID_MENSAJE_REGISTRO);
        }
        return reply;
    }

    continueChat = (chat, clientReply) => {
        const msg = new MessageService();
        const control = new ControlService();
        let reply;
        //Si ya se paso del tiempo máximo, le tira timeout
        if(!control.checkTimeOut(chat)) {
            reply = msg.getMessageById(ID_MENSAJE_TIMEOUT);
        }
        else {
            //console.log(`este es el anterior chat: ${JSON.stringify(chat)}`)
            let lastMessage = msg.getMessageById(parseInt(chat.lastMessage));
            console.log(msg.getMessageById(parseInt(chat.lastMessage)))
            console.log(JSON.stringify(lastMessage));
            if(lastMessage.replyable){
                reply = msg.getNextMessageByOption(lastMessage.Id, clientReply);
                if(reply === null){
                    //Decir que debe responder de nuevo
                }
            }
            else{
                reply = msg.getNextMessage(lastMessage.Id);
            }
        }
        return reply;
    }

    checkChat = async (phoneNumber, clientReply) => {
        const chatsvc = new ChatService();
        const chats = chatsvc.getChatByPhoneNumber(phoneNumber);
        const control = new ControlService();
        let reply = null;
        //Si no hay ningun chat inicia uno nuevo
        if (chats === null){
            reply = this.newChat(phoneNumber);
        }
        //Si hay mas de un chat al mismo tiempo con ese numero, error interno
        else if(chats.length > 1){
            reply = control.internalError();
        }
        else{
            reply = this.continueChat(chats[0], clientReply);
        }
        return reply;
    }

    newChat = async (phoneNumber) => {
        const chatsvc = new ChatService();
        chatsvc.addChatToArray(phoneNumber, Date.now(), null);
        let reply = this.initialize(phoneNumber);
        return reply;
    }
}