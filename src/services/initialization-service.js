import { ID_MENSAJE_REGISTRO } from "../config/constants.js";
import ControlService from  "./control-service.js";
import MessageService from "./message-service.js";

export default class InitializationService {
    initialize = async (phoneNumber) => {
        var reply;
        const control = new ControlService();
        const msg = new MessageService();
        const filteredChatsArray = chats.filter(chat => chat.number === phoneNumber);
        //Si hay mas de un chat al mismo tiempo con ese numero, error interno
        if(filteredChatsArray.length > 1){
            reply = control.internalError();
        }
        //Si no hay ningun chat inicia uno nuevo
        else if (filteredChatsArray.length === 0){
            reply = this.newChat(phoneNumber);
        }
        else {
            //Si ya se paso del tiempo máximo, le tira timeout
            if(!control.checkTimeOut(filteredChatsArray[0])) {

            }
            else {
                
                reply = msg.getMessageById(ID_MENSAJE_REGISTRO);
            }

        }
        return reply;
    }

    newChat = async (phoneNumber) => {
        
    }
}