import { ID_MENSAJE_ERROR_INTERNO, ID_MENSAJE_FIN_REGISTRO, ID_MENSAJE_INICIO, ID_MENSAJE_REGISTRO, ID_MENSAJE_TIMEOUT } from "../config/constants.js";
import AccountService from "./account-service.js";
import ControlService from  "./control-service.js";
import MessageService from "./message-service.js";
import ChatService from "./chat-service.js";
import HistoryService from "./history-service.js";

export default class ReplyService {
    
    checkChat = async (phoneNumber, clientReply) => {
        const chatsvc = new ChatService();
        const chats = chatsvc.getChatByPhoneNumber(phoneNumber);
        const control = new ControlService();
        let reply = null;
        //Si no hay ningun chat inicia uno nuevo
        if (chats === null || chats[0].lastMessage === ID_MENSAJE_TIMEOUT.toString() || chats[0].lastMessage === ID_MENSAJE_ERROR_INTERNO.toString() || chats[0].lastMessage === ID_MENSAJE_FIN_REGISTRO.toString()){
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

    initialize = async (phoneNumber) => {
        //Aca tiene que verificar si es un cliente nuevo o ya esta registrado, y continuar acordemente
        const acc = new AccountService(); 
        const msg = new MessageService();
        let reply;
        const accounts = await acc.getAccounts(phoneNumber);
        if(accounts.length > 0){
            reply = await msg.getMessageById(ID_MENSAJE_INICIO);
        }
        else{
            reply = await msg.getMessageById(ID_MENSAJE_REGISTRO);
        }
        return reply;
    }

    continueChat = async (chat, clientReply) => {
        const msg = new MessageService();
        const control = new ControlService();
        const hist = new HistoryService();
        let reply;
        //Si ya se paso del tiempo máximo, le tira timeout
        if(!control.checkTimeOut(chat)) {
            reply = msg.getMessageById(ID_MENSAJE_TIMEOUT);
        }
        else {
            control.refreshChatTimeout(chat.number);
            let lastMessage = await msg.getMessageById(chat.lastMessage);
            if(lastMessage.replyable){
                hist.saveChatHistory(chat.number, chat.lastMessage, clientReply);
                if(lastMessage.saveAnswer){
                    reply = await msg.getNextMessage(lastMessage.Id);
                }
                else{
                    console.log(clientReply)
                    let opt = clientReply.toUpperCase();
                    reply = await msg.getNextMessageByOption(lastMessage.Id, opt);
                }
            }
            else{
                reply = await msg.getNextMessage(lastMessage.Id);
            }
        }
        return reply;
    }

    

}