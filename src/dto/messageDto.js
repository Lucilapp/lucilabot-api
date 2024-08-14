class Message {
    /**
     * Crea un Mensaje nuevo
     * @param {number} ID - El ID del mensaje como aparece en la DB
     * @param {string} text - El texto del mensaje
     * @param {boolean} dbInput - ? Si este mensaje graba la respuesta a la base de datos
     * @param {boolean} replyable - ? Si este mensaje espera una respuesta {A, B, C, D}  
     */
    constructor(ID, text, dbInput, replyable) {
        this.ID = ID;
        this.text = text;
        this.dbInput = dbInput;
        this.replyable = replyable;
    }
}