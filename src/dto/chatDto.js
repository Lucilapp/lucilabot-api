class Chat {
    /**
     * Crea un chat nuevo
     * @param {string} phoneNumber - El numero de teléfono asociado al chat
     * @param {Date} startingTime - El tiempo de inicio del chat
     * @param {int} step - El paso del proceso del chat en el que esta el chat
     */
    constructor(phoneNumber, startingTime) {
        this.number = phoneNumber;
        this.startingTime = startingTime;
        this.step = 0;
    }
}