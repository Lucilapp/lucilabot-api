import PgHelper from "../helpers/pg-helper.js";

export default class MessageRepository {
    getMessageByID = async (messageID) => {
        const pgHelper = new PgHelper();
        const query = `SELECT * FROM "Mensaje" WHERE "Id" = $1 LIMIT 1`;
        const values = [messageID];
        let reply = await pgHelper.sqlQuery(query, values);
        return reply[0];
    }

    getNextMessage = async (lastMessageID) => {
        const pgHelper = new PgHelper();
        const query = `SELECT "IdHijo" FROM "Relacion_Mensaje" WHERE "IdPadre" = ${lastMessageID} LIMIT 1`;
        const nextMessage = await pgHelper.sqlQuery(query);
        return await this.getMessageByID(parseInt(nextMessage[0].IdHijo));
    }

    getPrevMessage = async (lastMessageID) => {
        const pgHelper = new PgHelper();
        const query = `SELECT "IdPadre" FROM "Relacion_Mensaje" WHERE "IdHijo" = ${lastMessageID} LIMIT 1`;
        const nextMessage = await pgHelper.sqlQuery(query);
        return await this.getMessageByID(parseInt(nextMessage[0].IdPadre));
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
        const query = `SELECT "IdHijo" FROM "Relacion_Mensaje" WHERE "IdPadre" = ${lastMessageID} AND "Option" = '${option}' LIMIT 1`;
        const nextMessage = await pgHelper.sqlQuery(query);
        return await this.getMessageByID(parseInt(nextMessage[0].IdHijo));
    }
}
