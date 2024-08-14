import PgHelper from "../helpers/pg-helper";

export default class MessageRepository {
    getMessageByID = async (messageID) => {
        const pgHelper = new PgHelper();
        return await pgHelper.sqlQuery(`SELECT * FROM "Mensaje" WHERE "Id" = ${messageID} LIMIT 1`);
    }

    getNextMessage = async (lastMessageID) => {
        const pgHelper = new PgHelper();
        const nextMessageID = await pgHelper.sqlQuery(`SELECT "hijo" FROM "Relacion_Mensaje" WHERE "padre" = ${lastMessageID} LIMIT 1`);
        return await this.getMessageByID(nextMessageID);
    }

    getNextMessageByOption = async (lastMessageID, option) => {
        const pgHelper = new PgHelper();
        const nextMessageID = await pgHelper.sqlQuery(`SELECT "hijo" FROM "Relacion_Mensaje" WHERE "padre" = ${lastMessageID} AND "Opcion" = ${option} LIMIT 1`);
        return await this.getMessageByID(nextMessageID);

    }

}