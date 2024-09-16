import PgHelper from "../helpers/pg-helper.js";

export default class AccountRepository {
    getAccount = async (phoneNumber) => {
        const pgHelper = new PgHelper();
        return await pgHelper.sqlQuery(`Select * from "Cliente" where "Telefono" = ${phoneNumber}`);
    }

    createAccount = async (user) => {
        const pgHelper = new PgHelper();
        let success = true;
        try {
            await pgHelper.sqlQuery(`Select * from "Cliente" where "Telefono" = ${phoneNumber}`);
        } catch (error) {
            console.log(error);
            success = false;
        }
        return success;
    }
}