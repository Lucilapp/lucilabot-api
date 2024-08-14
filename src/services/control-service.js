import { CHAT_TIMEOUT_MS, ID_MENSAJE_ERROR_INTERNO } from "../config/constants.js";
import MessageService from "./message-service.js";

export default class ControlService {
    checkTimeOut = (chat) => {
        //Devuelve true si el tiempo desde chat.startingtime es menor a CHAT_TIMEOUT_MS
        return Date.now() - chat.startingTime  < CHAT_TIMEOUT_MS
    }

    internalError = async () => {
        const msgsvc = new MessageService();
        const reply = await msgsvc.getMessageByID(ID_MENSAJE_ERROR_INTERNO)
        return reply;
    }
}