//conexion con la bd
export default class MessageRepository {
    getMessageByID = async (messageID) => {
        const pgHelper = new PgHelper();
        return await pgHelper.sqlQuery(`SELECT * FROM "Mensaje" WHERE "Id" = ${messageID}`);
    }
}