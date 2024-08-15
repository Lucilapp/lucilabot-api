import PgHelper from "../helpers/pg-helper.js";

export default class AccountRepository {
    getAccount = async (phoneNumber) => {
        const pgHelper = new PgHelper();
        return await pgHelper.sqlQuery(`Select * from "Cliente" where "Telefono" = ${phoneNumber}`);
    }
}