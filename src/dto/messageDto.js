export class Message {
    /**
     * Crea un Mensaje nuevo
     * @param {number} Id - El ID del mensaje como aparece en la DB
     * @param {string} text - El texto del mensaje
     * @param {boolean} dbInput - ? Si este mensaje graba la respuesta a la base de datos
     * @param {boolean} replyable - ? Si este mensaje espera una respuesta {A, B, C, D}  
     */
    constructor(Id, text, replyable, saveAnswer) {
        this.Id = Id;
        this.text = text;
        this.replyable = replyable;
        this.saveAnswer = saveAnswer;
    }
}