//conexion con la bd
export default class MessageRepository {
    getMessageByID = (messageID) => {
        const pgHelper = new PgHelper();
        return pgHelper.sqlQuery(`SELECT * FROM "Mensaje" WHERE "Id" = ${messageID}`);
    }
}