import MessageRepository from "../repositories/message-repository"

export default class MessageService {
    getMessageById = async (messageID) => {
        const repo = new MessageRepository();
        const message = repo.getMessageByID(messageID);
        //Aca hay que igualar los atributos que trae de la DB a un objeto nuevo de tipo message
    }
}