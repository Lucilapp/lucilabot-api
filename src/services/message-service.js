import { json } from "stream/consumers";
import { ID_MENSAJE_RESPUESTA_INVALIDA } from "../config/constants.js";
import { Message } from "../dto/messageDto.js";
import MessageRepository from "../repositories/message-repository.js";


export default class MessageService {
    getMessageById = async (messageID) => {
        const repo = new MessageRepository();
        const message = await repo.getMessageByID(messageID);
        const reply = await this.mountMessage(message);
        return reply;
    }

    getNextMessage = async (lastMessageID) => {
        const repo = new MessageRepository();
        const message = await repo.getNextMessage(lastMessageID);
        const reply = await this.mountMessage(message);
        return reply;
    }

    getPrevMessage = async (lastMessageID) => {
        const repo = new MessageRepository();
        const message = await repo.getPrevMessage(lastMessageID);
        const reply = await this.mountMessage(message);
        return reply;
    }

    getNextMessageByOption = async (lastMessageID, option) => {
        const repo = new MessageRepository();
        const message = await repo.getNextMessageByOption(lastMessageID, option);
        let reply;
        if(message){
            reply = this.mountMessage(message);
        }
        else{
            reply = false;
        }
        return reply;
    }

    mountMessage = async (message) => {
        const repo = new MessageRepository();
        const msgOpt = await repo.getMessageOptions(message.Id)
        const opt = msgOpt[0];
        let replyable = false;
        if(opt && typeof opt === 'object' && Object.prototype.hasOwnProperty.call(opt, 'Option')){
            replyable = opt.Option !== null || message.GuardarRespuesta;
        }
        let reply = new Message(message.Id, message.Texto, replyable, message.GuardarRespuesta);
        return reply;
    }
}