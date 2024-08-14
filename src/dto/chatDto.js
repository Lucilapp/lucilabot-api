class Chat {
    /**
     * Crea un chat nuevo
     * @param {string} phoneNumber - El numero de teléfono asociado al chat
     * @param {Date} startingTime - El tiempo de inicio del chat
     * @param {number} lastStep - El ID del ultimo mensaje enviado en el chat
     */
    constructor(phoneNumber, startingTime) {
        this.number = phoneNumber;
        this.startingTime = startingTime;
        this.lastStep = -1;
    }
}