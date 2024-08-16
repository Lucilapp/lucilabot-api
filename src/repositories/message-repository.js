import PgHelper from "../helpers/pg-helper.js";

export default class MessageRepository {
    getMessageByID = async (messageID) => {
        console.log(`messageID en el repo ${messageID}`);
        const pgHelper = new PgHelper();
        const query = `SELECT * FROM "Mensaje" WHERE "Id" = $1 LIMIT 1`;
        const values = [messageID];
        let reply = await pgHelper.sqlQuery(query, values);
        console.log(`reply: ${JSON.stringify(reply)}`)
        return reply[0];
    }

    getNextMessage = async (lastMessageID) => {
        const pgHelper = new PgHelper();
        const query = `SELECT "IdHijo" FROM "Relacion_Mensaje" WHERE "IdPadre" = $1 LIMIT 1`;
        const values = [lastMessageID];
        const nextMessage = await pgHelper.sqlQuery(query, values);
        console.log(lastMessageID);
        console.log(`resultado de query de getNextMessage: ${nextMessage}`);
        return await this.getMessageByID(parseInt(nextMessage));
    }

    getMessageOptions = async (messageID) => {
        const pgHelper = new PgHelper();
        const query = `SELECT "Option" FROM "Relacion_Mensaje" WHERE "IdPadre" = $1 LIMIT 1`;
        const values = [messageID];
        const options = await pgHelper.sqlQuery(query, values);
        return await options;
    }

    getNextMessageByOption = async (lastMessageID, option) => {
        const pgHelper = new PgHelper();
        const query = `SELECT "IdHijo" FROM "Relacion_Mensaje" WHERE "IdPadre" = $1 AND "Option" = $2 LIMIT 1`;
        const values = [lastMessageID, option];
        const nextMessage = await pgHelper.sqlQuery(query, values);
        console.log(`resultado de query de getNextMessageByOption: ${nextMessage}`)
        return await this.getMessageByID(parseInt(nextMessage[0].IdHijo));
    }
}
