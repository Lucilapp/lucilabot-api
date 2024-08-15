import { Message } from "./messageDto";

export class Chat {
    /**
     * Crea un chat nuevo
     * @param {string} phoneNumber - El numero de teléfono asociado al chat
     * @param {Date} startingTime - El tiempo de inicio del chat
     * @param {Message} lastMessage - El ultimo mensaje enviado en el chat
     */
    constructor(phoneNumber, startingTime, lastMessage) {
        this.number = phoneNumber;
        this.startingTime = startingTime;
        this.lastMessage = lastMessage;
    }
}