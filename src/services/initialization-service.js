import { ID_MENSAJE_REGISTRO } from "../config/constants.js";
import { addChatToArray, getChatArray, getChatsByPhoneNumber } from "../globals/chatsArray.js";
import ControlService from  "./control-service.js";
import MessageService from "./message-service.js";

export default class InitializationService {
    initialize = async (phoneNumber) => {
        //Aca tiene que verificar si es un cliente nuevo o ya esta registrado, y continuar acordemente
    }

    continueChat = (chat) => {
        let reply;
        //Si ya se paso del tiempo máximo, le tira timeout
        if(!control.checkTimeOut(filteredChatsArray[0])) {
            
        }
        else { 
            reply = msg.getMessageById(ID_MENSAJE_REGISTRO);
        }
        return reply;
    }

    checkChat = async (phoneNumber) => {
        const chats = getChatsByPhoneNumber(phoneNumber)
        let reply;
        //Si hay mas de un chat al mismo tiempo con ese numero, error interno
        if(chats.length > 1){
            reply = control.internalError();
        }
        //Si no hay ningun chat inicia uno nuevo
        else if (chats.length === 0){
            reply = this.newChat(phoneNumber);
        }
        else{
            reply = this.continueChat(chats[0]);
        }
        return reply;
    }

    newChat = async (phoneNumber) => {
        const chat = new Chat(phoneNumber, Date.now());
        addChatToArray(chat);
        let reply = this.initialize(phoneNumber);
    }
}