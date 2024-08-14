import { ID_MENSAJE_RESPUESTA_INVALIDA } from "../config/constants.js";
import MessageRepository from "../repositories/message-repository.js"

export default class MessageService {
    getMessageById = async (messageID) => {
        const repo = new MessageRepository();
        const message = repo.getMessageByID(messageID);
        const reply = this.mountMessage(message);
        return reply;
    }

    getNextMessage = async (lastMessageID) => {
        const repo = new MessageRepository();
        const message = repo.getNextMessage(lastMessageID);
        const reply = this.mountMessage(message);
        return reply;
    }

    getNextMessageByOption = async (lastMessageID, option) => {
        const repo = new MessageRepository();
        const message = repo.getNextMessageByOption(lastMessageID);
        let reply;
        if(message){
            reply = this.mountMessage(message);
        }
        else{
            reply = repo.getMessageByID(ID_MENSAJE_RESPUESTA_INVALIDA);
        }
        return reply;
    }

    mountMessage = (ID, text, dbInput, replyable) => {
        let reply = new Message(ID, text, dbInput, replyable);
        return reply;
    }
}