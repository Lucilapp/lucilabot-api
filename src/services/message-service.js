import { json } from "stream/consumers";
import { ID_MENSAJE_RESPUESTA_INVALIDA } from "../config/constants.js";
import { Message } from "../dto/messageDto.js";
import MessageRepository from "../repositories/message-repository.js";


export default class MessageService {
    getMessageById = async (messageID) => {
        const repo = new MessageRepository();
        const message = await repo.getMessageByID(messageID);
        console.log(`mensaje como viene de la bd ${JSON.stringify(message)}`);
        const reply = await this.mountMessage(message);
        console.log(`el mensaje montado ${JSON.stringify(reply)}`);
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

    mountMessage = async (message) => {
        const repo = new MessageRepository();
        const msgOpt = await repo.getMessageOptions(message.Id)[0]
        let replyable = false;
        if(msgOpt && typeof msgOpt === 'object' && Object.prototype.hasOwnProperty.call(msgOpt, 'Option')){
            replyable = msgOpt.Option !== null || message.GuardarRespuesta;
        }
        let reply = new Message(message.Id, message.Texto, replyable, message.GuardarRespuesta);
        return reply;
    }
}