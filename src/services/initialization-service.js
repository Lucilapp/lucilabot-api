import { ID_MENSAJE_REGISTRO } from "../config/constants";
import ControlService from "./control-service";

export default class InitializationService {
    initialize = async (phoneNumber) => {
        var reply;
        const control = new ControlService();
        const filteredChatsArray = chats.filter(chat => chat.number === phoneNumber)
        if(filteredChatsArray.length > 1){
            reply = control.internalError();
        }
        else if (filteredChatsArray.length === 0){
            reply = this.newChat(phoneNumber);
        }
        else {
            if(!control.checkTimeOut(filteredChatsArray[0])) {

            }
            else {
                reply = getMessage(ID_MENSAJE_REGISTRO)
            }

        }
        return reply;
    }

    newChat = async (phoneNumber) => {

    }
}